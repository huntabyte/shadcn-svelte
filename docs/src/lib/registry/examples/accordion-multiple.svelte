<script lang="ts">
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
</script>

<Accordion.Root type="multiple" class="w-full" value={["item-1"]}>
	<Accordion.Item value="item-1">
		<Accordion.Trigger>Notification Settings</Accordion.Trigger>
		<Accordion.Content>
			Manage how and when you receive notifications. You can customize alerts for email, push, and
			in-app messages.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-2">
		<Accordion.Trigger>Privacy & Security</Accordion.Trigger>
		<Accordion.Content>
			Control your privacy settings and manage your account security. Enable two-factor
			authentication for added protection.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-3">
		<Accordion.Trigger>Billing & Subscription</Accordion.Trigger>
		<Accordion.Content>
			View and manage your subscription, payment methods, and billing history. Update your plan or
			cancel at any time.
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
