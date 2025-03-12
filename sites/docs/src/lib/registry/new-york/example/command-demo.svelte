<script lang="ts">
	import Calculator from "@lucide/svelte/icons/calculator";
	import Calendar from "@lucide/svelte/icons/calendar";
	import CreditCard from "@lucide/svelte/icons/credit-card";
	import Settings from "@lucide/svelte/icons/settings";
	import Smile from "@lucide/svelte/icons/smile";
	import User from "@lucide/svelte/icons/user";

	import * as Command from "$lib/registry/new-york/ui/command/index.js";
</script>

<Command.Root class="max-w-[450px] rounded-lg border shadow-md">
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Suggestions">
			<Command.Item>
				<Calendar />
				<span>Calendar</span>
			</Command.Item>
			<Command.Item>
				<Smile />
				<span>Search Emoji</span>
			</Command.Item>
			<Command.Item disabled>
				<Calculator />
				<span>Calculator</span>
			</Command.Item>
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Settings">
			<Command.Item>
				<User />
				<span>Profile</span>
				<Command.Shortcut>⌘P</Command.Shortcut>
			</Command.Item>
			<Command.Item>
				<CreditCard />
				<span>Billing</span>
				<Command.Shortcut>⌘B</Command.Shortcut>
			</Command.Item>
			<Command.Item>
				<Settings />
				<span>Settings</span>
				<Command.Shortcut>⌘S</Command.Shortcut>
			</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Root>
