<script lang="ts" module>
	export interface BaseColorOKLCH {
		light: Record<string, string>;
		dark: Record<string, string>;
	}

	export interface BaseColor {
		name: string;
		label: string;
		activeColor: {
			light: string;
			dark: string;
		};
		cssVars: {
			light: Record<string, string>;
			dark: Record<string, string>;
		};
	}

	export function getThemeCodeOKLCH(theme: BaseColorOKLCH | undefined, radius: number) {
		if (!theme) {
			return "";
		}

		const rootSection =
			":root {\n  --radius: " +
			radius +
			"rem;\n" +
			Object.entries(theme.light)
				.map((entry) => "  --" + entry[0] + ": " + entry[1] + ";")
				.join("\n") +
			"\n}\n\n.dark {\n" +
			Object.entries(theme.dark)
				.map((entry) => "  --" + entry[0] + ": " + entry[1] + ";")
				.join("\n") +
			"\n}\n";

		return rootSection;
	}

	export function getThemeCodeHSLV4(theme: BaseColor | undefined, radius: number) {
		if (!theme) {
			return "";
		}

		const rootSection =
			":root {\n  --radius: " +
			radius +
			"rem;\n" +
			Object.entries(theme.cssVars.light)
				.map((entry) => "  --" + entry[0] + ": hsl(" + entry[1] + ");")
				.join("\n") +
			"\n}\n\n.dark {\n" +
			Object.entries(theme.cssVars.dark)
				.map((entry) => "  --" + entry[0] + ": hsl(" + entry[1] + ");")
				.join("\n") +
			"\n}\n";

		return rootSection;
	}

	export function getThemeCode(theme: BaseColor | undefined, radius: number) {
		if (!theme) {
			return "";
		}

		const replaceTemplate = (
			str: string,
			obj: Record<
				string,
				Record<string, Record<string, string>> | Record<string, string> | string
			>
		) => {
			let result = str;
			for (const key in obj) {
				const pattern = new RegExp(`<%- ${key}\\[["']([^"']+)["']\\] %>`, "g");
				result = result.replace(pattern, (_: string, k: string) => {
					const value = obj[key];
					if (
						typeof value === "object" &&
						typeof (value as Record<string, string | Record<string, string>>)[k] ===
							"string"
					) {
						return (
							((value as Record<string, string | Record<string, string>>)[
								k
							] as string) ?? ""
						);
					}
					return "";
				});
				const simplePattern = new RegExp(`<%- ${key} %>`, "g");
				result = result.replace(simplePattern, String(obj[key]));
			}
			return result;
		};

		return replaceTemplate(BASE_STYLES_WITH_VARIABLES, {
			colors: theme.cssVars,
			radius: radius.toString(),
		});
	}

	export const BASE_STYLES_WITH_VARIABLES = `
@layer base {
  :root {
    --background: <%- colors.light["background"] %>;
    --foreground: <%- colors.light["foreground"] %>;
    --card: <%- colors.light["card"] %>;
    --card-foreground: <%- colors.light["card-foreground"] %>;
    --popover: <%- colors.light["popover"] %>;
    --popover-foreground: <%- colors.light["popover-foreground"] %>;
    --primary: <%- colors.light["primary"] %>;
    --primary-foreground: <%- colors.light["primary-foreground"] %>;
    --secondary: <%- colors.light["secondary"] %>;
    --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
    --muted: <%- colors.light["muted"] %>;
    --muted-foreground: <%- colors.light["muted-foreground"] %>;
    --accent: <%- colors.light["accent"] %>;
    --accent-foreground: <%- colors.light["accent-foreground"] %>;
    --destructive: <%- colors.light["destructive"] %>;
    --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
    --border: <%- colors.light["border"] %>;
    --input: <%- colors.light["input"] %>;
    --ring: <%- colors.light["ring"] %>;
    --radius: <%- radius %>rem;
    --chart-1: <%- colors.light["chart-1"] %>;
    --chart-2: <%- colors.light["chart-2"] %>;
    --chart-3: <%- colors.light["chart-3"] %>;
    --chart-4: <%- colors.light["chart-4"] %>;
    --chart-5: <%- colors.light["chart-5"] %>;
  }

  .dark {
    --background: <%- colors.dark["background"] %>;
    --foreground: <%- colors.dark["foreground"] %>;
    --card: <%- colors.dark["card"] %>;
    --card-foreground: <%- colors.dark["card-foreground"] %>;
    --popover: <%- colors.dark["popover"] %>;
    --popover-foreground: <%- colors.dark["popover-foreground"] %>;
    --primary: <%- colors.dark["primary"] %>;
    --primary-foreground: <%- colors.dark["primary-foreground"] %>;
    --secondary: <%- colors.dark["secondary"] %>;
    --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
    --muted: <%- colors.dark["muted"] %>;
    --muted-foreground: <%- colors.dark["muted-foreground"] %>;
    --accent: <%- colors.dark["accent"] %>;
    --accent-foreground: <%- colors.dark["accent-foreground"] %>;
    --destructive: <%- colors.dark["destructive"] %>;
    --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
    --border: <%- colors.dark["border"] %>;
    --input: <%- colors.dark["input"] %>;
    --ring: <%- colors.dark["ring"] %>;
    --chart-1: <%- colors.dark["chart-1"] %>;
    --chart-2: <%- colors.dark["chart-2"] %>;
    --chart-3: <%- colors.dark["chart-3"] %>;
    --chart-4: <%- colors.dark["chart-4"] %>;
    --chart-5: <%- colors.dark["chart-5"] %>;
  }
}
`;
</script>

<script lang="ts">
	import { baseColors, baseColorsOKLCH } from "$lib/registry/registry-base-colors.js";
	import { setTheme } from "mode-watcher";
	import { ScrollArea } from "$lib/registry/ui/scroll-area/index.js";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { UserConfigContext, type ActiveTheme } from "$lib/user-config.svelte.js";
	import IconCopy from "@tabler/icons-svelte/icons/copy";
	import ThemeCustomizerCode from "./theme-customizer-code.svelte";
	interface Props extends HTMLAttributes<HTMLElement> {
		class?: string;
	}

	let { class: className, ...rest }: Props = $props();

	const userConfig = UserConfigContext.get();

	const THEMES = baseColors
		.filter((theme) => !["slate", "stone", "gray", "zinc"].includes(theme.name))
		.sort((a, b) => a.name.localeCompare(b.name));

	const coercedActiveTheme = $derived(
		userConfig.current.activeTheme === "default" ? "neutral" : userConfig.current.activeTheme
	);

	// Code customizer state
	let hasCopied = $state(false);
	let tailwindVersion = $state<"v4-oklch" | "v4-hsl" | "v3">("v4-oklch");

	const activeTheme = $derived(baseColors.find((theme) => theme.name === coercedActiveTheme));

	const activeThemeOKLCH = $derived(
		baseColorsOKLCH[coercedActiveTheme as keyof typeof baseColorsOKLCH]
	);

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		hasCopied = true;
		setTimeout(() => {
			hasCopied = false;
		}, 2000);
	}
</script>

<div class={cn("flex w-full items-center gap-2", className)} {...rest}>
	<!-- Theme selector for desktop -->
	<ScrollArea
		class="hidden max-w-[96%] md:max-w-[600px] lg:flex lg:max-w-none"
		orientation="both"
		scrollbarXClasses="invisible"
	>
		<div class="flex items-center">
			{#each THEMES as theme (theme.name)}
				<Button
					variant="link"
					size="sm"
					data-active={coercedActiveTheme === theme.name}
					class="text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 cursor-pointer items-center justify-center px-4 text-center text-base font-medium capitalize transition-colors hover:no-underline"
					onclick={() => {
						userConfig.setConfig({ activeTheme: theme.name as ActiveTheme });
						setTheme(theme.name);
					}}
				>
					{theme.name === "neutral" ? "Default" : theme.name}
				</Button>
			{/each}
		</div>
	</ScrollArea>

	<!-- Theme selector for mobile -->
	<div class="flex items-center gap-2 lg:hidden">
		<Label for="theme-selector" class="sr-only">Theme</Label>
		<Select.Root
			type="single"
			allowDeselect={false}
			bind:value={
				() => userConfig.current.activeTheme,
				(v) => {
					userConfig.setConfig({ activeTheme: v ?? "default" });
					setTheme(v ?? "default");
				}
			}
		>
			<Select.Trigger
				id="theme-selector"
				size="sm"
				class="justify-start capitalize shadow-none *:data-[slot=select-value]:w-12 *:data-[slot=select-value]:capitalize"
			>
				<span class="font-medium">Theme:</span>
				<span data-slot="select-value">{coercedActiveTheme ?? "Select a theme"}</span>
			</Select.Trigger>
			<Select.Content align="end">
				<Select.Group>
					{#each THEMES as theme (theme.name)}
						<Select.Item value={theme.name} class="capitalize data-selected:opacity-50">
							{theme.name}
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</div>

	<!-- Copy Code Button - Drawer for mobile -->
	<Drawer.Root>
		<Drawer.Trigger class={cn("sm:hidden!", "ms-auto")}>
			{#snippet child({ props })}
				<Button size="sm" variant="secondary" {...props}>Copy Code</Button>
			{/snippet}
		</Drawer.Trigger>
		<Drawer.Content class="h-auto">
			<Drawer.Header>
				<Drawer.Title class="capitalize">
					{coercedActiveTheme === "neutral" ? "Neutral" : coercedActiveTheme}
				</Drawer.Title>
				<Drawer.Description>
					Copy and paste the following code into your CSS file.
				</Drawer.Description>
			</Drawer.Header>
			<ThemeCustomizerCode
				{tailwindVersion}
				{hasCopied}
				{copyToClipboard}
				{activeTheme}
				{activeThemeOKLCH}
			/>
		</Drawer.Content>
	</Drawer.Root>

	<!-- Copy Code Button - Dialog for desktop -->
	<Dialog.Root>
		<Dialog.Trigger class={cn("hidden sm:flex!", "ms-auto")}>
			{#snippet child({ props })}
				<Button size="sm" class="ms-auto" variant="secondary" {...props}>
					<IconCopy />
					<span class="group-data-[size=icon-sm]/button:sr-only">Copy Code</span>
				</Button>
			{/snippet}
		</Dialog.Trigger>
		<Dialog.Content
			class="rounded-xl border-none bg-clip-padding shadow-2xl ring-4 ring-neutral-200/80 outline-none md:max-w-2xl dark:bg-neutral-800 dark:ring-neutral-900"
		>
			<Dialog.Header>
				<Dialog.Title class="capitalize">
					{coercedActiveTheme === "neutral" ? "Neutral" : coercedActiveTheme}
				</Dialog.Title>
				<Dialog.Description>
					Copy and paste the following code into your CSS file.
				</Dialog.Description>
			</Dialog.Header>
			<ThemeCustomizerCode
				{tailwindVersion}
				{hasCopied}
				{copyToClipboard}
				{activeTheme}
				{activeThemeOKLCH}
			/>
		</Dialog.Content>
	</Dialog.Root>
</div>
