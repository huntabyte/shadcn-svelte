<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { Kbd } from "$lib/registry/ui/kbd/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const spokenLanguages = [
		{ label: "Auto", value: "auto" },
		{ label: "English", value: "en" },
		{ label: "Spanish", value: "es" },
		{ label: "French", value: "fr" },
		{ label: "German", value: "de" },
		{ label: "Italian", value: "it" },
		{ label: "Portuguese", value: "pt" },
		{ label: "Russian", value: "ru" },
		{ label: "Chinese", value: "zh" },
		{ label: "Japanese", value: "ja" },
		{ label: "Korean", value: "ko" },
		{ label: "Arabic", value: "ar" },
		{ label: "Hindi", value: "hi" },
		{ label: "Bengali", value: "bn" },
		{ label: "Telugu", value: "te" },
		{ label: "Marathi", value: "mr" },
		{ label: "Kannada", value: "kn" },
		{ label: "Malayalam", value: "ml" },
	];

	const voices = [
		{ label: "Samantha", value: "samantha" },
		{ label: "Alex", value: "alex" },
		{ label: "Fred", value: "fred" },
		{ label: "Victoria", value: "victoria" },
		{ label: "Tom", value: "tom" },
		{ label: "Karen", value: "karen" },
		{ label: "Sam", value: "sam" },
		{ label: "Daniel", value: "daniel" },
	];

	const themes = [
		{ label: "Light", value: "light" },
		{ label: "Dark", value: "dark" },
		{ label: "System", value: "system" },
	];

	const accents = [
		{ label: "Default", value: "default" },
		{ label: "Red", value: "red" },
		{ label: "Blue", value: "blue" },
		{ label: "Green", value: "green" },
		{ label: "Purple", value: "purple" },
		{ label: "Pink", value: "pink" },
	];

	let tab = $state("general");
	let theme = $state("system");
	let accentColor = $state("default");
	let spokenLanguage = $state("en");
	let voice = $state("samantha");

	const themeLabel = $derived(themes.find((t) => t.value === theme)?.label ?? "System");
	const accentLabel = $derived(accents.find((a) => a.value === accentColor)?.label ?? "Default");
	const spokenLanguageLabel = $derived(
		spokenLanguages.find((l) => l.value === spokenLanguage)?.label ?? "English"
	);
	const voiceLabel = $derived(voices.find((v) => v.value === voice)?.label ?? "Samantha");
</script>

<Example title="Chat Settings" class="items-center justify-center">
	<Dialog.Root>
		<Dialog.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" {...props}>Chat Settings</Button>
			{/snippet}
		</Dialog.Trigger>
		<Dialog.Content class="min-w-md">
			<Dialog.Header>
				<Dialog.Title>Chat Settings</Dialog.Title>
				<Dialog.Description>
					Customize your chat settings: theme, accent color, spoken language, voice,
					personality, and custom instructions.
				</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4">
				<NativeSelect.Root bind:value={tab} class="w-full md:hidden">
					<NativeSelect.Option value="general">General</NativeSelect.Option>
					<NativeSelect.Option value="notifications">Notifications</NativeSelect.Option>
					<NativeSelect.Option value="personalization"
						>Personalization</NativeSelect.Option
					>
					<NativeSelect.Option value="security">Security</NativeSelect.Option>
				</NativeSelect.Root>
				<Tabs.Root bind:value={tab}>
					<Tabs.List class="hidden w-full md:flex">
						<Tabs.Trigger value="general">General</Tabs.Trigger>
						<Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
						<Tabs.Trigger value="personalization">Personalization</Tabs.Trigger>
						<Tabs.Trigger value="security">Security</Tabs.Trigger>
					</Tabs.List>
					<div
						class="min-h-[450px] rounded-lg border p-4 [&_[data-slot=select-trigger]]:min-w-[125px]"
					>
						<Tabs.Content value="general">
							<Field.Set>
								<Field.Group>
									<Field.Field orientation="horizontal">
										<Field.Label for="theme">Theme</Field.Label>
										<Select.Root type="single" bind:value={theme}>
											<Select.Trigger id="theme">
												{themeLabel}
											</Select.Trigger>
											<Select.Content align="end">
												<Select.Group>
													{#each themes as themeItem (themeItem.value)}
														<Select.Item value={themeItem.value}>
															{themeItem.label}
														</Select.Item>
													{/each}
												</Select.Group>
											</Select.Content>
										</Select.Root>
									</Field.Field>
									<Field.Separator />
									<Field.Field orientation="horizontal">
										<Field.Label for="accent-color">Accent Color</Field.Label>
										<Select.Root type="single" bind:value={accentColor}>
											<Select.Trigger id="accent-color">
												{accentLabel}
											</Select.Trigger>
											<Select.Content align="end">
												<Select.Group>
													{#each accents as accent (accent.value)}
														<Select.Item value={accent.value}>
															{accent.label}
														</Select.Item>
													{/each}
												</Select.Group>
											</Select.Content>
										</Select.Root>
									</Field.Field>
									<Field.Separator />
									<Field.Field orientation="responsive">
										<Field.Content>
											<Field.Label for="spoken-language">
												Spoken Language
											</Field.Label>
											<Field.Description>
												For best results, select the language you mainly
												speak. If it&apos;s not listed, it may still be
												supported via auto-detection.
											</Field.Description>
										</Field.Content>
										<Select.Root type="single" bind:value={spokenLanguage}>
											<Select.Trigger id="spoken-language">
												{spokenLanguageLabel}
											</Select.Trigger>
											<Select.Content align="end">
												<Select.Group>
													{#each spokenLanguages as language (language.value)}
														<Select.Item value={language.value}>
															{language.label}
														</Select.Item>
													{/each}
												</Select.Group>
											</Select.Content>
										</Select.Root>
									</Field.Field>
									<Field.Separator />
									<Field.Field orientation="horizontal">
										<Field.Label for="voice">Voice</Field.Label>
										<Select.Root type="single" bind:value={voice}>
											<Select.Trigger id="voice">
												{voiceLabel}
											</Select.Trigger>
											<Select.Content align="end">
												<Select.Group>
													{#each voices as voiceItem (voiceItem.value)}
														<Select.Item value={voiceItem.value}>
															{voiceItem.label}
														</Select.Item>
													{/each}
												</Select.Group>
											</Select.Content>
										</Select.Root>
									</Field.Field>
								</Field.Group>
							</Field.Set>
						</Tabs.Content>
						<Tabs.Content value="notifications">
							<Field.Group>
								<Field.Set>
									<Field.Label>Responses</Field.Label>
									<Field.Description>
										Get notified when ChatGPT responds to requests that take
										time, like research or image generation.
									</Field.Description>
									<Field.Group data-slot="checkbox-group">
										<Field.Field orientation="horizontal">
											<Checkbox id="push" checked disabled />
											<Field.Label for="push" class="font-normal">
												Push notifications
											</Field.Label>
										</Field.Field>
									</Field.Group>
								</Field.Set>
								<Field.Separator />
								<Field.Set>
									<Field.Label>Tasks</Field.Label>
									<Field.Description>
										Get notified when tasks you&apos;ve created have updates. <a
											href="#/">Manage tasks</a
										>
									</Field.Description>
									<Field.Group data-slot="checkbox-group">
										<Field.Field orientation="horizontal">
											<Checkbox id="push-tasks" />
											<Field.Label for="push-tasks" class="font-normal">
												Push notifications
											</Field.Label>
										</Field.Field>
										<Field.Field orientation="horizontal">
											<Checkbox id="email-tasks" />
											<Field.Label for="email-tasks" class="font-normal">
												Email notifications
											</Field.Label>
										</Field.Field>
									</Field.Group>
								</Field.Set>
							</Field.Group>
						</Tabs.Content>
						<Tabs.Content value="personalization">
							<Field.Group>
								<Field.Field orientation="responsive">
									<Field.Label for="nickname">Nickname</Field.Label>
									<InputGroup.Root>
										<InputGroup.Input
											id="nickname"
											placeholder="Broski"
											class="@md/field-group:max-w-[200px]"
										/>
										<InputGroup.Addon align="inline-end">
											<Tooltip.Root>
												<Tooltip.Trigger>
													{#snippet child({ props })}
														<InputGroup.Button
															size="icon-xs"
															{...props}
														>
															<IconPlaceholder
																lucide="InfoIcon"
																tabler="IconInfoCircle"
																hugeicons="AlertCircleIcon"
																phosphor="InfoIcon"
															/>
														</InputGroup.Button>
													{/snippet}
												</Tooltip.Trigger>
												<Tooltip.Content class="flex items-center gap-2">
													Used to identify you in the chat. <Kbd>N</Kbd>
												</Tooltip.Content>
											</Tooltip.Root>
										</InputGroup.Addon>
									</InputGroup.Root>
								</Field.Field>
								<Field.Separator />
								<Field.Field
									orientation="responsive"
									class="@md/field-group:flex-col @2xl/field-group:flex-row"
								>
									<Field.Content>
										<Field.Label for="about">More about you</Field.Label>
										<Field.Description>
											Tell us more about yourself. This will be used to help
											us personalize your experience.
										</Field.Description>
									</Field.Content>
									<Textarea
										id="about"
										placeholder="I'm a software engineer..."
										class="min-h-[120px] @md/field-group:min-w-full @2xl/field-group:min-w-[300px]"
									/>
								</Field.Field>
								<Field.Separator />
								<Field.Label>
									<Field.Field orientation="horizontal">
										<Field.Content>
											<Field.Label for="customization">
												Enable customizations
											</Field.Label>
											<Field.Description>
												Enable customizations to make ChatGPT more
												personalized.
											</Field.Description>
										</Field.Content>
										<Switch id="customization" checked />
									</Field.Field>
								</Field.Label>
							</Field.Group>
						</Tabs.Content>
						<Tabs.Content value="security">
							<Field.Group>
								<Field.Field orientation="horizontal">
									<Field.Content>
										<Field.Label for="2fa">
											Multi-factor authentication
										</Field.Label>
										<Field.Description>
											Enable multi-factor authentication to secure your
											account. If you do not have a two-factor authentication
											device, you can use a one-time code sent to your email.
										</Field.Description>
									</Field.Content>
									<Switch id="2fa" />
								</Field.Field>
								<Field.Separator />
								<Field.Field orientation="horizontal">
									<Field.Content>
										<Field.Title>Log out</Field.Title>
										<Field.Description>
											Log out of your account on this device.
										</Field.Description>
									</Field.Content>
									<Button variant="outline" size="sm">Log Out</Button>
								</Field.Field>
								<Field.Separator />
								<Field.Field orientation="horizontal">
									<Field.Content>
										<Field.Title>Log out of all devices</Field.Title>
										<Field.Description>
											This will log you out of all devices, including the
											current session. It may take up to 30 minutes for the
											changes to take effect.
										</Field.Description>
									</Field.Content>
									<Button variant="outline" size="sm">Log Out All</Button>
								</Field.Field>
							</Field.Group>
						</Tabs.Content>
					</div>
				</Tabs.Root>
			</div>
		</Dialog.Content>
	</Dialog.Root>
</Example>
