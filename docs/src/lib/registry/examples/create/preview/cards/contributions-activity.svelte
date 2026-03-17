<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Contributions & Activity</Card.Title>
		<Card.Description>Manage your contributions and activity visibility.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form id="contributions-activity">
			<Field.Group>
				<Field.Set>
					<Field.Legend class="sr-only">Contributions & activity</Field.Legend>
					<Field.Group>
						<Field.Field orientation="horizontal">
							<Checkbox id="activity-private-profile" />
							<Field.Content>
								<Field.Label for="activity-private-profile">
									Make profile private and hide activity
								</Field.Label>
								<Field.Description>
									Enabling this will hide your contributions and activity from
									your GitHub profile and from social features like followers,
									stars, feeds, leaderboards and releases.
								</Field.Description>
							</Field.Content>
						</Field.Field>
					</Field.Group>
				</Field.Set>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Button form="contributions-activity">Save Changes</Button>
	</Card.Footer>
</Card.Root>
