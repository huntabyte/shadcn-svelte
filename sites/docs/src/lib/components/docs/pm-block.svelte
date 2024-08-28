<script lang="ts">
	import Pre from "./markdown/pre.svelte";
	import {
		type PackageManager,
		getPackageManager,
		getPackageManagerInstallCmd,
		getPackageManagerScriptCmd,
	} from "$lib/stores/package-manager.js";

	type PMBlockType = "execute" | "create" | "install";

	export let type: PMBlockType;
	export let command: string = "";

	const selectedPackageManager = getPackageManager();

	function getCmd(type: PMBlockType, pm: PackageManager) {
		if (type === "execute") return getPackageManagerScriptCmd(pm);
		return pm;
	}

	function getInstallCommand() {
		if (command === "") return "install";
		return getPackageManagerInstallCmd($selectedPackageManager);
	}

	let cmdStart = getCmd(type, $selectedPackageManager);

	$: cmdStart = getCmd(type, $selectedPackageManager);
</script>

<figure data-rehype-pretty-code-figure>
	<Pre
		isPackageManagerBlock={true}
		tabindex="0"
		data-language="bash"
		data-theme="Lambda Studio - Blackout"
	>
		<code data-language="bash" data-theme="Lambda Studio — Blackout" style="display: grid;">
			<span data-line>
				<span style="color:#FFF;font-weight:bold">{`${cmdStart}`}</span>
				{#if type === "install" || type === "create"}
					<span style="color:#FFF8">
						{`${type === "install" ? getInstallCommand() : "create"}${command === "" ? "" : ` `}`}
					</span>
				{/if}
				{#if command !== ""}
					{#each command.split(" ") as word, i}
						{#if i === 0}
							<span style="color:#FFF8; margin-left:-8px">{`${word}`}</span>
						{:else}
							<span style="color:#FFF8">{` ${word}`}</span>
						{/if}
					{/each}
				{/if}
			</span>
		</code>
	</Pre>
</figure>
