<script lang="ts">
	import { ctx, melt, type MenubarRadioGroupProps } from ".";

	type $$Props = MenubarRadioGroupProps;
	const { radioGroup } = ctx.setRadioGroup($$restProps);
</script>

<div use:melt={$radioGroup}>
	<slot />
</div>
