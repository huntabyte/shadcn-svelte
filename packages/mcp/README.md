# @shadcn-svelte/mcp

An MCP server that lets AI agents add shadcn-svelte components to your project.

## Setup

Use the `mcp init` command in your project to configure your MCP client.

```bash
npx shadcn-svelte@latest mcp init --client claude
```

The supported clients are `claude`, `cursor`, `vscode`, `codex` and `opencode`.

### Manual setup

Add the server to your client's MCP configuration. For example, in Claude Code's `.mcp.json`:

```json
{
  "mcpServers": {
    "shadcn-svelte": {
      "command": "npx",
      "args": ["@shadcn-svelte/mcp@latest"]
    }
  }
}
```

## Tools

- `get_add_command_for_items`: returns the `shadcn-svelte add` command for one or more items, by name (e.g. `button`) or URL.
- `get_audit_checklist`: returns a checklist for verifying newly added components.

## Documentation

Visit https://shadcn-svelte.com to view the documentation.

## License

Licensed under the [MIT license](https://github.com/huntabyte/shadcn-svelte/blob/main/LICENSE.md).
