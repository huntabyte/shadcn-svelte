<script lang="ts">
	import { type PrimitiveElementAttributes, cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: PrimitiveElementAttributes = $props();
</script>

<section class={cn("border-grid border-b", className)} {...restProps}>
	<div class="container-wrapper">
		<div class="container flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12">
			{@render children?.()}
		</div>
	</div>
</section>
