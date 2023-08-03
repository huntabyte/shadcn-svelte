<script lang="ts">
	import { ctx, melt } from ".";

	const { group, key } = ctx.getGroup();
</script>

<div use:melt={$group(key)} {...$$restProps}>
	<slot />
</div>
