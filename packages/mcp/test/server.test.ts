import { Client, InMemoryTransport } from "@modelcontextprotocol/client";
import { afterAll, beforeAll, expect, it } from "vitest";
import pkg from "../package.json" with { type: "json" };
import { server } from "../src/server.js";

const client = new Client({ name: "test", version: "1.0.0" });

beforeAll(async () => {
	const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
	await Promise.all([client.connect(clientTransport), server.connect(serverTransport)]);
});

afterAll(async () => {
	await client.close();
	await server.close();
});

it("only advertises tools", () => {
	expect(Object.keys(client.getServerCapabilities() ?? {})).toEqual(["tools"]);
});

it("lists the tools that do not require registry search", async () => {
	const result = await client.listTools();
	expect(result.tools.map((tool) => tool.name)).toEqual([
		"get_add_command_for_items",
		"get_audit_checklist",
	]);
});

it("returns an add command for the requested items", async () => {
	const result = await client.callTool({
		name: "get_add_command_for_items",
		arguments: {
			items: [
				"button",
				"data-table",
				"my_item",
				"MyCard",
				"https://example.com/r/item.json?a=1&b=2",
			],
		},
	});

	expect(result.isError).toBeUndefined();
	expect(result.content).toEqual([
		{
			type: "text",
			text: expect.stringContaining(
				`shadcn-svelte@latest add -y "button" "data-table" "my_item" "MyCard" "https://example.com/r/item.json?a=1&b=2"`
			),
		},
	]);
});

it.each([
	{ arguments: {} },
	{ arguments: { items: [] } },
	{ arguments: { items: ["button card"] } },
	{ arguments: { items: ["--overwrite"] } },
	{ arguments: { items: ["https://example.com/a --overwrite"] } },
	{ arguments: { items: ['https://example.com/a";calc;"'] } },
])("rejects invalid input: $arguments", async ({ arguments: args }) => {
	const result = await client.callTool({ name: "get_add_command_for_items", arguments: args });

	expect(result.isError).toBe(true);
	expect(result.content).toEqual([
		{
			type: "text",
			text: expect.stringContaining("Input validation error"),
		},
	]);
});

it.each([{}, { arguments: {} }])("returns the audit checklist (%j)", async (params) => {
	const result = await client.callTool({ name: "get_audit_checklist", ...params });

	expect(result.content).toEqual([
		{
			type: "text",
			text: expect.stringContaining("Component Audit Checklist"),
		},
	]);
});
