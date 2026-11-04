<script lang="ts">
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { RecordFields, type RecordField } from "$lib/registry/ui/record-fields/index.js";
	import { RecordLayout } from "$lib/registry/ui/record-layout/index.js";

	type Company = {
		name: string;
		domain: string | null;
		email: string | null;
		stage: string | null;
		value: number | null;
		employees: number | null;
		founded: string | null;
		active: boolean;
		notes: string | null;
		[key: string]: unknown;
	};

	let company = $state<Company>({
		name: "Acme Corp",
		domain: "acme.com",
		email: "hello@acme.com",
		stage: "customer",
		value: 12400,
		employees: 48,
		founded: "2012-03-09",
		active: true,
		notes: "Annual contract, renews in June.",
	});

	const companyFields: RecordField<Company>[] = [
		{ id: "name", label: "Name", type: "text" },
		{ id: "domain", label: "Domain", type: "url", placeholder: "Add a domain" },
		{ id: "email", label: "Email", type: "email", placeholder: "Add an email" },
		{
			id: "stage",
			label: "Stage",
			type: "select",
			options: [
				{ value: "lead", label: "Lead", tone: "blue" },
				{ value: "customer", label: "Customer", tone: "green" },
				{ value: "lost", label: "Lost", tone: "red" },
			],
		},
		{ id: "value", label: "Value", type: "currency", currency: "CAD" },
		{ id: "employees", label: "Employees", type: "number" },
		{ id: "founded", label: "Founded", type: "date" },
		{ id: "active", label: "Active", type: "boolean" },
		{ id: "notes", label: "Notes", type: "textarea", placeholder: "Add a note" },
	];

	let saved = $state("");

	async function change(id: string, value: unknown) {
		await new Promise((r) => setTimeout(r, 150));
		if (id === "email" && typeof value === "string" && !value.includes("@")) {
			throw new Error("Not an email");
		}
		if (id === "active" && value === false && company.stage === "customer") {
			throw new Error("A customer stays active");
		}
		(company as Record<string, unknown>)[id] = value;
		saved = `Saved ${id}`;
	}
</script>

<div class="h-[34rem] w-full overflow-hidden rounded-lg border">
	<RecordLayout>
		{#snippet header()}
			<span
				class="flex size-6 items-center justify-center rounded-[4px] bg-primary text-[11px] font-medium text-primary-foreground"
				>{company.name.charAt(0)}</span
			>
			<h2 class="text-[15px] font-medium">{company.name}</h2>
			<Badge tone={company.active ? "green" : "gray"}
				>{company.active ? "Active" : "Inactive"}</Badge
			>
			<span class="ms-auto text-[13px] text-muted-foreground" role="status">{saved}</span>
		{/snippet}
		{#snippet fields()}
			<RecordFields record={company} fields={companyFields} onChange={change} />
		{/snippet}
		<Tabs.Root value="notes" class="p-4">
			<Tabs.List>
				<Tabs.Trigger value="notes">Notes</Tabs.Trigger>
				<Tabs.Trigger value="emails">Emails</Tabs.Trigger>
				<Tabs.Trigger value="tasks">Tasks</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="notes" class="pt-3 text-[13px] text-muted-foreground">
				{company.notes ?? "No notes yet."}
			</Tabs.Content>
			<Tabs.Content value="emails" class="pt-3 text-[13px] text-muted-foreground">
				Emails linked to this company appear here.
			</Tabs.Content>
			<Tabs.Content value="tasks" class="pt-3 text-[13px] text-muted-foreground">
				No tasks.
			</Tabs.Content>
		</Tabs.Root>
	</RecordLayout>
</div>
