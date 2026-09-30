---
title: MCP Server
description: Use the shadcn-svelte MCP server to browse, search, and install components from the configured registry.
---

<script>
	import PMExecute from "$lib/components/pm-execute.svelte";
	import Callout from "$lib/components/callout.svelte";
</script>

The shadcn-svelte MCP server lets AI assistants browse, search, inspect, and install items from the registry configured in your project's `components.json`.

For example, you can ask an AI assistant to:

- _"Show me available shadcn-svelte components."_
- _"Find a login form example."_
- _"Add the button and dialog components to this project."_

---

## Quick Start

Run the init command in your project and select your MCP client.

<PMExecute command="shadcn-svelte@latest mcp init" />

You can also pass the client explicitly:

```bash
npx shadcn-svelte@latest mcp init --client claude
npx shadcn-svelte@latest mcp init --client cursor
npx shadcn-svelte@latest mcp init --client vscode
npx shadcn-svelte@latest mcp init --client opencode
```

For Codex, the CLI prints the configuration to add manually:

```bash
npx shadcn-svelte@latest mcp init --client codex
```

```toml title="~/.codex/config.toml" showLineNumbers
[mcp_servers.shadcn-svelte]
command = "npx"
args = ["shadcn-svelte@latest", "mcp"]
```

Restart your MCP client after changing its configuration.

---

## What Is MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) is an open protocol that lets AI assistants connect to tools and external data sources.

With the shadcn-svelte MCP server, your assistant can:

- **Browse components** from the configured shadcn-svelte registry
- **Search examples** by component name or UI pattern
- **Inspect registry items** including their file contents
- **Install with natural language** by translating requests into CLI commands

---

## Configuration

### Claude Code

```json title=".mcp.json" showLineNumbers
{
  "mcpServers": {
    "shadcn-svelte": {
      "command": "npx",
      "args": ["shadcn-svelte@latest", "mcp"]
    }
  }
}
```

### Cursor

```json title=".cursor/mcp.json" showLineNumbers
{
  "mcpServers": {
    "shadcn-svelte": {
      "command": "npx",
      "args": ["shadcn-svelte@latest", "mcp"]
    }
  }
}
```

### VS Code

```json title=".vscode/mcp.json" showLineNumbers
{
  "servers": {
    "shadcn-svelte": {
      "command": "npx",
      "args": ["shadcn-svelte@latest", "mcp"]
    }
  }
}
```

### OpenCode

```json title="opencode.json" showLineNumbers
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "shadcn-svelte": {
      "type": "local",
      "command": ["npx", "shadcn-svelte@latest", "mcp"],
      "enabled": true
    }
  }
}
```

### Codex

<Callout>
	The CLI cannot automatically update `~/.codex/config.toml`. Add the
	configuration manually, then restart Codex.
</Callout>

```toml title="~/.codex/config.toml" showLineNumbers
[mcp_servers.shadcn-svelte]
command = "npx"
args = ["shadcn-svelte@latest", "mcp"]
```

---

## Tools

The MCP server exposes tools for the registry in your current project:

- `get_project_registry`
- `list_items_in_registry`
- `search_items_in_registry`
- `view_items_in_registry`
- `get_item_examples_from_registry`
- `get_add_command_for_items`
- `get_audit_checklist`

The server reads your project's `components.json` and uses its `registry` and `style` settings. Unlike shadcn/ui, shadcn-svelte does not currently include the same multi-registry directory workflow.

---

## Example Prompts

### Browse & Search

- Show me all available shadcn-svelte components
- Find me a login form example
- Search for chart components

### Install Items

- Add the button component to my project
- Add dialog and card
- Create a login form using shadcn-svelte components

---

## Troubleshooting

### MCP Not Responding

1. Verify the MCP server is configured in your client.
2. Restart the MCP client after configuration changes.
3. Make sure your project has a valid `components.json`.
4. Confirm the registry URL in `components.json` is reachable.

### Installation Failures

1. Run `shadcn-svelte init` if `components.json` is missing.
2. Check that your aliases resolve in `tsconfig.json` or `jsconfig.json`.
3. Run the returned `shadcn-svelte add` command manually to see the full CLI error.

## Learn More

- [CLI](/docs/cli)
- [Registry](/docs/registry)
- [MCP Specification](https://modelcontextprotocol.io)
