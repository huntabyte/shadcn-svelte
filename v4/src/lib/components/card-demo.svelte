<script lang="ts">
	import BathIcon from "@lucide/svelte/icons/bath";
	import BedIcon from "@lucide/svelte/icons/bed";
	import LandPlotIcon from "@lucide/svelte/icons/land-plot";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<div class="flex flex-col items-start gap-4">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title>Login to your account</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" required />
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Password</Label>
							<a
								href="##"
								class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
							>
								Forgot your password?
							</a>
						</div>
						<Input id="password" type="password" required />
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button type="submit" class="w-full">Login</Button>
			<Button variant="outline" class="w-full">Login with Google</Button>
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="##" class="underline underline-offset-4"> Sign up </a>
			</div>
		</Card.Footer>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Meeting Notes</Card.Title>
			<Card.Description>Transcript from the meeting with the client.</Card.Description>
		</Card.Header>
		<Card.Content class="text-sm">
			<p>Client requested dashboard redesign with focus on mobile responsiveness.</p>
			<ol class="mt-4 flex list-decimal flex-col gap-2 pl-6">
				<li>New analytics widgets for daily/weekly metrics</li>
				<li>Simplified navigation menu</li>
				<li>Dark mode support</li>
				<li>Timeline: 6 weeks</li>
				<li>Follow-up meeting scheduled for next Tuesday</li>
			</ol>
		</Card.Content>
		<Card.Footer>
			<div
				class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale"
			>
				<Avatar.Root>
					<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
				<Avatar.Root>
					<Avatar.Image src="https://github.com/leerob.png" alt="@leerob" />
					<Avatar.Fallback>LR</Avatar.Fallback>
				</Avatar.Root>
				<Avatar.Root>
					<Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
					<Avatar.Fallback>ER</Avatar.Fallback>
				</Avatar.Root>
			</div>
		</Card.Footer>
	</Card.Root>
	<Card.Root>
		<Card.Header>
			<Card.Title>Is this an image?</Card.Title>
			<Card.Description>This is a card with an image.</Card.Description>
		</Card.Header>
		<Card.Content class="px-0">
			<img
				src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
				alt=" by Drew Beamer"
				class="aspect-video object-cover"
				width={500}
				height={500}
			/>
		</Card.Content>
		<Card.Footer class="flex items-center gap-2">
			<Badge variant="outline">
				<BedIcon /> 4
			</Badge>
			<Badge variant="outline">
				<BathIcon /> 2
			</Badge>
			<Badge variant="outline">
				<LandPlotIcon /> 350m²
			</Badge>
			<div class="ml-auto font-medium tabular-nums">$135,000</div>
		</Card.Footer>
	</Card.Root>
	<div class="flex w-full flex-wrap items-start gap-8 md:*:data-[slot=card]:basis-1/4">
		<Card.Root>
			<Card.Content class="text-sm">Content Only</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title>Header Only</Card.Title>
				<Card.Description>This is a card with a header and a description.</Card.Description>
			</Card.Header>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title>Header and Content</Card.Title>
				<Card.Description>This is a card with a header and a content.</Card.Description>
			</Card.Header>
			<Card.Content class="text-sm">Content</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Footer class="text-sm">Footer Only</Card.Footer>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title>Header + Footer</Card.Title>
				<Card.Description>This is a card with a header and a footer.</Card.Description>
			</Card.Header>
			<Card.Footer class="text-sm">Footer</Card.Footer>
		</Card.Root>
		<Card.Root>
			<Card.Content class="text-sm">Content</Card.Content>
			<Card.Footer class="text-sm">Footer</Card.Footer>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title>Header + Footer</Card.Title>
				<Card.Description>This is a card with a header and a footer.</Card.Description>
			</Card.Header>
			<Card.Content class="text-sm">Content</Card.Content>
			<Card.Footer class="text-sm">Footer</Card.Footer>
		</Card.Root>
	</div>
</div>
