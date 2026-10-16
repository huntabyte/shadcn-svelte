<script lang="ts">
	import CircleIcon from "@lucide/svelte/icons/circle";
	import CircleAlertIcon from "@lucide/svelte/icons/circle-alert";
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import LoaderCircleIcon from "@lucide/svelte/icons/loader-circle";
	import * as Trace from "$lib/registry/ui/trace/index.js";
</script>

<Trace.Root class="max-w-sm">
	<Trace.Line>
		<Trace.Icon>
			<CircleCheckIcon />
		</Trace.Icon>
		<Trace.Title>Ran pnpm install</Trace.Title>
	</Trace.Line>
	<Trace.Line status="error">
		<Trace.Icon>
			<CircleAlertIcon />
		</Trace.Icon>
		<Trace.Title>Failed to run pnpm lint</Trace.Title>
	</Trace.Line>
	<Trace.Line status="running">
		<Trace.Icon>
			<LoaderCircleIcon class="animate-spin" />
		</Trace.Icon>
		<Trace.Title>Running pnpm build</Trace.Title>
	</Trace.Line>
	<Trace.Line status="pending">
		<Trace.Icon>
			<CircleIcon />
		</Trace.Icon>
		<Trace.Title>Run pnpm test</Trace.Title>
	</Trace.Line>
</Trace.Root>
