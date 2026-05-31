<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Checkbox from "$lib/registry/ui/checkbox/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
</script>

<Example title="Group">
	<Field.Field>
		<Field.Label>Show these items on the desktop:</Field.Label>
		<Field.Field orientation="horizontal">
			<Checkbox.Root id="finder-pref-9k2-hard-disks-ljj" />
			<Field.Label for="finder-pref-9k2-hard-disks-ljj" class="font-normal">
				Hard disks
			</Field.Label>
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Checkbox.Root id="finder-pref-9k2-external-disks-1yg" />
			<Field.Label for="finder-pref-9k2-external-disks-1yg" class="font-normal">
				External disks
			</Field.Label>
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Checkbox.Root id="finder-pref-9k2-cds-dvds-fzt" />
			<Field.Label for="finder-pref-9k2-cds-dvds-fzt" class="font-normal">
				CDs, DVDs, and iPods
			</Field.Label>
		</Field.Field>
		<Field.Field orientation="horizontal">
			<Checkbox.Root id="finder-pref-9k2-connected-servers-6l2" />
			<Field.Label for="finder-pref-9k2-connected-servers-6l2" class="font-normal">
				Connected servers
			</Field.Label>
		</Field.Field>
	</Field.Field>
</Example>
