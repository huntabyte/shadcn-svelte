<script lang="ts">
	import { Calendar, EnvelopeClosed, Face, Gear, Person, Rocket } from "radix-icons-svelte";
	import * as Command from "@/registry/new-york/ui/command";
</script>

<Command.Root class="rounded-lg border shadow-md max-w-[450px]">
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
