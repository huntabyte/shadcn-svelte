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
	originalError: unknown
): Promise<GitHubAuthMode> {
	if (!state.decision) {
		state.originalError = originalError;
		const mode: GitHubAuthMode = getEnvGitHubToken() ? "token" : "gh";
		state.decision = Promise.resolve(mode).then((mode) => {
			if (!notifiedModes.has(mode)) {
				console.log(`Using ${mode === "token" ? "GH_TOKEN" : "gh"} credentials.`);
				notifiedModes.add(mode);
			}
			return mode;
		});
	}
	return state.decision;
}
