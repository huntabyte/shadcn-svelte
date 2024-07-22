<script lang="ts">
	import CaretSort from "svelte-radix/CaretSort.svelte";
	import Check from "svelte-radix/Check.svelte";
	import PlusCircled from "svelte-radix/PlusCircled.svelte";

	import { tick } from "svelte";
	import { cn } from "$lib/utils.js";
	import * as Avatar from "$lib/registry/new-york/ui/avatar/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Command from "$lib/registry/new-york/ui/command/index.js";
	import * as Dialog from "$lib/registry/new-york/ui/dialog/index.js";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";

	let className: string | undefined | null = undefined;
	export { className as class };

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

	type Team = (typeof groups)[number]["teams"][number];

	let open = false;
	let showTeamDialog = false;

	let selectedTeam: Team = groups[0].teams[0];

	function closeAndRefocusTrigger(triggerId: string) {
		open = false;

		tick().then(() => document.getElementById(triggerId)?.focus());
	}
</script>

<Dialog.Root bind:open={showTeamDialog}>
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				aria-label="Select a team"
				class={cn("w-[200px] justify-between", className)}
			>
				<Avatar.Root class="mr-2 h-5 w-5">
					<Avatar.Image
						src="https://avatar.vercel.sh/${selectedTeam.value}.png"
						alt={selectedTeam.label}
						class="grayscale"
					/>
					<Avatar.Fallback>SC</Avatar.Fallback>
				</Avatar.Root>
				{selectedTeam.label}
				<CaretSort class="ml-auto h-4 w-4 shrink-0 opacity-50" />
			</Button>
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
										closeAndRefocusTrigger(ids.trigger);
									}}
									value={team.label}
									class="text-sm"
								>
									<Avatar.Root class="mr-2 h-5 w-5">
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
											"ml-auto h-4 w-4",
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
							<PlusCircled class="mr-2 h-5 w-5" />
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
					<Select.Root>
						<Select.Trigger>
							<Select.Value placeholder="Select a plan" />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="free">
								<span class="font-medium">Free </span>-<span
									class="text-muted-foreground"
								>
									Trial for two weeks
								</span>
							</Select.Item>
							<Select.Item value="pro">
								<span class="font-medium">Pro</span> -
								<span class="text-muted-foreground"> $9/month per user </span>
							</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
			</div>
		</div>
		<Dialog.Footer>
			<Button variant="outline" on:click={() => (showTeamDialog = false)}>Cancel</Button>
			<Button type="submit">Continue</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
