<script lang="ts">
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
</script>

<Accordion.Root type="single" class="w-full">
	<Accordion.Item value="item-1">
		<Accordion.Trigger>How do I view my account history?</Accordion.Trigger>
		<Accordion.Content>
			You can view your complete account history by navigating to the History section in your
			account settings.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-2" disabled>
		<Accordion.Trigger>Can I update my email address?</Accordion.Trigger>
		<Accordion.Content>
			Yes, you can update your email address from the Profile section of your account
			settings.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-3">
		<Accordion.Trigger>How do I delete my account?</Accordion.Trigger>
		<Accordion.Content>
			Account deletion can be requested from the Security section of your account settings.
			This action is permanent and cannot be undone.
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
