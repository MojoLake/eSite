# This is the repo for my personal website.

## Substack CLI

There is a helper CLI at `scripts/substack_publish.py` for uploading one of the site's `.svx` blog posts to Substack.

Initialize the Python environment with `uv`:

```bash
uv sync
```

Create a `.env` file from `.env.example` and fill in either email/password or cookie auth:

```bash
cp .env.example .env
```

Draft upload:

```bash
yarn substack life_dilemma
```

Publish:

```bash
yarn substack life_dilemma --publish
```

You can also pass a path instead of a slug:

```bash
yarn substack src/lib/content/blogs/life_dilemma.svx --publish
```

Behavior:

- Uploading a draft writes Substack metadata back into the post frontmatter.
- Re-running the command on an already uploaded post is blocked by default.
- `--publish` reuses an already uploaded matching draft instead of creating a duplicate.
- If the source file changed after the draft upload, the command refuses to publish stale content unless you pass `--force`.
- `--force` creates a fresh Substack draft and refreshes the stored metadata.
