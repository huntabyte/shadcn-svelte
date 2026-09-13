---
title: Authentication
description: Configure credentials for private component registries.
---

<script>
	import PMExecute from "$lib/components/pm-execute.svelte";
</script>

Private registries can require credentials before returning a registry item.
Configure those credentials in `components.json` using headers or query
parameters. Your registry server is responsible for validating them.

## Bearer tokens

Configure a [namespace](/docs/registry/namespace) with an `Authorization` header:

```json title="components.json"
{
  "registries": {
    "@acme": {
      "url": "https://acme.com/r/{name}.json",
      "headers": {
        "Authorization": "Bearer ${ACME_TOKEN}"
      }
    }
  }
}
```

Store the token in an environment variable or a project-local `.env.local` file:

```dotenv title=".env.local"
ACME_TOKEN=your-token
```

Keep files containing credentials out of version control. The placeholder in
`components.json` can be committed; the CLI substitutes its value when fetching
the item and leaves the configuration unchanged.

<PMExecute command="shadcn-svelte@latest add @acme/button" />

## Custom headers and parameters

Use `headers` for other authentication schemes. For APIs that require query
parameters, use `params`:

```json title="components.json"
{
  "registries": {
    "@acme": {
      "url": "https://acme.com/r/{name}.json",
      "headers": {
        "X-Api-Key": "${ACME_API_KEY}"
      },
      "params": {
        "version": "v2",
        "team": "${ACME_TEAM}"
      }
    }
  }
}
```

Environment variables can appear in URLs, headers, and parameters. Parameter
values are URL-encoded and appended to any query parameters already in the URL.
Prefer headers for credentials when your server supports them, since URLs may
appear in server or proxy logs.

## Environment files

The CLI reads environment files from the project directory, including when you
pass `--cwd`. Existing shell environment variables take precedence, followed by:

1. `.env.local`
2. `.env.development.local`
3. `.env.development`
4. `.env`

If a registry requires an unset or empty environment variable, the CLI reports
its name before fetching the item. In CI, supply credentials through your CI
provider's environment variables.

## Dependencies and redirects

Namespaced dependencies use the credentials configured for their own namespace.
A dependency such as `button` or an absolute URL does not inherit the parent's
headers. Reference private dependencies as `@acme/dependency` to apply their
registry's headers and query parameters.

Relative dependencies such as `./stepper.json`, including those generated from
`local:stepper`, inherit headers when they remain on the parent's origin. They
do not inherit query parameters. Use a namespaced reference if a dependency
requires authentication through parameters.

Headers are preserved on redirects within the same origin. On redirects to a
different origin, the CLI removes custom headers except `Accept` and `User-Agent`.
An origin includes the URL's protocol, host, and port.

## Authentication errors

Return `401` when credentials are missing or invalid, or `403` when the user does
not have access to the requested item. The CLI reports the item reference and
status code without printing the expanded registry URL or credentials.
