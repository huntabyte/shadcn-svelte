import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { afterAll, beforeAll, expect, it } from "vitest";
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
		arguments: { items: ["button", "card"] },
	});

	expect(result.isError).toBeUndefined();
	expect(result.content).toEqual([
		{
			type: "text",
			text: expect.stringContaining("shadcn-svelte@latest add button card"),
		},
	]);
});

it("returns the audit checklist", async () => {
	const result = await client.callTool({
		name: "get_audit_checklist",
		arguments: {},
	});

	expect(result.content).toEqual([
		{
			type: "text",
			text: expect.stringContaining("Component Audit Checklist"),
		},
	]);
});

it("reports invalid input", async () => {
	const result = await client.callTool({
		name: "get_add_command_for_items",
		arguments: {},
	});

	expect(result.isError).toBe(true);
	expect(result.content).toEqual([
		{
			type: "text",
			text: expect.stringContaining("Invalid input parameters"),
		},
	]);
});
