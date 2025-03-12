<script lang="ts">
	import CircleUser from "@lucide/svelte/icons/circle-user";
	import Menu from "@lucide/svelte/icons/menu";
	import Package2 from "@lucide/svelte/icons/package-2";
	import Search from "@lucide/svelte/icons/search";

	import { Button } from "$lib/registry/default/ui/button/index.js";
	import * as Card from "$lib/registry/default/ui/card/index.js";
	import { Checkbox } from "$lib/registry/default/ui/checkbox/index.js";
	import * as DropdownMenu from "$lib/registry/default/ui/dropdown-menu/index.js";
	import { Input } from "$lib/registry/default/ui/input/index.js";
	import * as Sheet from "$lib/registry/default/ui/sheet/index.js";
</script>

<div class="flex min-h-screen w-full flex-col">
	<header class="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
		<nav
			class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
		>
			<a href="##" class="flex items-center gap-2 text-lg font-semibold md:text-base">
				<Package2 class="size-6" />
				<span class="sr-only">Acme Inc</span>
			</a>
			<a href="##" class="text-muted-foreground hover:text-foreground transition-colors">
				Dashboard
			</a>
			<a href="##" class="text-muted-foreground hover:text-foreground transition-colors">
				Orders
			</a>
			<a href="##" class="text-muted-foreground hover:text-foreground transition-colors">
				Products
			</a>
			<a href="##" class="text-muted-foreground hover:text-foreground transition-colors">
				Customers
			</a>
			<a href="##" class="text-foreground hover:text-foreground transition-colors">
				Settings
			</a>
		</nav>
		<Sheet.Root>
			<Sheet.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline" size="icon" class="shrink-0 md:hidden">
						<Menu class="size-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				{/snippet}
			</Sheet.Trigger>
			<Sheet.Content side="left">
				<nav class="grid gap-6 text-lg font-medium">
					<a href="##" class="flex items-center gap-2 text-lg font-semibold">
						<Package2 class="size-6" />
						<span class="sr-only">Acme Inc</span>
					</a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Dashboard </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Orders </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Products </a>
					<a href="##" class="text-muted-foreground hover:text-foreground"> Customers </a>
					<a href="##" class="hover:text-foreground"> Settings </a>
				</nav>
			</Sheet.Content>
		</Sheet.Root>
		<div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
			<form class="ml-auto flex-1 sm:flex-initial">
				<div class="relative">
					<Search class="text-muted-foreground absolute left-2.5 top-2.5 size-4" />
					<Input
						type="search"
						placeholder="Search products..."
						class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
					/>
				</div>
			</form>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="secondary" size="icon" class="rounded-full">
							<CircleUser class="size-5" />
							<span class="sr-only">Toggle user menu</span>
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Group>
						<DropdownMenu.GroupHeading>My Account</DropdownMenu.GroupHeading>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Settings</DropdownMenu.Item>
						<DropdownMenu.Item>Support</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Logout</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</header>
	<main
		class="bg-muted/40 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10"
	>
		<div class="mx-auto grid w-full max-w-6xl gap-2">
			<h1 class="text-3xl font-semibold">Settings</h1>
		</div>
		<div
			class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
		>
			<nav
				class="text-muted-foreground grid gap-4 text-sm"
				data-x-chunk-name="dashboard-04-chunk-0"
				data-x-chunk-description="A sidebar navigation with links to general, security, integrations, support, organizations, and advanced settings."
				data-x-chunk-container="chunk-container after:right-0"
			>
				<a href="##" class="text-primary font-semibold"> General </a>
				<a href="##">Security</a>
				<a href="##">Integrations</a>
				<a href="##">Support</a>
				<a href="##">Organizations</a>
				<a href="##">Advanced</a>
			</nav>
			<div class="grid gap-6">
				<Card.Root
					data-x-chunk-name="dashboard-04-chunk-1"
					data-x-chunk-description="A form to update the store name."
				>
					<Card.Header>
						<Card.Title>Store Name</Card.Title>
						<Card.Description>
							Used to identify your store in the marketplace.
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<form>
							<Input placeholder="Store Name" />
						</form>
					</Card.Content>
					<Card.Footer class="border-t px-6 py-4">
						<Button>Save</Button>
					</Card.Footer>
				</Card.Root>
				<Card.Root
					data-x-chunk-name="dashboard-04-chunk-2"
					data-x-chunk-description="A form to update the plugins directory with a checkbox to allow administrators to change the directory."
				>
					<Card.Header>
						<Card.Title>Plugins Directory</Card.Title>
						<Card.Description>
							The directory within your project, in which your plugins are located.
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<form class="flex flex-col gap-4">
							<Input placeholder="Project Name" value="/content/plugins" />
							<div class="flex items-center space-x-2">
								<Checkbox id="include" checked={true} />
								<label
									for="include"
									class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Allow administrators to change the directory.
								</label>
							</div>
						</form>
					</Card.Content>
					<Card.Footer class="border-t px-6 py-4">
						<Button>Save</Button>
					</Card.Footer>
				</Card.Root>
			</div>
		</div>
	</main>
</div>
