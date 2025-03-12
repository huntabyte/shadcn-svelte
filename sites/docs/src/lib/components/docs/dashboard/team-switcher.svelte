<script lang="ts">
	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
	import Check from "@lucide/svelte/icons/check";
	import CirclePlus from "@lucide/svelte/icons/circle-plus";
	import { tick } from "svelte";
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";
	import * as Avatar from "$lib/registry/new-york/ui/avatar/index.js";
	import { Button, buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import * as Command from "$lib/registry/new-york/ui/command/index.js";
	import * as Dialog from "$lib/registry/new-york/ui/dialog/index.js";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";

	let { class: className }: PrimitiveElementAttributes = $props();

	const groups = [
		{
			label: "Personal Account",
			teams: [
				{
					label: "Alicia Koch",
					value: "personal",
				},
			],
		},
		{
			label: "Teams",
			teams: [
				{
					label: "Acme Inc.",
					value: "acme-inc",
				},
				{
					label: "Monsters Inc.",
					value: "monsters",
				},
			],
		},
	];

	type Plan = {
		value: string;
		label: string;
		pricing: string;
	};

	const plans: Plan[] = [
		{
			value: "free",
			label: "Free",
			pricing: "Trial for two weeks",
		},
		{
			value: "pro",
			label: "Pro",
			pricing: "$9/month per user",
		},
	];

	type Team = (typeof groups)[number]["teams"][number];

	let open = $state(false);
	let showTeamDialog = $state(false);
	let selectedTeam: Team = $state(groups[0].teams[0]);
	let triggerId = "team-switcher-trigger";

	let plan = $state("");

	const selectedPlan = $derived(plans.find((p) => p.value === plan));

	function closeAndRefocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => document.getElementById(triggerId)?.focus());
	}
</script>

{#snippet PlanItemContent({ label, pricing }: Plan)}
	<span class="font-medium">{label} </span>-<span class="text-muted-foreground">
		{pricing}
	</span>
{/snippet}

<Dialog.Root bind:open={showTeamDialog}>
	<Popover.Root bind:open>
		<Popover.Trigger
			id={triggerId}
			role="combobox"
			aria-expanded={open}
			aria-label="Select a team"
			class={cn(
				buttonVariants({ variant: "outline", class: "w-[200px] justify-between" }),
				className
			)}
		>
			<Avatar.Root class="mr-2 size-5">
				<Avatar.Image
					src="https://avatar.vercel.sh/${selectedTeam.value}.png"
					alt={selectedTeam.label}
					class="grayscale"
				/>
				<Avatar.Fallback>SC</Avatar.Fallback>
			</Avatar.Root>
			{selectedTeam.label}
			<ChevronsUpDown class="ml-auto size-4 shrink-0 opacity-50" />
		</Popover.Trigger>
		<Popover.Content class="w-[200px] p-0">
			<Command.Root>
				<Command.Input placeholder="Search team..." />
				<Command.List>
					<Command.Empty>No team found.</Command.Empty>
					{#each groups as group}
						<Command.Group heading={group.label}>
							{#each group.teams as team}
								<Command.Item
									onSelect={() => {
										selectedTeam = team;
										closeAndRefocusTrigger(triggerId);
									}}
									value={team.label}
									class="text-sm"
								>
									<Avatar.Root class="mr-2 size-5">
										<Avatar.Image
											src="https://avatar.vercel.sh/${team.value}.png"
											alt={team.label}
											class="grayscale"
										/>
										<Avatar.Fallback>SC</Avatar.Fallback>
									</Avatar.Root>
									{team.label}
									<Check
										class={cn(
											"ml-auto size-4",
											selectedTeam.value !== team.value && "text-transparent"
										)}
									/>
								</Command.Item>
							{/each}
						</Command.Group>
					{/each}
				</Command.List>
				<Command.Separator />
				<Command.List>
					<Command.Group>
						<Command.Item
							onSelect={() => {
								open = false;
								showTeamDialog = true;
							}}
						>
							<CirclePlus class="mr-2 size-5" />
							Create Team
						</Command.Item>
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create team</Dialog.Title>
			<Dialog.Description>
				Add a new team to manage products and customers.
			</Dialog.Description>
		</Dialog.Header>
		<div>
			<div class="space-y-4 py-2 pb-4">
				<div class="space-y-2">
					<Label for="name">Team name</Label>
					<Input id="name" placeholder="Acme Inc." />
				</div>
				<div class="space-y-2">
					<Label for="plan">Subscription plan</Label>
					<Select.Root type="single">
						<Select.Trigger>
							{#if selectedPlan}
								{@render PlanItemContent(selectedPlan)}
							{:else}
								Select a plan
							{/if}
						</Select.Trigger>
						<Select.Content>
							{#each plans as plan}
								<Select.Item value={plan.value} label={plan.label}>
									{@render PlanItemContent(plan)}
								</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			</div>
		</div>
		<Dialog.Footer>
			<Button variant="outline" onclick={() => (showTeamDialog = false)}>Cancel</Button>
			<Button type="submit">Continue</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
