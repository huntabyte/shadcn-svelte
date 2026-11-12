import * as p from "@clack/prompts";
import color from "picocolors";
import { getGitHubAuthNoticeFromContext } from "./context.js";
import { getEnvGitHubToken, type GitHubAuthMode, type GitHubSource } from "./github-cli.js";

export type GitHubSourceAuthState = {
	decision?: Promise<GitHubAuthMode>;
	anonymousLock: boolean;
	originalError?: unknown;
};

const coordinators = new WeakMap<object, Map<string, GitHubSourceAuthState>>();
const notifiedModes = new Set<GitHubAuthMode>();

export function resetGitHubAuthNotices() {
	notifiedModes.clear();
}

export function getGitHubAuthState(anchor: object, source: GitHubSource) {
	let sources = coordinators.get(anchor);
	if (!sources) {
		sources = new Map();
		coordinators.set(anchor, sources);
	}
	const key = `${source.owner.toLowerCase()}/${source.repo.toLowerCase()}#${source.ref ?? "HEAD"}`;
	let state = sources.get(key);
	if (!state) {
		state = { anonymousLock: false };
		sources.set(key, state);
	}
	return state;
}

export function selectGitHubAuthMode(
	state: GitHubSourceAuthState,
	_source: GitHubSource,
	originalError: unknown
): Promise<GitHubAuthMode> {
	if (!state.decision) {
		state.originalError = originalError;
		state.decision = decideAndNotify().catch((error) => {
			state.decision = undefined;
			throw error;
		});
	}
	return state.decision;
}

async function decideAndNotify() {
	const mode: GitHubAuthMode = getEnvGitHubToken() ? "token" : "gh";
	if (notifiedModes.has(mode)) return mode;

	const notice = `Using ${mode === "token" ? "GH_TOKEN" : "gh"} credentials.`;
	const onNotice = getGitHubAuthNoticeFromContext();
	if (onNotice) await onNotice(notice);
	else p.log.success(color.gray(notice));
	notifiedModes.add(mode);

	return mode;
}
