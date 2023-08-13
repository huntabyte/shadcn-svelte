<script lang="ts">
	import { Button } from "@/registry/default/ui/button";
	import * as Card from "@/registry/default/ui/card";
	import * as Select from "@/registry/default/ui/select";
	import { Input } from "@/registry/default/ui/input";
	import { Label } from "@/registry/default/ui/label";

	const frameworks = [
		{
			value: "sveltekit",
			label: "SvelteKit"
		},
		{
			value: "next",
			label: "Next.js"
		},
		{
			value: "astro",
			label: "Astro"
		},
		{
			value: "nuxt",
			label: "Nuxt.js"
		}
	];
</script>

<Card.Root class="w-[350px]">
	<Card.Header>
		<Card.Title>Create project</Card.Title>
		<Card.Description
			>Deploy your new project in one-click.</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<form>
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<Label for="name">Name</Label>
					<Input id="name" placeholder="Name of your project" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="framework">Framework</Label>
					<Select.Root>
						<Select.Trigger id="framework">
							<Select.Value placeholder="Select" />
						</Select.Trigger>
						<Select.Content>
							{#each frameworks as framework}
								<Select.Item
									value={framework.value}
									label={framework.label}
									>{framework.label}</Select.Item
								>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			</div>
		</form>
	</Card.Content>
	<Card.Footer class="flex justify-between">
		<Button variant="outline">Cancel</Button>
		<Button>Deploy</Button>
	</Card.Footer>
</Card.Root>
