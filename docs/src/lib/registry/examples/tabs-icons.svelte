<script lang="ts">
	import AppWindowIcon from "@lucide/svelte/icons/app-window";
	import CodeIcon from "@lucide/svelte/icons/code";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
</script>

<Tabs.Root value="preview">
	<Tabs.List>
		<Tabs.Trigger value="preview">
			<AppWindowIcon />
			Preview
		</Tabs.Trigger>
		<Tabs.Trigger value="code">
			<CodeIcon />
			Code
		</Tabs.Trigger>
	</Tabs.List>
</Tabs.Root>
