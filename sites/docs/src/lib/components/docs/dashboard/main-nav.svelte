<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<nav {...restProps} class={cn("flex items-center space-x-4 lg:space-x-6", className)}>
	<a href="/examples/dashboard" class="hover:text-primary text-sm font-medium transition-colors">
		Overview
	</a>
	<a
		href="/examples/dashboard"
		class="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
	>
		Customers
	</a>
	<a
		href="/examples/dashboard"
		class="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
	>
		Products
	</a>
	<a
		href="/examples/dashboard"
		class="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
	>
		Settings
	</a>
</nav>
