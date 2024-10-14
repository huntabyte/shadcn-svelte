<script lang="ts">
	import * as Icon from "$lib/components/docs/icons/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import { type PrimitiveDivAttributes, cn } from "$lib/utils.js";

	let { class: className, ...restProps }: PrimitiveDivAttributes = $props();

	let isLoading = $state(false);
	async function onSubmit(e: Event) {
		e.preventDefault();
		isLoading = true;

		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}
</script>

<div class={cn("grid gap-6", className)} {...restProps}>
	<form onsubmit={onSubmit}>
		<div class="grid gap-2">
			<div class="grid gap-1">
				<Label class="sr-only" for="email">Email</Label>
				<Input
					id="email"
					placeholder="name@example.com"
					type="email"
					autocapitalize="none"
					autocomplete="email"
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>
			<Button type="submit" disabled={isLoading}>
				{#if isLoading}
					<Icon.Spinner class="mr-2 size-4 animate-spin" />
				{/if}
				Sign In with Email
			</Button>
		</div>
	</form>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t"></span>
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background text-muted-foreground px-2"> Or continue with </span>
		</div>
	</div>
	<Button variant="outline" type="button" disabled={isLoading}>
		{#if isLoading}
			<Icon.Spinner class="mr-2 size-4 animate-spin" />
		{:else}
			<Icon.GitHub class="mr-2 size-4" />
		{/if}
		GitHub
	</Button>
</div>
