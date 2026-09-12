import { AsyncLocalStorage } from "node:async_hooks";

type RegistryContext = {
	env?: NodeJS.ProcessEnv;
	onGitHubAuthNotice?: (message: string) => void | Promise<void>;
};

const registryContext = new AsyncLocalStorage<RegistryContext>();

export function withRegistryContext<T>(callback: () => T, options: RegistryContext = {}): T {
	const parentContext = registryContext.getStore();
	return registryContext.run(
		{
			env: options.env ?? parentContext?.env,
			onGitHubAuthNotice: options.onGitHubAuthNotice ?? parentContext?.onGitHubAuthNotice,
		},
		callback
	);
}

export function getRegistryEnvFromContext(key: string) {
	const context = registryContext.getStore();
	return context?.env ? context.env[key] : process.env[key];
}

export function getGitHubAuthNoticeFromContext() {
	return registryContext.getStore()?.onGitHubAuthNotice;
}
