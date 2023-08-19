<script lang="ts">
	import * as Tabs from "@/registry/new-york/ui/tabs";
	import { cn } from "$lib/utils";
	import { StyleSwitcher, ThemeWrapper, CopyButton } from "@/components/docs";

	let codeString: string;

	function copyCodeToClipboard(node: HTMLElement) {
		codeString = node.innerText ?? "";
	}
	let className: string | undefined | null = undefined;
	export { className as class };
	export let align: "start" | "center" | "end" = "center";
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
					class="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
				>
					Preview
				</Tabs.Trigger>
				<Tabs.Trigger
					value="code"
					class="relative rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
				>
					Code
				</Tabs.Trigger>
			</Tabs.List>
		</div>
		<Tabs.Content value="preview" class="rounded-md border">
			<div class="flex items-center justify-between p-4">
				<StyleSwitcher />
			</div>
			<ThemeWrapper defaultTheme="zinc">
				<div
					class={cn("flex min-h-[350px] justify-center p-10", {
						"items-center": align === "center",
						"items-start": align === "start",
						"items-end": align === "end"
					})}
				>
					<slot name="example" />
				</div>
			</ThemeWrapper>
		</Tabs.Content>
		<Tabs.Content value="code">
			<CopyButton value={codeString} class="absolute right-4 top-20" />
			<div
				class="w-full rounded-md [&_button]:hidden [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto"
				use:copyCodeToClipboard
			>
				<slot />
			</div>
		</Tabs.Content>
	</Tabs.Root>
</div>
