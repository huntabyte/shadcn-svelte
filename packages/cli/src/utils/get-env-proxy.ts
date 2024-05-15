import process from "node:process";

export function getEnvProxy(): string | undefined {
	const { env } = process;
	return (
		env.HTTP_PROXY ||
		env.http_proxy ||
		env.HTTPS_PROXY ||
		env.https_proxy ||
		env.npm_config_proxy ||
		env.npm_config_https_proxy
	);
}
