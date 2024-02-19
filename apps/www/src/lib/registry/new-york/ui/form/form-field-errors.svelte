<script lang="ts">
	import {
		FieldErrors as FieldErrorsPrimitive,
		type FieldErrorsProps as FieldErrorsPrimitiveProps,
	} from "@huntabyte/fsnap";
	import { cn } from "$lib/utils";

	type $$Props = FieldErrorsPrimitiveProps & {
		errorClasses?: string | undefined | null;
	};

	let className: $$Props["class"] = undefined;
	export { className as class };
	export let errorClasses: $$Props["class"] = undefined;
</script>

<FieldErrorsPrimitive
	class={cn("text-[0.8rem] font-medium text-destructive", className)}
	{...$$restProps}
	let:errors
	let:fieldErrorsAttrs
	let:errorAttrs
>
	<slot {errors} {fieldErrorsAttrs} {errorAttrs}>
		{#each errors as error}
			<div {...errorAttrs} class={cn(errorClasses)}>{error}</div>
		{/each}
	</slot>
</FieldErrorsPrimitive>
