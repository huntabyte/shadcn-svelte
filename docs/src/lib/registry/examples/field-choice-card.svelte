<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";

	let computeEnvironment = $state("kubernetes");
</script>

<Field.Group class="w-full max-w-xs">
	<Field.Set>
		<Field.Legend variant="label">Compute Environment</Field.Legend>
		<Field.Description>Select the compute environment for your cluster.</Field.Description>
		<RadioGroup.Root bind:value={computeEnvironment}>
			<Field.Label for="kubernetes-r2h">
				<Field.Field orientation="horizontal">
					<Field.Content>
						<Field.Title>Kubernetes</Field.Title>
						<Field.Description>Run GPU workloads on a K8s cluster.</Field.Description>
					</Field.Content>
					<RadioGroup.Item value="kubernetes" id="kubernetes-r2h" />
				</Field.Field>
			</Field.Label>
			<Field.Label for="vm-z4k">
				<Field.Field orientation="horizontal">
					<Field.Content>
						<Field.Title>Virtual Machine</Field.Title>
						<Field.Description>Access a cluster to run GPU workloads.</Field.Description>
					</Field.Content>
					<RadioGroup.Item value="vm" id="vm-z4k" />
				</Field.Field>
			</Field.Label>
		</RadioGroup.Root>
	</Field.Set>
</Field.Group>
