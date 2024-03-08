<script lang="ts">
	import Calendar from "svelte-radix/Calendar.svelte";
	import EnvelopeClosed from "svelte-radix/EnvelopeClosed.svelte";
	import Face from "svelte-radix/Face.svelte";
	import Gear from "svelte-radix/Gear.svelte";
	import Person from "svelte-radix/Person.svelte";
	import Rocket from "svelte-radix/Rocket.svelte";

	import * as Command from "$lib/registry/new-york/ui/command/index.js";
</script>

<Command.Root class="max-w-[450px] rounded-lg border shadow-md">
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Suggestions">
			<Command.Item>
				<Calendar class="mr-2 h-4 w-4" />
				<span>Calendar</span>
			</Command.Item>
			<Command.Item>
				<Face class="mr-2 h-4 w-4" />
				<span>Search Emoji</span>
			</Command.Item>
			<Command.Item>
				<Rocket class="mr-2 h-4 w-4" />
				<span>Launch</span>
			</Command.Item>
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Settings">
			<Command.Item>
				<Person class="mr-2 h-4 w-4" />
				<span>Profile</span>
				<Command.Shortcut>⌘P</Command.Shortcut>
			</Command.Item>
			<Command.Item>
				<EnvelopeClosed class="mr-2 h-4 w-4" />
				<span>Mail</span>
				<Command.Shortcut>⌘B</Command.Shortcut>
			</Command.Item>
			<Command.Item>
				<Gear class="mr-2 h-4 w-4" />
				<span>Settings</span>
				<Command.Shortcut>⌘S</Command.Shortcut>
			</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Root>
