<script lang="ts">
	import { config } from "@/stores";
	import { cn } from "@/utils";
</script>

<div class={cn(`theme-${$config.theme}`, "w-full")}>
	<slot />
</div>
