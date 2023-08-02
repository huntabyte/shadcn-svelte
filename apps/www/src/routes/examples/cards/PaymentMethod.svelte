<script lang="ts">
	import { CreditCard } from "lucide-svelte";
	import { Icons } from "$components/docs";
	import { Button } from "$components/ui/button";
	import { Card } from "$components/ui/card";
	import { Input } from "$components/ui/input";
	import { Label } from "$components/ui/label";
	import { RadioGroup, RadioGroupItem } from "$components/ui/radio-group";
</script>

<Card>
	<Card.Header>
		<Card.Title>Payment Method</Card.Title>
		<Card.Description>
			Add a new payment method to your account.
		</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<RadioGroup value="card" class="grid grid-cols-3 gap-4">
			<Label
				for="card"
				class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
			>
				<RadioGroupItem value="card" id="card" class="sr-only" />
				<CreditCard class="mb-3 h-6 w-6" />
				Card
			</Label>
			<Label
				for="paypal"
				class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
			>
				<RadioGroupItem value="paypal" id="paypal" class="sr-only" />
				<Icons.paypal class="mb-3 h-6 w-6" />
				Paypal
			</Label>
			<Label
				for="apple"
				class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
			>
				<RadioGroupItem value="apple" id="apple" class="sr-only" />
				<Icons.apple class="mb-3 h-6 w-6" />
				Apple
			</Label>
		</RadioGroup>
		<div class="grid gap-2">
			<Label for="name">Name</Label>
			<Input id="name" placeholder="First Last" />
		</div>
		<div class="grid gap-2">
			<Label for="number">Card number</Label>
			<Input id="number" placeholder="" />
		</div>
		<div class="grid grid-cols-3 gap-4">
			<div class="grid gap-2">
				<Label for="month">Expires</Label>
				<Input id="month" placeholder="" />
				<!-- <Select>
					<SelectTrigger id="month">
						<SelectValue placeholder="Month" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="1">January</SelectItem>
						<SelectItem value="2">February</SelectItem>
						<SelectItem value="3">March</SelectItem>
						<SelectItem value="4">April</SelectItem>
						<SelectItem value="5">May</SelectItem>
						<SelectItem value="6">June</SelectItem>
						<SelectItem value="7">July</SelectItem>
						<SelectItem value="8">August</SelectItem>
						<SelectItem value="9">September</SelectItem>
						<SelectItem value="10">October</SelectItem>
						<SelectItem value="11">November</SelectItem>
						<SelectItem value="12">December</SelectItem>
					</SelectContent>
				</Select> -->
			</div>
			<div class="grid gap-2">
				<Label for="year">Year</Label>
				<Input id="year" placeholder="" />
				<!-- <Select>
					<SelectTrigger id="year">
						<SelectValue placeholder="Year" />
					</SelectTrigger>
					<SelectContent>
						{#each Array(10) as _, i}}
							<SelectItem
								key={i}
								value={`${new Date().getFullYear() + i}`}
							>
								{new Date().getFullYear() + i}
							</SelectItem>
						{/each}
					</SelectContent>
				</Select> -->
			</div>
			<div class="grid gap-2">
				<Label for="cvc">CVC</Label>
				<Input id="cvc" placeholder="CVC" />
			</div>
		</div>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full">Continue</Button>
	</Card.Footer>
</Card>
