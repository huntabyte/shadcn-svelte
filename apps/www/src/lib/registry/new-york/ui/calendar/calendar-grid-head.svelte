<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";

	type $$Props = CalendarPrimitive.GridHeadProps;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<CalendarPrimitive.GridHead {...$$restProps}>
	<slot />
</CalendarPrimitive.GridHead>
