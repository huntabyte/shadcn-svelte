<script lang="ts">
	import { ctx, melt, type DropdownRadioGroupProps } from ".";

	type $$Props = DropdownRadioGroupProps;
	const { radioGroup } = ctx.setRadioGroup($$restProps);
</script>

<div use:melt={$radioGroup}>
	<slot />
</div>
