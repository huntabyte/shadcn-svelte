<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Menubar from "$lib/registry/ui/menubar/index.js";

	let user = $state("benoit");
	let theme = $state("system");
</script>

<Example title="With Radio">
	<Menubar.Root>
		<Menubar.Menu>
			<Menubar.Trigger>Profiles</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.RadioGroup bind:value={user}>
					<Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
					<Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
					<Menubar.RadioItem value="luis">Luis</Menubar.RadioItem>
				</Menubar.RadioGroup>
				<Menubar.Separator />
				<Menubar.Item inset>Edit...</Menubar.Item>
				<Menubar.Item inset>Add Profile...</Menubar.Item>
			</Menubar.Content>
		</Menubar.Menu>
		<Menubar.Menu>
			<Menubar.Trigger>Theme</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.RadioGroup bind:value={theme}>
					<Menubar.RadioItem value="light">Light</Menubar.RadioItem>
					<Menubar.RadioItem value="dark">Dark</Menubar.RadioItem>
					<Menubar.RadioItem value="system">System</Menubar.RadioItem>
				</Menubar.RadioGroup>
			</Menubar.Content>
		</Menubar.Menu>
	</Menubar.Root>
</Example>
