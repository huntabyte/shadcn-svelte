<script lang="ts">
	import * as Tabs from "@/registry/new-york/ui/tabs";
	import { Index as RegistryIndex } from "../../../../__registry__";
	import { config } from "@/stores";
	import { cn } from "@/utils";
	import { StyleSwitcher, ThemeWrapper } from "@/components/docs";
	import { Icons } from "./icons";
	export let name: string;
	let className: string;
	export let align: "center" | "start" | "end" = "center";

	/* eslint-disable @typescript-eslint/no-explicit-any */
	const Index = RegistryIndex as Record<string, any>;

	let component = Index[$config.style][name]?.component();

	export { className as class };

	$: component = Index[$config.style][name]?.component();

	/* eslint-disable @typescript-eslint/no-explicit-any */
	export let form: any;
</script>

<div
	class={cn("group relative my-4 flex flex-col space-y-2", className)}
	{...$$restProps}
>
	<Tabs.Root value="preview" class="relative mr-auto w-full">
		<div class="flex items-center justify-between pb-3">
			<Tabs.List
				class="w-full justify-start rounded-none border-b bg-transparent p-0"
			>
				<Tabs.Trigger
					value="preview"
					class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
				>
					Preview
				</Tabs.Trigger>
				<Tabs.Trigger
					value="code"
					class="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
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
							"items-end": align === "end"
						},
						className
					)}
				>
					<slot name="example">
						{#await component}
							<div
								class="flex items-center text-sm text-muted-foreground"
							>
								<Icons.spinner
									class="mr-2 h-4 w-4 animate-spin"
								/>
								Loading...
							</div>
						{:then Component}
							<svelte:component this={Component} {form} />
						{:catch}
							<p class="text-sm text-muted-foreground">
								Component{" "}
								<code
									class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
								>
									{name}
								</code>{" "}
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
