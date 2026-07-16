<script lang="ts">
	import DotIcon from "@lucide/svelte/icons/dot";
	import * as Breadcrumb from "$lib/registry/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		<Breadcrumb.Item>
			<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator>
			<DotIcon />
		</Breadcrumb.Separator>
		<Breadcrumb.Item>
			<Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator>
			<DotIcon />
		</Breadcrumb.Separator>
		<Breadcrumb.Item>
			<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>
