<script lang="ts">
	import * as Breadcrumb from "$lib/registry/new-york/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root
	class="hidden md:flex"
	data-x-chunk-name="dashboard-06-chunk-0"
	data-x-chunk-description="A breadcrumb with two links and a page indicator."
>
	<Breadcrumb.List>
		<Breadcrumb.Item>
			<Breadcrumb.Link href="##">Dashboard</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Link href="##">Products</Breadcrumb.Link>
		</Breadcrumb.Item>
		<Breadcrumb.Separator />
		<Breadcrumb.Item>
			<Breadcrumb.Page>All Products</Breadcrumb.Page>
		</Breadcrumb.Item>
	</Breadcrumb.List>
</Breadcrumb.Root>
