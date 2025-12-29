<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<Example title="Contributions Activity" class="justify-center">
	<Card.Root class="mx-auto w-full max-w-md">
		<Card.Header>
			<Card.Title>Contributions & Activity</Card.Title>
			<Card.Description>Manage your contributions and activity visibility.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form id="contributions-activity">
				<Field.Group>
					<Field.Set>
						<Field.Legend class="sr-only">Contributions & activity</Field.Legend>
						<Field.Group class="gap-3">
							<Field.Field orientation="horizontal">
								<Checkbox id="private-profile" />
								<Field.Content>
									<Field.Label for="private-profile" class="font-normal">
										Make profile private and hide activity
									</Field.Label>
									<Field.Description>
										Enabling this will hide your contributions and activity from
										your GitHub profile and from social features like followers,
										stars, feeds, leaderboards and releases.
									</Field.Description>
								</Field.Content>
							</Field.Field>
							<Field.Field orientation="horizontal">
								<Checkbox id="private-contributions" checked />
								<Field.Content>
									<Field.Label for="private-contributions" class="font-normal">
										Include private contributions on my profile
									</Field.Label>
									<Field.Description>
										Your contribution graph, achievements, and activity overview
										will show your private contributions without revealing any
										repository or organization information.
										<a href="#read-more">Read more</a>.
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
</Example>
