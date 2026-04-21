<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<div class="w-full max-w-lg">
	<form>
		<Field.Set>
			<Field.Legend>Profile</Field.Legend>
			<Field.Description>Fill in your profile information.</Field.Description>
			<Field.Group>
				<Field.Field orientation="responsive">
					<Field.Content>
						<Field.Label for="name">Name</Field.Label>
						<Field.Description>
							Provide your full name for identification
						</Field.Description>
					</Field.Content>
					<Input id="name" placeholder="Evil Rabbit" required />
				</Field.Field>
				<Field.Field orientation="responsive">
					<Button type="submit">Submit</Button>
					<Button type="button" variant="outline">Cancel</Button>
				</Field.Field>
			</Field.Group>
		</Field.Set>
	</form>
</div>
