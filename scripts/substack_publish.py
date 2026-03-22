#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import importlib
import os
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


ROOT_DIR = Path(__file__).resolve().parent.parent
BLOGS_DIR = ROOT_DIR / "src/lib/content/blogs"


@dataclass
class FrontmatterDocument:
    metadata: dict[str, Any]
    body: str


def eprint(message: str) -> None:
    print(message, file=sys.stderr)


def require_dependency(module_name: str, package_name: str):
    try:
        return importlib.import_module(module_name)
    except ImportError:
        eprint(
            f"Missing dependency `{package_name}`. Install it with:\n"
            f"  pip install {package_name}"
        )
        raise SystemExit(1)


def load_env_file(env_file: Path) -> None:
    if not env_file.exists():
        return

    for raw_line in env_file.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip()
        if value and value[0] == value[-1] and value[0] in {'"', "'"}:
            value = value[1:-1]
        os.environ.setdefault(key, value)


def resolve_post_path(post_arg: str) -> Path:
    candidate = Path(post_arg)
    if candidate.is_absolute() and candidate.exists():
        return candidate

    direct = (ROOT_DIR / candidate).resolve()
    if direct.exists():
        return direct

    slug_candidate = (BLOGS_DIR / f"{post_arg}.svx").resolve()
    if slug_candidate.exists():
        return slug_candidate

    raise SystemExit(
        f"Could not find post `{post_arg}`. Pass a repo-relative path or a slug under `src/lib/content/blogs`."
    )


def parse_frontmatter(post_path: Path) -> FrontmatterDocument:
    yaml = require_dependency("yaml", "pyyaml")
    raw = post_path.read_text(encoding="utf-8")
    if not raw.startswith("---\n"):
        raise SystemExit(f"{post_path} does not start with YAML frontmatter.")

    try:
        _, frontmatter, body = raw.split("---\n", 2)
    except ValueError as exc:
        raise SystemExit(f"Could not parse frontmatter in {post_path}.") from exc

    metadata = yaml.safe_load(frontmatter) or {}
    if not isinstance(metadata, dict):
        raise SystemExit(f"Frontmatter in {post_path} must be a YAML object.")

    return FrontmatterDocument(metadata=metadata, body=body.lstrip("\n"))


def write_frontmatter(post_path: Path, document: FrontmatterDocument) -> None:
    yaml = require_dependency("yaml", "pyyaml")
    dumped = yaml.safe_dump(
        document.metadata,
        sort_keys=False,
        allow_unicode=True,
        default_flow_style=False,
    ).strip()
    updated = f"---\n{dumped}\n---\n\n{document.body.lstrip()}"
    post_path.write_text(updated, encoding="utf-8")


def build_content_hash(metadata: dict[str, Any], body: str) -> str:
    payload = "\n".join(
        [
            str(metadata.get("title", "")),
            str(metadata.get("summary", "")),
            body.strip(),
        ]
    )
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Upload one of this site's blog posts to Substack."
    )
    parser.add_argument(
        "post",
        help="Post path or slug, e.g. `life_dilemma` or `src/lib/content/blogs/life_dilemma.svx`.",
    )
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument(
        "--draft",
        action="store_true",
        help="Upload as a Substack draft. This is the default.",
    )
    mode.add_argument(
        "--publish",
        action="store_true",
        help="Publish an existing uploaded draft, or upload and publish immediately.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Create a new Substack draft even if the post is already marked as uploaded.",
    )
    parser.add_argument(
        "--env-file",
        default=".env",
        help="Env file to load before reading authentication settings. Default: .env",
    )
    parser.add_argument(
        "--audience",
        default="everyone",
        choices=["everyone", "only_paid", "founding", "only_free"],
        help="Substack audience for newly created drafts.",
    )
    parser.add_argument(
        "--comments",
        default="everyone",
        choices=["none", "only_paid", "everyone"],
        help="Substack comment permissions for newly created drafts.",
    )
    parser.add_argument(
        "--subtitle",
        help="Override the post subtitle. Defaults to the frontmatter summary.",
    )
    parser.add_argument(
        "--publication-url",
        help="Override PUBLICATION_URL from the environment.",
    )
    parser.add_argument("--email", help="Override EMAIL from the environment.")
    parser.add_argument("--password", help="Override PASSWORD from the environment.")
    parser.add_argument(
        "--cookies-path", help="Override COOKIES_PATH from the environment."
    )
    parser.add_argument(
        "--cookies-string", help="Override COOKIES_STRING from the environment."
    )
    return parser


def get_setting(cli_value: str | None, env_name: str) -> str | None:
    return cli_value if cli_value is not None else os.getenv(env_name)


def create_api(args: argparse.Namespace):
    substack_module = require_dependency("substack", "python-substack")
    api_cls = getattr(substack_module, "Api")
    return api_cls(
        email=get_setting(args.email, "EMAIL"),
        password=get_setting(args.password, "PASSWORD"),
        cookies_path=get_setting(args.cookies_path, "COOKIES_PATH"),
        cookies_string=get_setting(args.cookies_string, "COOKIES_STRING"),
        publication_url=get_setting(args.publication_url, "PUBLICATION_URL"),
    )


def validate_metadata(post_path: Path, metadata: dict[str, Any]) -> None:
    if not metadata.get("title"):
        raise SystemExit(f"{post_path} is missing a `title` in frontmatter.")
    if "summary" not in metadata:
        metadata["summary"] = ""
    if metadata.get("summary") is None:
        raise SystemExit(
            f"{post_path} has a null `summary` in frontmatter. Set it to a string or pass `--subtitle`."
        )


def create_draft(api: Any, metadata: dict[str, Any], body: str, args: argparse.Namespace) -> dict[str, Any]:
    post_module = require_dependency("substack.post", "python-substack")
    post_cls = getattr(post_module, "Post")

    user_id = api.get_user_id()
    subtitle = args.subtitle if args.subtitle is not None else metadata.get("summary", "")
    post = post_cls(
        title=metadata["title"],
        subtitle=subtitle,
        user_id=user_id,
        audience=args.audience,
        write_comment_permissions=args.comments,
    )
    post.from_markdown(body, api=api)
    return api.post_draft(post.get_draft())


def update_substack_metadata(
    metadata: dict[str, Any],
    *,
    content_hash: str,
    status: str,
    draft_id: Any,
    post_id: Any = None,
) -> None:
    metadata["substack_uploaded"] = True
    metadata["substack_status"] = status
    metadata["substack_draft_id"] = draft_id
    metadata["substack_post_id"] = post_id
    metadata["substack_content_hash"] = content_hash
    metadata["substack_uploaded_at"] = (
        datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    )


def main() -> int:
    args = build_arg_parser().parse_args()
    load_env_file(ROOT_DIR / args.env_file)

    post_path = resolve_post_path(args.post)
    document = parse_frontmatter(post_path)
    validate_metadata(post_path, document.metadata)
    content_hash = build_content_hash(document.metadata, document.body)

    stored_hash = document.metadata.get("substack_content_hash")
    stored_status = document.metadata.get("substack_status")
    stored_draft_id = document.metadata.get("substack_draft_id")
    already_uploaded = bool(document.metadata.get("substack_uploaded"))
    wants_publish = args.publish

    if already_uploaded and stored_status == "published" and not args.force:
        raise SystemExit(
            f"{post_path} is already marked as published on Substack. Use `--force` if you really want a new upload."
        )

    if (
        already_uploaded
        and stored_hash
        and stored_hash != content_hash
        and stored_status == "draft"
        and not args.force
    ):
        raise SystemExit(
            f"{post_path} changed after its last Substack upload. Re-run with `--force` to create a fresh draft."
        )

    api = create_api(args)

    if wants_publish and stored_status == "draft" and stored_draft_id and stored_hash == content_hash and not args.force:
        api.prepublish_draft(stored_draft_id)
        publish_result = api.publish_draft(stored_draft_id)
        update_substack_metadata(
            document.metadata,
            content_hash=content_hash,
            status="published",
            draft_id=stored_draft_id,
            post_id=publish_result.get("id"),
        )
        write_frontmatter(post_path, document)
        print(f"Published existing draft for {post_path} (draft_id={stored_draft_id}).")
        return 0

    if already_uploaded and stored_status == "draft" and not wants_publish and not args.force:
        raise SystemExit(
            f"{post_path} is already marked as uploaded as a draft. Use `--publish` to publish it or `--force` to create a new draft."
        )

    draft = create_draft(api, document.metadata, document.body, args)
    draft_id = draft.get("id")
    if draft_id is None:
        raise SystemExit("Substack returned a draft without an `id`.")

    status = "draft"
    post_id = None
    if wants_publish:
        api.prepublish_draft(draft_id)
        publish_result = api.publish_draft(draft_id)
        status = "published"
        post_id = publish_result.get("id")

    update_substack_metadata(
        document.metadata,
        content_hash=content_hash,
        status=status,
        draft_id=draft_id,
        post_id=post_id,
    )
    write_frontmatter(post_path, document)

    print(
        f"{'Published' if wants_publish else 'Uploaded draft for'} {post_path} "
        f"(draft_id={draft_id})."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
