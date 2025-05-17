<script lang="ts">
	import * as Avatar from "$lib/registry/ui/avatar/index.js";

	let sales = $state([
		{
			name: "Olivia Martin",
			email: "olivia.martin@email.com",
			amount: 1999,
		},
		{
			name: "Jackson Lee",
			email: "jackson.lee@email.com",
			amount: 2999,
		},
		{
			name: "Isabella Nguyen",
			email: "isabella.nguyen@email.com",
			amount: 999,
		},
		{
			name: "William Kim",
			email: "william.kim@email.com",
			amount: 3999,
		},
		{
			name: "Sofia Davis",
			email: "sofia.davis@email.com",
			amount: 4999,
		},
	]);
</script>

<div class="space-y-8">
	{#each sales as sale (sale.name)}
		<div class="flex items-center">
			<Avatar.Root class="size-9">
				<Avatar.Image src="/avatars/01.png" alt="Avatar" />
				<Avatar.Fallback>
					{sale.name
						.split(" ")
						.map((n) => n[0])
						.join("")}
				</Avatar.Fallback>
			</Avatar.Root>
			<div class="ml-4 space-y-1">
				<p class="text-sm font-medium leading-none">{sale.name}</p>
				<p class="text-muted-foreground text-sm">{sale.email}</p>
			</div>
			<div class="ml-auto font-medium">
				{new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(sale.amount)}
			</div>
		</div>
	{/each}
</div>
