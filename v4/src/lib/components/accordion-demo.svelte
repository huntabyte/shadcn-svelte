<script lang="ts">
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
</script>

<div class="grid w-full max-w-xl gap-4">
	<Accordion.Root type="single" class="w-full">
		<Accordion.Item value="item-1">
			<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
			<Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-2">
			<Accordion.Trigger>Is it styled?</Accordion.Trigger>
			<Accordion.Content>
				Yes. It comes with default styles that matches the other components&apos; aesthetic.
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-3">
			<Accordion.Trigger>Is it animated?</Accordion.Trigger>
			<Accordion.Content>
				Yes. It&apos;s animated by default, but you can disable it if you prefer.
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
	<Accordion.Root type="single" class="w-full">
		<Accordion.Item value="item-1">
			<Accordion.Trigger>
				What are the key considerations when implementing a comprehensive enterprise-level
				authentication system?
			</Accordion.Trigger>
			<Accordion.Content>
				Implementing a robust enterprise authentication system requires careful
				consideration of multiple factors. This includes secure password hashing and
				storage, multi-factor authentication (MFA) implementation, session management,
				OAuth2 and SSO integration, regular security audits, rate limiting to prevent brute
				force attacks, and maintaining detailed audit logs. Additionally, you&apos;ll need
				to consider scalability, performance impact, and compliance with relevant data
				protection regulations such as GDPR or HIPAA.
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-2">
			<Accordion.Trigger>
				How does modern distributed system architecture handle eventual consistency and data
				synchronization across multiple regions?
			</Accordion.Trigger>
			<Accordion.Content>
				Modern distributed systems employ various strategies to maintain data consistency
				across regions. This often involves using techniques like CRDT (Conflict-Free
				Replicated Data Types), vector clocks, and gossip protocols. Systems might implement
				event sourcing patterns, utilize message queues for asynchronous updates, and employ
				sophisticated conflict resolution strategies. Popular solutions like Amazon&apos;s
				DynamoDB and Google&apos;s Spanner demonstrate different approaches to solving these
				challenges, balancing between consistency, availability, and partition tolerance as
				described in the CAP theorem.
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
</div>
