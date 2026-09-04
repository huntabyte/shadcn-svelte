import { error } from "../errors.js";
import { isUrl } from "../utils.js";

const GITHUB_OWNER_PATTERN = /^(?!.*--)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
const GITHUB_REPO_PATTERN = /^[a-zA-Z0-9._-]+$/;
const INVALID_GITHUB_REPO_NAMES = new Set([".", ".."]);
const WHITESPACE_PATTERN = /\s/;
const GITHUB_REF_OPTION_PATTERN = /^-/;

export type GitHubItemAddress = {
	scheme: "github";
	owner: string;
	repo: string;
	item: string;
	ref?: string;
};

export type GitHubRegistrySource = {
	owner: string;
	repo: string;
	ref?: string;
};

export function resolveGitHubRegistrySource(source: string): GitHubRegistrySource | null {
	const hashIndex = source.indexOf("#");
	const path = hashIndex === -1 ? source : source.slice(0, hashIndex);
	const ref = hashIndex === -1 ? undefined : source.slice(hashIndex + 1);
	const parts = path.split("/");

	if (parts.length !== 2) return null;

	const [owner, repo] = parts;
	if (!isGitHubOwner(owner) || !isGitHubRepo(repo)) return null;

	validateGitHubRef(ref, `registry source "${source}"`);

	return { owner, repo, ref };
}

export function resolveGitHubItemAddress(address: string): GitHubItemAddress | null {
	if (isUrl(address)) return null;

	const hashIndex = address.indexOf("#");
	const source = hashIndex === -1 ? address : address.slice(0, hashIndex);
	const ref = hashIndex === -1 ? undefined : address.slice(hashIndex + 1);
	const parts = source.split("/");

	if (parts.length < 3) return null;

	const [owner, repo, ...itemParts] = parts;
	if (!isGitHubOwner(owner) || !isGitHubRepo(repo)) return null;

	const item = itemParts.join("/");
	if (!item) return null;

	validateGitHubRef(ref, `item address "${address}"`);

	return { scheme: "github", owner, repo, item, ref };
}

function validateGitHubRef(ref: string | undefined, label: string) {
	if (
		ref !== undefined &&
		(!ref ||
			hasControlCharacter(ref) ||
			WHITESPACE_PATTERN.test(ref) ||
			GITHUB_REF_OPTION_PATTERN.test(ref))
	) {
		throw error(
			`Invalid GitHub ref in ${label}. Use a non-empty branch, tag, or commit SHA without whitespace, control characters, or leading dashes.`
		);
	}
}

function hasControlCharacter(value: string) {
	return [...value].some((char) => {
		const code = char.charCodeAt(0);
		return code <= 31 || code === 127;
	});
}

function isGitHubOwner(owner: string | undefined): owner is string {
	return !!owner && GITHUB_OWNER_PATTERN.test(owner);
}

function isGitHubRepo(repo: string | undefined): repo is string {
	return !!repo && GITHUB_REPO_PATTERN.test(repo) && !INVALID_GITHUB_REPO_NAMES.has(repo);
}
