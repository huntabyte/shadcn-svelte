<script lang="ts">
	import type { ComponentType } from "svelte";
	import { Icons } from "./icons/index.js";
	import * as Tabs from "$lib/registry/new-york/ui/tabs/index.js";
	import { Index } from "$lib/../__registry__/index.js";
	import { config } from "$lib/stores/index.js";
	import { cn } from "$lib/utils.js";
	import { StyleSwitcher, ThemeWrapper } from "$lib/components/docs/index.js";

	export let name: keyof (typeof Index)["default"];
	export let align: "center" | "start" | "end" = "center";

	let className: string;
	export { className as class };

	$: component = Index[$config.style][name]?.component() as Promise<ComponentType>;

	export let form: unknown;

	export let style = "";
</script>

<div class={cn("group relative my-4 flex flex-col space-y-2", className)} {...$$restProps}>
	<Tabs.Root value="preview" class="relative mr-auto w-full">
		<div class="flex items-center justify-between pb-3">
			<Tabs.List class="w-full justify-start rounded-none border-b bg-transparent p-0">
				<Tabs.Trigger
					value="preview"
					class="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
				>
					Preview
				</Tabs.Trigger>
				<Tabs.Trigger
					value="code"
					class="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none data-[state=active]:shadow-none"
				>
					Code
				</Tabs.Trigger>
			</Tabs.List>
		</div>
		<Tabs.Content value="preview" class="relative rounded-md border">
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
					{style}
				>
					<slot name="example">
						{#await component}
							<div class="text-muted-foreground flex items-center text-sm">
								<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
								Loading...
							</div>
						{:then Component}
							<Component {form} />
						{:catch}
							<p class="text-muted-foreground text-sm">
								Component
								<code
									class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm"
								>
									{name}
								</code>
								not found in registry.
							</p>
						{/await}
					</slot>
				</div>
			</ThemeWrapper>
		</Tabs.Content>
		<Tabs.Content value="code">
			<ThemeWrapper defaultTheme="zinc">
				<div
					class="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto"
				>
					<slot />
				</div>
			</ThemeWrapper>
		</Tabs.Content>
	</Tabs.Root>
</div>
