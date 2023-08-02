<script lang="ts">
	import { Button } from "$components/ui/button";
	import { Card } from "$components/ui/card";
	import { Input } from "$components/ui/input";
	import { Label } from "$components/ui/label";
	import {
		Tabs,
		TabsContent,
		TabsList,
		TabsTrigger
	} from "$components/ui/tabs";
</script>

<Tabs value="account" class="w-[400px]">
	<TabsList class="grid w-full grid-cols-2">
		<TabsTrigger value="account">Account</TabsTrigger>
		<TabsTrigger value="password">Password</TabsTrigger>
	</TabsList>
	<TabsContent value="account">
		<Card>
			<Card.Header>
				<Card.Title>Account</Card.Title>
				<Card.Description>
					Make changes to your account here. Click save when you're
					done.
				</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="space-y-1">
					<Label for="name">Name</Label>
					<Input id="name" value="Pedro Duarte" />
				</div>
				<div class="space-y-1">
					<Label for="username">Username</Label>
					<Input id="username" value="@peduarte" />
				</div>
			</Card.Content>
			<Card.Footer>
				<Button>Save changes</Button>
			</Card.Footer>
		</Card>
	</TabsContent>
	<TabsContent value="password">
		<Card>
			<Card.Header>
				<Card.Title>Password</Card.Title>
				<Card.Description>
					Change your password here. After saving, you'll be logged
					out.
				</Card.Description>
			</Card.Header>
			<Card.Content class="space-y-2">
				<div class="space-y-1">
					<Label for="current">Current password</Label>
					<Input id="current" type="password" />
				</div>
				<div class="space-y-1">
					<Label for="new">New password</Label>
					<Input id="new" type="password" />
				</div>
			</Card.Content>
			<Card.Footer>
				<Button>Save password</Button>
			</Card.Footer>
		</Card>
	</TabsContent>
</Tabs>
