<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Item from "$lib/registry/ui/item/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Item">
	<div class="flex w-full max-w-md flex-col gap-6">
		<Item.Root variant="outline">
			<Item.Content>
				<Item.Title>Two-factor authentication</Item.Title>
				<Item.Description class="text-pretty xl:hidden 2xl:block">
					Verify via email or phone number.
				</Item.Description>
			</Item.Content>
			<Item.Actions>
				<Button size="sm" variant="secondary">Enable</Button>
			</Item.Actions>
		</Item.Root>
		<Item.Root variant="outline" size="sm">
			{#snippet child({ props })}
				<a href="#/" {...props}>
					<Item.Media variant="icon">
						<IconPlaceholder
							lucide="ShoppingBagIcon"
							tabler="IconShoppingBag"
							hugeicons="ShoppingBasket01Icon"
							phosphor="BagIcon"
							remixicon="RiShoppingBagLine"
						/>
					</Item.Media>
					<Item.Content>
						<Item.Title>Your order has been shipped.</Item.Title>
					</Item.Content>
				</a>
			{/snippet}
		</Item.Root>
	</div>
</Example>
