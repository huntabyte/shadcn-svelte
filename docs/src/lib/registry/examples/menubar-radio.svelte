<script lang="ts">
	import * as Menubar from "$lib/registry/ui/menubar/index.js";

	let profile = $state("andy");
</script>

<Menubar.Root>
	<Menubar.Menu>
		<Menubar.Trigger>Profiles</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.RadioGroup bind:value={profile}>
				<Menubar.Label inset>Switch Profile</Menubar.Label>
				<Menubar.Separator />
				<Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
				<Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
				<Menubar.RadioItem value="luis">Luis</Menubar.RadioItem>
			</Menubar.RadioGroup>
			<Menubar.Separator />
			<Menubar.Item inset>Edit...</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
