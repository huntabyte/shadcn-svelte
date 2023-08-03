<script lang="ts">
	import { ctx } from ".";

	let className: string | null | undefined = undefined;
	export { className as class };
	export let placeholder: string = "";

	const valueLabel = ctx.getValue();
</script>

<span class={className} {...$$restProps}>
	{$valueLabel ? $valueLabel : placeholder}
</span>
