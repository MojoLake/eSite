#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const blogsDir = path.join(rootDir, 'src/lib/content/blogs');

const stripQuotes = (value) => {
	if (
		(value.startsWith('"') && value.endsWith('"')) ||
		(value.startsWith("'") && value.endsWith("'"))
	) {
		return value.slice(1, -1);
	}
	return value;
};

const parseScalar = (value) => {
	const trimmed = value.trim();
	if (trimmed === 'true') return true;
	if (trimmed === 'false') return false;
	return stripQuotes(trimmed);
};

const parseFrontmatter = (content, filePath) => {
	if (!content.startsWith('---\n')) {
		throw new Error(`${filePath} does not start with frontmatter`);
	}

	const closingMarker = content.indexOf('\n---', 4);
	if (closingMarker === -1) {
		throw new Error(`${filePath} has no closing frontmatter marker`);
	}

	const frontmatter = content.slice(4, closingMarker);
	const metadata = {};

	for (const rawLine of frontmatter.split('\n')) {
		const line = rawLine.trim();
		if (!line || line.startsWith('#')) continue;

		const separatorIndex = line.indexOf(':');
		if (separatorIndex === -1) continue;

		const key = line.slice(0, separatorIndex).trim();
		const value = line.slice(separatorIndex + 1).trim();
		metadata[key] = parseScalar(value);
	}

	return metadata;
};

const findSvxFiles = async (dir) => {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const entryPath = path.join(dir, entry.name);
			if (entry.isDirectory()) return findSvxFiles(entryPath);
			if (entry.isFile() && entry.name.endsWith('.svx')) return [entryPath];
			return [];
		})
	);
	return files.flat();
};

const formatRows = (drafts) => {
	const rows = drafts.map((draft) => ({
		date: draft.date || 'no date',
		title: draft.title || 'Untitled',
		path: path.relative(rootDir, draft.filePath)
	}));

	const dateWidth = Math.max('Date'.length, ...rows.map((row) => row.date.length));
	const titleWidth = Math.max('Title'.length, ...rows.map((row) => row.title.length));

	const header = `${'Date'.padEnd(dateWidth)}  ${'Title'.padEnd(titleWidth)}  Path`;
	const divider = `${'-'.repeat(dateWidth)}  ${'-'.repeat(titleWidth)}  ${'-'.repeat(4)}`;
	const body = rows.map(
		(row) => `${row.date.padEnd(dateWidth)}  ${row.title.padEnd(titleWidth)}  ${row.path}`
	);

	return [header, divider, ...body].join('\n');
};

const main = async () => {
	const files = await findSvxFiles(blogsDir);
	const drafts = [];

	for (const filePath of files) {
		const content = await readFile(filePath, 'utf8');
		const metadata = parseFrontmatter(content, filePath);

		if (metadata.published !== true) {
			drafts.push({
				filePath,
				title: metadata.title,
				date: metadata.date
			});
		}
	}

	drafts.sort((a, b) => {
		const dateDiff = new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
		if (dateDiff !== 0) return dateDiff;
		return a.filePath.localeCompare(b.filePath);
	});

	if (drafts.length === 0) {
		console.log('No draft blogs found.');
		return;
	}

	console.log(`Found ${drafts.length} draft blog${drafts.length === 1 ? '' : 's'}:\n`);
	console.log(formatRows(drafts));
};

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
