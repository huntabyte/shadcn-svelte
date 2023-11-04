export function getEnvProxy(): string | undefined {
	const { HTTP_PROXY, http_proxy } = process.env;
	return HTTP_PROXY || http_proxy;
}
