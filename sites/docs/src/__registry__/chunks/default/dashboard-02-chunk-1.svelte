<script lang="ts">
	import { Button } from "$lib/registry/default/ui/button/index.js";
</script>

<div
	data-x-chunk-name="dashboard-02-chunk-1"
	data-x-chunk-description="An empty state showing no products with a heading, description and a call to action to add a product."
	class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
>
	<div class="flex flex-col items-center gap-1 text-center">
		<h3 class="text-2xl font-bold tracking-tight">You have no products</h3>
		<p class="text-muted-foreground text-sm">
			You can start selling as soon as you add a product.
		</p>
		<Button class="mt-4">Add Product</Button>
	</div>
</div>
