<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<nav {...restProps} class={cn("flex items-center space-x-4 lg:space-x-6", className)}>
	<a href="/examples/dashboard" class="text-sm font-medium transition-colors hover:text-primary">
		Overview
	</a>
	<a
		href="/examples/dashboard"
		class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
	>
		Customers
	</a>
	<a
		href="/examples/dashboard"
		class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
	>
		Products
	</a>
	<a
		href="/examples/dashboard"
		class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
	>
		Settings
	</a>
</nav>
