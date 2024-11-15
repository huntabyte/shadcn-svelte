<script lang="ts">
	import Pre from "./markdown/pre.svelte";
	import { getPackageManager } from "$lib/stores/package-manager.js";
	import {
		resolveCommand,
		type Agent,
		type Command,
		type ResolvedCommand,
	} from "package-manager-detector";

	type Props = {
		type: Command | "create";
		command: string | string[];
	};

	const { type, command }: Props = $props();

	const selectedPackageManager = getPackageManager();

	function getCmd(pm: Agent, type: Props["type"]): ResolvedCommand {
		// ssr
		if (pm === undefined) pm = "npm";

		let args = [];
		if (typeof command === "string") {
			args = command.split(" ");
		} else {
			args = command;
		}

		// special handling for create
		if (type === "create") return { command: pm, args: ["create", ...args] };

		const cmd = resolveCommand(pm, type, args);

		// since docs are static any unresolved command is a code error
		if (cmd === null) throw new Error("Could not resolve command!");

		return cmd;
	}

	let resolvedCommand = $derived(getCmd($selectedPackageManager, type));
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
