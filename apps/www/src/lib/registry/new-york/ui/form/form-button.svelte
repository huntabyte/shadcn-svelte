<script lang="ts">
	import * as Button from "@/registry/new-york/ui/button/index.js";

	type $$Props = Button.Props;
</script>

<Button.Root type="submit" {...$$restProps}>
	<slot />
</Button.Root>
