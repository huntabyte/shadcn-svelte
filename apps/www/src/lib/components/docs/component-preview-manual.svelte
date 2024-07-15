<script lang="ts">
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";
	import { StyleSwitcher, ThemeWrapper } from "$lib/components/docs/index.js";

	let {
		class: className,
		align = "center",
		children,
		...restProps
	}: PrimitiveDivAttributes & {
		align?: "center" | "start" | "end";
	} = $props();
</script>

<div class={cn("group relative my-4 flex flex-col space-y-2", className)} {...restProps}>
	<div class="relative mr-auto w-full">
		<div class="relative rounded-md border">
			<div class="flex items-center justify-between p-4">
				<StyleSwitcher />
			</div>
			<ThemeWrapper defaultTheme="zinc">
				<div
					class={cn(
						"preview flex min-h-[350px] w-full justify-center p-10",
						{
							"items-center": align === "center",
							"items-start": align === "start",
							"items-end": align === "end",
						},
						className
					)}
				>
					{@render children?.()}
				</div>
			</ThemeWrapper>
		</div>
	</div>
</div>
