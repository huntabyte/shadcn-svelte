<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Input from "$lib/registry/ui/input/index.js";
	import * as Button from "$lib/registry/ui/button/index.js";
</script>

<Example title="Login">
	<Card.Root class="mx-auto w-full max-w-sm">
		<Card.Header>
			<Card.Title>Login to your account</Card.Title>
			<Card.Description>
				Enter your email below to login to your account
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<form>
				<Field.Group>
					<Field.Field>
						<Field.Label for="email">Email</Field.Label>
						<Input.Root
							id="email"
							type="email"
							placeholder="m@example.com"
							required
						/>
					</Field.Field>
					<Field.Field>
						<div class="flex items-center">
							<Field.Label for="password">Password</Field.Label>
							<a
								href="#/"
								class="ml-auto inline-block underline-offset-4 hover:underline"
							>
								Forgot your password?
							</a>
						</div>
						<Input.Root id="password" type="password" required />
					</Field.Field>
				</Field.Group>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button.Root type="submit" class="w-full">
				Login
			</Button.Root>
			<Button.Root variant="outline" class="w-full">
				Login with Google
			</Button.Root>
			<div class="mt-4 text-center">
				Don't have an account?
				<a href="#/" class="underline underline-offset-4">
					Sign up
				</a>
			</div>
		</Card.Footer>
	</Card.Root>
</Example>

