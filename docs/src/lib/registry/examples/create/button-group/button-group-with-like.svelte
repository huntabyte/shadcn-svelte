<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Like">
	<ButtonGroup>
		<Button variant="outline">
			<IconPlaceholder
				lucide="HeartIcon"
				tabler="IconBell"
				hugeicons="Notification02Icon"
				phosphor="HeartIcon"
				data-icon="inline-start"
			/>
			Like
		</Button>
		<Button variant="outline" size="icon" class="w-12">
			1.2K
		</Button>
	</ButtonGroup>
</Example>
