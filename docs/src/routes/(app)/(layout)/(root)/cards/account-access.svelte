<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from "$lib/registry/ui/card/index.js";
	import { Field, FieldGroup, FieldLabel } from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import {
		Item,
		ItemContent,
		ItemDescription,
		ItemMedia,
		ItemTitle,
	} from "$lib/registry/ui/item/index.js";
</script>

<Card>
	<CardHeader>
		<CardTitle>Account Access</CardTitle>
		<CardDescription>Update your credentials or re-authenticate.</CardDescription>
	</CardHeader>
	<CardContent>
		<FieldGroup>
			<Field>
				<FieldLabel for="email-address">Email Address</FieldLabel>
				<Input id="email-address" type="email" placeholder="artist@studio.inc"></Input>
			</Field>
			<Field>
				<div class="flex items-center justify-between">
					<FieldLabel for="current-password">Current Password</FieldLabel>
					<a
						href="/"
						class="text-muted-foreground hover:text-foreground text-xs font-medium tracking-wider uppercase"
					>
						Forgot?
					</a>
				</div>
				<Input id="current-password" type="password" placeholder="••••••••••••••••••••••••"
				></Input>
			</Field>
		</FieldGroup>
	</CardContent>
	<CardFooter class="flex-col gap-4">
		<Button class="w-full">
			<IconPlaceholder
				lucide="LockKeyholeIcon"
				tabler="IconLock"
				hugeicons="SquareLock02Icon"
				phosphor="LockKeyIcon"
				remixicon="RiLockLine"
			/>
			Update Security
		</Button>
		<Item variant="muted">
			<ItemMedia variant="icon">
				<IconPlaceholder
					lucide="CircleAlertIcon"
					tabler="IconAlertCircle"
					hugeicons="AlertCircleIcon"
					phosphor="WarningCircleIcon"
					remixicon="RiErrorWarningLine"
					class="text-destructive"
				/>
			</ItemMedia>
			<ItemContent>
				<ItemTitle>Danger Zone</ItemTitle>
				<ItemDescription class="line-clamp-1">
					Archive account and remove catalog
				</ItemDescription>
			</ItemContent>
			<IconPlaceholder
				lucide="ArrowRightIcon"
				tabler="IconArrowRight"
				hugeicons="ArrowRight01Icon"
				phosphor="ArrowRightIcon"
				remixicon="RiArrowRightLine"
				class="size-4"
			/>
		</Item>
	</CardFooter>
</Card>
