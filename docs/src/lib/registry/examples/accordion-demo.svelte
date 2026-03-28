<script lang="ts">
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
</script>

<Accordion.Root type="single" collapsible class="w-full" value="item-1">
	<Accordion.Item value="item-1">
		<Accordion.Trigger>Product Information</Accordion.Trigger>
		<Accordion.Content>
			<p>
				Our flagship product combines cutting-edge technology with sleek design. Built with
				premium materials, it offers unparalleled performance and reliability.
			</p>
			<p class="mt-4">
				Key features include advanced processing capabilities, and an intuitive user
				interface designed for both beginners and experts.
			</p>
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-2">
		<Accordion.Trigger>Shipping Details</Accordion.Trigger>
		<Accordion.Content>
			<p>
				We offer worldwide shipping through trusted courier partners. Standard delivery
				takes 3-5 business days, while express shipping ensures delivery within 1-2 business
				days.
			</p>
			<p class="mt-4">
				All orders are carefully packaged and fully insured. Track your shipment in
				real-time through our dedicated tracking portal.
			</p>
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-3">
		<Accordion.Trigger>Return Policy</Accordion.Trigger>
		<Accordion.Content>
			<p>
				We stand behind our products with a comprehensive 30-day return policy. If you're
				not completely satisfied, simply return the item in its original condition.
			</p>
			<p class="mt-4">
				Our hassle-free return process includes free return shipping and full refunds
				processed within 48 hours of receiving the returned item.
			</p>
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
