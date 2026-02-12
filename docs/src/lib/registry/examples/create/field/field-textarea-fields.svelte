<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Textarea from "$lib/registry/ui/textarea/index.js";
</script>

<Example title="Textarea Fields">
	<Field.Group>
		<Field.Field>
			<Field.Label for="textarea-basic">Basic Textarea</Field.Label>
			<Textarea.Root id="textarea-basic" placeholder="Enter your message" />
		</Field.Field>
		<Field.Field>
			<Field.Label for="textarea-comments">Comments</Field.Label>
			<Textarea.Root
				id="textarea-comments"
				placeholder="Share your thoughts..."
				class="min-h-[100px]"
			/>
			<Field.Description>Maximum 500 characters allowed.</Field.Description>
		</Field.Field>
		<Field.Field>
			<Field.Label for="textarea-bio">Bio</Field.Label>
			<Field.Description>Tell us about yourself in a few sentences.</Field.Description>
			<Textarea.Root id="textarea-bio" placeholder="I am a..." class="min-h-[120px]" />
		</Field.Field>
		<Field.Field>
			<Field.Label for="textarea-desc-after">Message</Field.Label>
			<Textarea.Root id="textarea-desc-after" placeholder="Enter your message" />
			<Field.Description>
				Enter your message so it is long enough to test the layout.
			</Field.Description>
		</Field.Field>
		<Field.Field data-invalid>
			<Field.Label for="textarea-invalid">Invalid Textarea</Field.Label>
			<Textarea.Root
				id="textarea-invalid"
				placeholder="This field has an error"
				aria-invalid
			/>
			<Field.Description>This field contains validation errors.</Field.Description>
		</Field.Field>
		<Field.Field data-disabled>
			<Field.Label for="textarea-disabled-field">Disabled Field</Field.Label>
			<Textarea.Root id="textarea-disabled-field" placeholder="Cannot edit" disabled />
			<Field.Description>This field is currently disabled.</Field.Description>
		</Field.Field>
	</Field.Group>
</Example>
