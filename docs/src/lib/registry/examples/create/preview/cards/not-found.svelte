<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Kbd } from "$lib/registry/ui/kbd/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Card.Root>
	<Card.Content>
		<Empty.Root class="h-72">
			<Empty.Header>
				<Empty.Title>404 - Not Found</Empty.Title>
				<Empty.Description>
					The page you're looking for doesn't exist. Try searching for what you need
					below.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<InputGroup.Root class="w-3/4">
					<InputGroup.Input placeholder="Try searching for pages..." />
					<InputGroup.Addon>
						<IconPlaceholder
							lucide="SearchIcon"
							tabler="IconSearch"
							hugeicons="Search01Icon"
							phosphor="MagnifyingGlassIcon"
							remixicon="RiSearchLine"
						/>
					</InputGroup.Addon>
					<InputGroup.Addon align="inline-end">
						<Kbd>/</Kbd>
					</InputGroup.Addon>
				</InputGroup.Root>
				<Button variant="link">Go to homepage</Button>
			</Empty.Content>
		</Empty.Root>
	</Card.Content>
</Card.Root>
