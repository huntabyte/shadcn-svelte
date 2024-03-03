<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { StyleSwitcher, ThemeWrapper } from "$lib/components/docs/index.js";

	export let align: "center" | "start" | "end" = "center";
	let className: string | null | undefined = undefined;
	export { className as class };
</script>

<div class={cn("group relative my-4 flex flex-col space-y-2", className)} {...$$restProps}>
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
					<slot />
				</div>
			</ThemeWrapper>
		</div>
	</div>
</div>
