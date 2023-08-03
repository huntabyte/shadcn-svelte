<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { ctx, melt, type ContextRadioGroupProps } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };

	type $$Props = HTMLAttributes<HTMLDivElement> &
		ContextRadioGroupProps & {
			class?: string | null;
		};
	const { radioGroup } = ctx.setRadioGroup($$restProps);
</script>

<div use:melt={$radioGroup} class={className} {...$$restProps}>
	<slot />
</div>
