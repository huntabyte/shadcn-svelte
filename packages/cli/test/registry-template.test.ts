/**
 * This ensures that any changes we make to the registry build script that would affect the output
 * of this test are caught by CI and thus require a manual review of the snapshot outputs for the
 * time being.
 *
 * Whether this is a good idea or not, idk but seems like a good start.
 */

import { it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
const registryTemplateStaticRegistryPath = path.join(
	__dirname,
	"..",
	"..",
	"..",
	"registry-template",
	"static",
	"r"
);

function getFile(name: string) {
	return JSON.parse(
		fs.readFileSync(path.join(registryTemplateStaticRegistryPath, `${name}.json`), "utf8")
	);
}

it("should accurately build the registry template", async () => {
	const index = getFile("index");
	const checkoutSteps = getFile("checkout-steps");
	const complexComponent = getFile("complex-component");
	const exampleForm = getFile("example-form");
	const exampleWithCss = getFile("example-with-css");
	const helloWorld = getFile("hello-world");
	const stepper = getFile("stepper");

	expect(index).toMatchInlineSnapshot(`
		[
		  {
		    "description": "A simple hello world component",
		    "meta": {
		      "author": "huntabyte",
		    },
		    "name": "hello-world",
		    "registryDependencies": [
		      "button",
		    ],
		    "relativeUrl": "hello-world.json",
		    "title": "Hello World",
		    "type": "registry:component",
		  },
		  {
		    "dependencies": [
		      "zod",
		    ],
		    "description": "A contact form with Zod validation.",
		    "name": "example-form",
		    "registryDependencies": [
		      "button",
		      "input",
		      "label",
		      "textarea",
		      "card",
		    ],
		    "relativeUrl": "example-form.json",
		    "title": "Example Form",
		    "type": "registry:component",
		  },
		  {
		    "description": "A complex component showing hooks, libs and components.",
		    "name": "complex-component",
		    "registryDependencies": [
		      "card",
		    ],
		    "relativeUrl": "complex-component.json",
		    "title": "Complex Component",
		    "type": "registry:component",
		  },
		  {
		    "description": "A login form with a CSS file.",
		    "name": "example-with-css",
		    "registryDependencies": [],
		    "relativeUrl": "example-with-css.json",
		    "title": "Example with CSS",
		    "type": "registry:component",
		  },
		  {
		    "name": "stepper",
		    "registryDependencies": [],
		    "relativeUrl": "stepper.json",
		    "type": "registry:ui",
		  },
		  {
		    "description": "A checkout steps component.",
		    "name": "checkout-steps",
		    "registryDependencies": [
		      "local:stepper",
		    ],
		    "relativeUrl": "checkout-steps.json",
		    "title": "Checkout Steps",
		    "type": "registry:component",
		  },
		]
	`);

	expect(checkoutSteps).toMatchInlineSnapshot(`
		{
		  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
		  "description": "A checkout steps component.",
		  "files": [
		    {
		      "content": "<script lang="ts">
			// We are using one of our custom/local \`ui\` components here
			import * as Stepper from "$UI$/stepper/index.js";
		</script>

		<Stepper.Root>
			{#each { length: 5 } as _, i (i)}
				<Stepper.Item step={i + 1} />
			{/each}
		</Stepper.Root>
		",
		      "target": "checkout-steps.svelte",
		      "type": "registry:component",
		    },
		  ],
		  "name": "checkout-steps",
		  "registryDependencies": [
		    "./stepper.json",
		  ],
		  "title": "Checkout Steps",
		  "type": "registry:component",
		}
	`);

	expect(complexComponent).toMatchInlineSnapshot(`
		{
		  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
		  "description": "A complex component showing hooks, libs and components.",
		  "devDependencies": [
		    "zod@^4.2.1",
		  ],
		  "files": [
		    {
		      "content": "<script lang="ts">
			import PokemonCard from "./components/pokemon-card.svelte";
			import { getPokemonList } from "./lib/pokemon.js";
		</script>

		{#await getPokemonList({ limit: 12 })}
			<div>Loading pokemons...</div>
		{:then pokemons}
			{#if pokemons}
				<div class="mx-auto w-full max-w-2xl px-4">
					<div class="grid grid-cols-2 gap-4 py-10 sm:grid-cols-3 md:grid-cols-4">
						{#each pokemons.results as pokemon (pokemon.name)}
							<PokemonCard name={pokemon.name} />
						{/each}
					</div>
				</div>
			{/if}
		{:catch}
			<div class="mx-auto w-full max-w-2xl px-4">
				<p>Error loading pokemons</p>
			</div>
		{/await}
		",
		      "target": "src/routes/pokemon/+page.svelte",
		      "type": "registry:page",
		    },
		    {
		      "content": "<script lang="ts">
			import { getPokemon } from "$lib/registry/blocks/complex-component/lib/pokemon.js";
			import * as Card from "$UI$/card/index.js";
			import PokemonImage from "$lib/registry/blocks/complex-component/components/pokemon-image.svelte";

			let { name }: { name: string } = $props();
		</script>

		{#await getPokemon(name)}
			<div>Loading...</div>
		{:then pokemon}
			{#if pokemon}
				<Card.Root>
					<Card.Content class="flex flex-col items-center p-2">
						<div>
							<PokemonImage name={pokemon.name} number={pokemon.id} />
						</div>
						<div class="text-center font-medium">{pokemon.name}</div>
					</Card.Content>
				</Card.Root>
			{/if}
		{:catch}
			<div>Error loading pokemon</div>
		{/await}
		",
		      "target": "pokemon-card.svelte",
		      "type": "registry:component",
		    },
		    {
		      "content": "<script lang="ts">
			import { usePokemonImage } from "$lib/registry/blocks/complex-component/hooks/use-pokemon.svelte";

			let { number, name }: { number: number; name: string } = $props();

			const imageUrl = usePokemonImage(number);
		</script>

		{#if imageUrl}
			<img src={imageUrl} alt={name} />
		{/if}
		",
		      "target": "pokemon-image.svelte",
		      "type": "registry:component",
		    },
		    {
		      "content": "import { z } from "zod";

		export async function getPokemonList({ limit = 10 }: { limit?: number }) {
			try {
				const response = await fetch(\`https://pokeapi.co/api/v2/pokemon?limit=\${limit}\`);
				return z
					.object({
						results: z.array(z.object({ name: z.string() })),
					})
					.parse(await response.json());
			} catch (error) {
				console.error(error);
				return null;
			}
		}

		export async function getPokemon(name: string) {
			try {
				const response = await fetch(\`https://pokeapi.co/api/v2/pokemon/\${name}\`);
				if (!response.ok) throw new Error("Failed to fetch pokemon");

				return z
					.object({
						name: z.string(),
						id: z.number(),
						sprites: z.object({
							front_default: z.string(),
						}),
						stats: z.array(
							z.object({
								base_stat: z.number(),
								stat: z.object({
									name: z.string(),
								}),
							})
						),
					})
					.parse(await response.json());
			} catch (error) {
				console.error(error);
				return null;
			}
		}
		",
		      "target": "pokemon.ts",
		      "type": "registry:lib",
		    },
		    {
		      "content": "// Unnecessary hook, but an example of how to add a hook to a custom registry.

		export function usePokemonImage(number: number) {
			return \`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/\${number}.png\`;
		}
		",
		      "target": "use-pokemon.svelte.ts",
		      "type": "registry:hook",
		    },
		  ],
		  "name": "complex-component",
		  "registryDependencies": [
		    "card",
		  ],
		  "title": "Complex Component",
		  "type": "registry:component",
		}
	`);
	expect(exampleForm).toMatchInlineSnapshot(`
		{
		  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
		  "dependencies": [
		    "zod",
		  ],
		  "description": "A contact form with Zod validation.",
		  "devDependencies": [
		    "zod@^4.2.1",
		  ],
		  "files": [
		    {
		      "content": "<script lang="ts">
			import * as Card from "$UI$/card/index.js";
			import { Input } from "$UI$/input/index.js";
			import { Label } from "$UI$/label/index.js";
			import { Button } from "$UI$/button/index.js";
			import { Textarea } from "$UI$/textarea/index.js";
			import { z } from "zod";
			import type { FormEventHandler } from "svelte/elements";

			const exampleFormSchema = z.object({
				name: z.string().min(1),
				email: z.string().email(),
				message: z.string().min(1),
			});

			let pending = $state(false);
			let formState = $state({
				defaultValues: {
					name: "",
					email: "",
					message: "",
				},
				success: false,
				errors: {
					name: "",
					email: "",
					message: "",
				},
			});

			const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
				e.preventDefault();
				pending = true;
				const formData = new FormData(e.currentTarget);
				const data = Object.fromEntries(formData);
				const result = exampleFormSchema.safeParse(data);

				if (!result.success) {
					formState = {
						...formState,
						errors: Object.fromEntries(
							Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [
								key,
								value?.[0] ?? "",
							])
						) as Record<keyof typeof formState.errors, string>,
					};
					pending = false;
					return;
				}

				pending = false;
			};
		</script>

		<form onsubmit={handleSubmit} class="w-full max-w-sm">
			<Card.Root>
				<Card.Header>
					<Card.Title>How can we help?</Card.Title>
					<Card.Description>
						Need help with your project? We&apos;re here to assist you.
					</Card.Description>
				</Card.Header>
				<Card.Content class="flex flex-col gap-6">
					<div class="group/field grid gap-2" data-invalid={!!formState.errors?.name}>
						<Label for="name" class="group-data-[invalid=true]/field:text-destructive">
							Name <span aria-hidden="true">*</span>
						</Label>
						<Input
							id="name"
							name="name"
							placeholder="Lee Robinson"
							class="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
							disabled={pending}
							aria-invalid={!!formState.errors?.name}
							aria-errormessage="error-name"
							defaultValue={formState.defaultValues.name}
						/>
						{#if formState.errors.name}
							<p id="error-name" class="text-destructive text-sm">
								{formState.errors.name}
							</p>
						{/if}
					</div>
					<div class="group/field grid gap-2" data-invalid={!!formState.errors?.email}>
						<Label for="email" class="group-data-[invalid=true]/field:text-destructive">
							Email <span aria-hidden="true">*</span>
						</Label>
						<Input
							id="email"
							name="email"
							placeholder="leerob@acme.com"
							class="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
							disabled={pending}
							aria-invalid={!!formState.errors?.email}
							aria-errormessage="error-email"
							defaultValue={formState.defaultValues.email}
						/>
						{#if formState.errors.email}
							<p id="error-email" class="text-destructive text-sm">
								{formState.errors.email}
							</p>
						{/if}
					</div>
					<div class="group/field grid gap-2" data-invalid={!!formState.errors?.message}>
						<Label for="message" class="group-data-[invalid=true]/field:text-destructive">
							Message <span aria-hidden="true">*</span>
						</Label>
						<Textarea
							id="message"
							name="message"
							placeholder="Type your message here..."
							class="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
							disabled={pending}
							aria-invalid={!!formState.errors?.message}
							aria-errormessage="error-message"
							defaultValue={formState.defaultValues.message}
						/>
						{#if formState.errors.message}
							<p id="error-message" class="text-destructive text-sm">
								{formState.errors.message}
							</p>
						{/if}
					</div>
				</Card.Content>
				<Card.Footer>
					<Button type="submit" size="sm" disabled={pending}>
						{pending ? "Sending..." : "Send Message"}
					</Button>
				</Card.Footer>
			</Card.Root>
		</form>
		",
		      "target": "example-form.svelte",
		      "type": "registry:component",
		    },
		  ],
		  "name": "example-form",
		  "registryDependencies": [
		    "button",
		    "input",
		    "label",
		    "textarea",
		    "card",
		  ],
		  "title": "Example Form",
		  "type": "registry:component",
		}
	`);
	expect(exampleWithCss).toMatchInlineSnapshot(`
		{
		  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
		  "description": "A login form with a CSS file.",
		  "files": [
		    {
		      "content": "<script lang="ts">
			import "./example-card.css";
		</script>

		<div class="login-container">
			<div class="login-card">
				<h1 class="login-title">Login</h1>
				<p class="login-subtitle">Please enter your credentials to continue</p>
				<form class="login-form">
					<div class="form-group">
						<label for="field-email">Email</label>
						<input id="field-email" type="email" placeholder="Enter your email" required />
					</div>
					<div class="form-group">
						<label for="field-password">Password</label>
						<input id="field-password" type="password" placeholder="Enter your password" required />
					</div>
					<div class="form-actions">
						<button type="submit" class="login-button"> Sign In </button>
					</div>
					<div class="form-footer">
						<a href="##" class="forgot-password"> Forgot password? </a>
					</div>
				</form>
			</div>
		</div>
		",
		      "target": "example-card.svelte",
		      "type": "registry:component",
		    },
		    {
		      "content": ".login-container {
			--primary-color: #111111;
			--primary-hover: #484747;
			--error-color: #ef4444;
			--text-color: #1f2937;
			--text-light: #6b7280;
			--border-color: #e5e7eb;
			--background-light: #f9fafb;
			--card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

			display: flex;
			justify-content: center;
			align-items: center;
			padding: 1rem;
			background-color: var(--background-light);
			width: 100%;
		}

		.login-card {
			width: 100%;
			max-width: 400px;
			padding: 2rem;
			background-color: white;
			border-radius: 8px;
			box-shadow: var(--card-shadow);
		}

		.login-title {
			margin: 0 0 0.5rem 0;
			font-size: 1.5rem;
			font-weight: 600;
			color: var(--text-color);
		}

		.login-subtitle {
			margin: 0 0 1.5rem 0;
			font-size: 0.875rem;
			color: var(--text-light);
		}

		.login-form {
			display: flex;
			flex-direction: column;
			gap: 1.25rem;
		}

		.login-error {
			padding: 0.75rem;
			margin-bottom: 0.5rem;
			background-color: rgba(239, 68, 68, 0.1);
			border-left: 3px solid var(--error-color);
			color: var(--error-color);
			font-size: 0.875rem;
			border-radius: 4px;
		}

		.form-group {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.form-group label {
			font-size: 0.875rem;
			font-weight: 500;
			color: var(--text-color);
		}

		.form-group input {
			padding: 0.75rem;
			border: 1px solid var(--border-color);
			border-radius: 4px;
			font-size: 1rem;
			transition: border-color 0.15s ease;
		}

		.form-group input:focus {
			outline: none;
			border-color: var(--primary-color);
			box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
		}

		.form-group input::placeholder {
			color: var(--text-light);
		}

		.form-actions {
			margin-top: 0.5rem;
		}

		.login-button {
			width: 100%;
			padding: 0.75rem;
			background-color: var(--primary-color);
			color: white;
			border: none;
			border-radius: 4px;
			font-size: 1rem;
			font-weight: 500;
			cursor: pointer;
			transition: background-color 0.15s ease;
		}

		.login-button:hover {
			background-color: var(--primary-hover);
		}

		.login-button:focus {
			outline: none;
			box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
		}

		.form-footer {
			display: flex;
			justify-content: center;
			margin-top: 1rem;
		}

		.forgot-password {
			font-size: 0.875rem;
			color: var(--primary-color);
			text-decoration: none;
		}

		.forgot-password:hover {
			text-decoration: underline;
		}

		@media (max-width: 480px) {
			.login-card {
				padding: 1.5rem;
			}
		}
		",
		      "target": "example-card.css",
		      "type": "registry:component",
		    },
		  ],
		  "name": "example-with-css",
		  "title": "Example with CSS",
		  "type": "registry:component",
		}
	`);
	expect(helloWorld).toMatchInlineSnapshot(`
		{
		  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
		  "description": "A simple hello world component",
		  "files": [
		    {
		      "content": "<h1 class="text-2xl font-bold">Hello world</h1>
		",
		      "target": "hello-world.svelte",
		      "type": "registry:component",
		    },
		  ],
		  "meta": {
		    "author": "huntabyte",
		  },
		  "name": "hello-world",
		  "registryDependencies": [
		    "button",
		  ],
		  "title": "Hello World",
		  "type": "registry:component",
		}
	`);
	expect(stepper).toMatchInlineSnapshot(`
		{
		  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
		  "files": [
		    {
		      "content": "<!--
		This is a custom \`ui\` component that is not a part of the shadcn-svelte registry.
		-->

		<script lang="ts">
			import { cn } from "$UTILS$.js";
			import type { HTMLAttributes } from "svelte/elements";

			let { class: className, children, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
		</script>

		<div class={cn("bg-background", className)} {...restProps}>
			{@render children?.()}
		</div>
		",
		      "target": "stepper/stepper.svelte",
		      "type": "registry:file",
		    },
		    {
		      "content": "<!--
		This is a custom \`ui\` component that is not a part of the shadcn-svelte registry.
		-->

		<script lang="ts">
			import { cn } from "$UTILS$";
			import type { HTMLButtonAttributes } from "svelte/elements";

			let { class: className, step, ...props }: HTMLButtonAttributes & { step: number } = $props();
		</script>

		<button class={cn("bg-blue-500", className)} {...props}> {step} </button>
		",
		      "target": "stepper/stepper-item.svelte",
		      "type": "registry:file",
		    },
		    {
		      "content": "// This is a custom \`ui\` component that is not a part of the shadcn-svelte registry.
		import Stepper from "./stepper.svelte";
		import StepperItem from "./stepper-item.svelte";

		export { Stepper, StepperItem, Stepper as Root, StepperItem as Item };
		",
		      "target": "stepper/index.ts",
		      "type": "registry:file",
		    },
		  ],
		  "name": "stepper",
		  "type": "registry:ui",
		}
	`);
});
