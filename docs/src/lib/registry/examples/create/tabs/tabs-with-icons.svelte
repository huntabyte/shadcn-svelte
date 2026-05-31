<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Icons">
	<Tabs.Root value="preview">
		<Tabs.List>
			<Tabs.Trigger value="preview">
				<IconPlaceholder
					lucide="AppWindowIcon"
					tabler="IconAppWindow"
					hugeicons="CursorInWindowIcon"
					phosphor="AppWindowIcon"
					remixicon="RiWindowLine"
				/>
				Preview
			</Tabs.Trigger>
			<Tabs.Trigger value="code">
				<IconPlaceholder
					lucide="CodeIcon"
					tabler="IconCode"
					hugeicons="CodeIcon"
					phosphor="CodeIcon"
					remixicon="RiCodeLine"
				/>
				Code
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
</Example>
