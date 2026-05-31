<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Inline">
	<Card.Root class="w-full p-0">
		<Card.Content class="p-0">
			<Command.Root>
				<Command.Input placeholder="Type a command or search..." />
				<Command.List>
					<Command.Empty>No results found.</Command.Empty>
					<Command.Group heading="Suggestions">
						<Command.Item>
							<IconPlaceholder
								lucide="CalendarIcon"
								tabler="IconCalendar"
								hugeicons="CalendarIcon"
								phosphor="CalendarBlankIcon"
								remixicon="RiCalendarLine"
							/>
							<span>Calendar</span>
						</Command.Item>
						<Command.Item>
							<IconPlaceholder
								lucide="SmileIcon"
								tabler="IconMoodSmile"
								hugeicons="SmileIcon"
								phosphor="SmileyIcon"
								remixicon="RiEmotionLine"
							/>
							<span>Search Emoji</span>
						</Command.Item>
						<Command.Item>
							<IconPlaceholder
								lucide="CalculatorIcon"
								tabler="IconCalculator"
								hugeicons="CalculatorIcon"
								phosphor="CalculatorIcon"
								remixicon="RiCalculatorLine"
							/>
							<span>Calculator</span>
						</Command.Item>
					</Command.Group>
					<Command.Separator />
					<Command.Group heading="Settings">
						<Command.Item>
							<IconPlaceholder
								lucide="UserIcon"
								tabler="IconUser"
								hugeicons="UserIcon"
								phosphor="UserIcon"
								remixicon="RiUserLine"
							/>
							<span>Profile</span>
							<Command.Shortcut>⌘P</Command.Shortcut>
						</Command.Item>
						<Command.Item>
							<IconPlaceholder
								lucide="CreditCardIcon"
								tabler="IconCreditCard"
								hugeicons="CreditCardIcon"
								phosphor="CreditCardIcon"
								remixicon="RiBankCardLine"
							/>
							<span>Billing</span>
							<Command.Shortcut>⌘B</Command.Shortcut>
						</Command.Item>
						<Command.Item>
							<IconPlaceholder
								lucide="SettingsIcon"
								tabler="IconSettings"
								hugeicons="SettingsIcon"
								phosphor="GearIcon"
								remixicon="RiSettingsLine"
							/>
							<span>Settings</span>
							<Command.Shortcut>⌘S</Command.Shortcut>
						</Command.Item>
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Card.Content>
	</Card.Root>
</Example>
