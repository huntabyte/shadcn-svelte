<script lang="ts">
	import AtSignIcon from "@lucide/svelte/icons/at-sign";
	import BlocksIcon from "@lucide/svelte/icons/blocks";
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import CircleUserIcon from "@lucide/svelte/icons/circle-user";
	import CodeIcon from "@lucide/svelte/icons/code-xml";
	import DatabaseIcon from "@lucide/svelte/icons/database";
	import MailIcon from "@lucide/svelte/icons/mail";
	import MessageCircleIcon from "@lucide/svelte/icons/message-circle";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import SparklesIcon from "@lucide/svelte/icons/sparkles";
	import UsersIcon from "@lucide/svelte/icons/users";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Settings from "$lib/registry/ui/settings/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
</script>

<Settings.Root class="h-[520px] flex-none overflow-hidden rounded-lg border bg-background">
	<Settings.Nav>
		<Settings.NavGroup label="User">
			<Settings.NavItem>
				{#snippet icon()}<CircleUserIcon />{/snippet}
				Profile
			</Settings.NavItem>
			<Settings.NavItem active>
				{#snippet icon()}<AtSignIcon />{/snippet}
				Accounts
				{#snippet sub()}
					<Settings.NavSubItem>
						{#snippet icon()}<MailIcon />{/snippet}
						Emails
					</Settings.NavSubItem>
					<Settings.NavSubItem>
						{#snippet icon()}<CalendarIcon />{/snippet}
						Calendars
					</Settings.NavSubItem>
				{/snippet}
			</Settings.NavItem>
		</Settings.NavGroup>
		<Settings.NavGroup label="Workspace">
			<Settings.NavItem>
				{#snippet icon()}<SettingsIcon />{/snippet}
				General
			</Settings.NavItem>
			<Settings.NavItem>
				{#snippet icon()}<DatabaseIcon />{/snippet}
				Data model
			</Settings.NavItem>
			<Settings.NavItem>
				{#snippet icon()}<UsersIcon />{/snippet}
				Members
			</Settings.NavItem>
			<Settings.NavItem>
				{#snippet icon()}<CodeIcon />{/snippet}
				Developers
			</Settings.NavItem>
			<Settings.NavItem>
				{#snippet icon()}<BlocksIcon />{/snippet}
				Apps
			</Settings.NavItem>
			<Settings.NavItem>
				{#snippet icon()}<SparklesIcon />{/snippet}
				AI
			</Settings.NavItem>
			<Settings.NavItem>
				{#snippet icon()}<MessageCircleIcon />{/snippet}
				Communication
			</Settings.NavItem>
		</Settings.NavGroup>
	</Settings.Nav>

	<Settings.Content>
		<Settings.Section title="Connected accounts" description="Manage your internet accounts.">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Account</Table.Head>
						<Table.Head class="text-end">Status</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						<Table.Cell>jacob@advenagroup.ca</Table.Cell>
						<Table.Cell class="text-end"><Badge tone="green">Synced</Badge></Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
			<div class="flex justify-end">
				<Button variant="outline" size="sm">Add account</Button>
			</div>
		</Settings.Section>

		<Settings.Section
			title="Blocklist"
			description="Exclude the following people and domains from my email sync."
		>
			<div class="flex gap-2">
				<InputGroup.Root>
					<InputGroup.Input
						aria-label="Email or domain to block"
						placeholder="eddy@gmail.com, @apple.com"
					/>
					<InputGroup.Addon>
						<MailIcon />
					</InputGroup.Addon>
				</InputGroup.Root>
				<Button variant="outline">Add to blocklist</Button>
			</div>
		</Settings.Section>

		<Settings.Section title="Settings" description="Configure your emails and calendar settings.">
			<Settings.Row title="Emails" description="Set email visibility and manage your blocklist.">
				{#snippet children({ labelId, descriptionId })}
					<Switch aria-labelledby={labelId} aria-describedby={descriptionId} />
				{/snippet}
			</Settings.Row>
			<Settings.Row
				title="Calendar"
				description="Configure and customize your calendar preferences."
			>
				{#snippet children({ labelId, descriptionId })}
					<Switch checked aria-labelledby={labelId} aria-describedby={descriptionId} />
				{/snippet}
			</Settings.Row>
		</Settings.Section>
	</Settings.Content>
</Settings.Root>
