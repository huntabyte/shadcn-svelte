<script lang="ts">
	import Pre from "./markdown/pre.svelte";
	import { getCommand, getPackageManager } from "$lib/stores/package-manager.js";
	import type { Command } from "package-manager-detector";

	type Props = {
		type: Command | "create";
		command: string | string[];
	};

	const { type, command }: Props = $props();

	const selectedPackageManager = getPackageManager();

	let resolvedCommand = $derived(getCommand($selectedPackageManager, type, command));
</script>

<figure data-rehype-pretty-code-figure>
	<Pre isPackageManagerBlock={true} tabindex={0} data-language="bash" data-theme="github-dark">
		<code data-language="bash" data-theme="github-dark" style="display: grid;">
			<span data-line>
				<span style="color:#B392F0;font-weight:bold">{resolvedCommand.command}</span>
				<span style="color:#9ECBFF">{resolvedCommand.args.join(" ")}</span>
			</span>
		</code>
	</Pre>
</figure>
