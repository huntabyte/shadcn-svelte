<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { mode } from "mode-watcher";

	const uid = $props.id();

	const plans = [
		{
			id: "starter",
			name: "Starter Plan",
			description: "Perfect for small businesses.",
			price: "$10",
		},
		{
			id: "pro",
			name: "Pro Plan",
			description: "Advanced features with more storage.",
			price: "$20",
		},
	] as const;

	const themes = {
		neutral: {
			light: {
				"--primary": "oklch(0.205 0 0)",
				"--primary-foreground": "oklch(0.985 0 0)",
				"--ring": "oklch(0.708 0 0)",
			},
			dark: {
				"--primary": "oklch(0.922 0 0)",
				"--primary-foreground": "oklch(0.205 0 0)",
				"--ring": "oklch(0.556 0 0)",
			},
		},
		blue: {
			light: {
				"--primary": "oklch(0.546 0.245 262.881)",
				"--primary-foreground": "oklch(0.985 0.001 106.423)",
				"--ring": "oklch(0.546 0.245 262.881)",
			},
			dark: {
				"--primary": "oklch(0.623 0.214 259.815)",
				"--primary-foreground": "oklch(0.985 0.001 106.423)",
				"--ring": "oklch(0.623 0.214 259.815)",
			},
		},
		amber: {
			light: {
				"--primary": "oklch(0.769 0.188 70.08)",
				"--primary-foreground": "oklch(0.985 0.001 106.423)",
				"--ring": "oklch(0.82 0.13 92.25)",
			},
			dark: {
				"--primary": "oklch(0.769 0.188 70.08)",
				"--primary-foreground": "oklch(0.216 0.006 56.043)",
				"--ring": "oklch(0.666 0.179 58.318)",
			},
		},
		teal: {
			light: {
				"--primary": "oklch(0.627 0.194 149.214)",
				"--primary-foreground": "oklch(0.985 0.001 106.423)",
				"--ring": "oklch(0.79 0.19 153.13)",
			},
			dark: {
				"--primary": "oklch(0.704 0.14 182.503)",
				"--primary-foreground": "oklch(0.216 0.006 56.043)",
				"--ring": "oklch(0.704 0.14 182.503)",
			},
		},
	} as const;

	let theme = $state<keyof typeof themes | undefined>(undefined);

	const themeStyles = $derived.by(() => {
		if (!theme || !mode.current) return undefined;
		const currentTheme = themes[theme][mode.current];
		return Object.entries(currentTheme)
			.map(([key, value]) => `${key}: ${value}`)
			.join("; ");
	});

	function getThemeColor(themeName: string) {
		return themes[themeName as keyof typeof themes][mode.current ?? "light"]["--primary"];
	}
</script>

<div>
	<div class="flex max-w-md flex-col gap-4">
		<Card.Root style={themeStyles}>
			<Card.Header>
				<Card.Title class="text-lg">Upgrade your subscription</Card.Title>
				<Card.Description class="text-balance">
					You are currently on the free plan. Upgrade to the pro plan to get access to all
					features.
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="flex flex-col gap-6">
					<div class="flex flex-col gap-3 md:flex-row">
						<div class="flex flex-1 flex-col gap-2">
							<Label for="name-{uid}">Name</Label>
							<Input id="name-{uid}" placeholder="Evil Rabbit" />
						</div>
						<div class="flex flex-1 flex-col gap-2">
							<Label for="email-{uid}">Email</Label>
							<Input id="email-{uid}" placeholder="example@acme.com" />
						</div>
					</div>
					<div class="flex flex-col gap-2">
						<Label for="card-number-{uid}">Card Number</Label>
						<div class="grid grid-cols-2 gap-3 md:grid-cols-[1fr_80px_60px]">
							<Input
								id="card-number-{uid}"
								placeholder="1234 1234 1234 1234"
								class="col-span-2 md:col-span-1"
							/>
							<Input id="card-number-expiry-{uid}" placeholder="MM/YY" />
							<Input id="card-number-cvc-{uid}" placeholder="CVC" />
						</div>
					</div>
					<div class="flex flex-col gap-2">
						<Label for="color-{uid}">Color</Label>
						<Select.Root
							type="single"
							onValueChange={(v) => {
								if (v) {
									theme = v as keyof typeof themes;
									return;
								}
								theme = undefined;
							}}
						>
							<Select.Trigger id="color-{uid}" class="w-full capitalize">
								{#if theme}
									{@render SelectItemContent(theme)}
								{:else}
									Select a color
								{/if}
							</Select.Trigger>
							<Select.Content>
								{#each Object.keys(themes) as themeName (themeName)}
									<Select.Item value={themeName} class="capitalize">
										{@render SelectItemContent(themeName)}
									</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
					<fieldset class="flex flex-col gap-3">
						<legend class="text-sm font-medium">Plan</legend>
						<p class="text-muted-foreground text-sm">
							Select the plan that best fits your needs.
						</p>
						<RadioGroup.Root value="starter" class="grid gap-3 md:grid-cols-2">
							{#each plans as plan (plan.id)}
								<Label
									class="has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-input/30 flex items-start gap-3 rounded-lg border p-3"
								>
									<RadioGroup.Item
										value={plan.id}
										id="{plan.name}-{uid}"
										class="data-[state=checked]:border-primary"
									/>
									<div class="grid gap-1 font-normal">
										<div class="font-medium">{plan.name}</div>
										<div
											class="text-muted-foreground text-balance pr-2 text-xs leading-snug"
										>
											{plan.description}
										</div>
									</div>
								</Label>
							{/each}
						</RadioGroup.Root>
					</fieldset>
					<div class="flex flex-col gap-2">
						<Label for="notes-{uid}">Notes</Label>
						<Textarea id="notes-{uid}" placeholder="Enter notes" />
					</div>
					<div class="flex flex-col gap-3">
						<div class="flex items-center gap-2">
							<Checkbox id="terms-{uid}" />
							<Label for="terms-{uid}" class="font-normal">
								I agree to the terms and conditions
							</Label>
						</div>
						<div class="flex items-center gap-2">
							<Checkbox id="newsletter-{uid}" checked />
							<Label for="newsletter-{uid}" class="font-normal">
								Allow us to send you emails
							</Label>
						</div>
					</div>
				</div>
			</Card.Content>
			<Card.Footer class="flex justify-between">
				<Button variant="outline" size="sm">Cancel</Button>
				<Button size="sm">Upgrade Plan</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>

{#snippet SelectItemContent(themeName: string)}
	<div
		class="size-3.5 rounded-full border"
		style="background-color: {getThemeColor(themeName)}"
	></div>
	{themeName}
{/snippet}
