<script lang="ts">
	import Pre from "./markdown/pre.svelte";
	import {
		type PackageManager,
		getPackageManager,
	} from "$lib/stores/package-manager.js";

	type PMBlockType = "execute" | "create" | "install" | "remove";

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

	function getUninstallCommand() {
		if (command === "") return "uninstall";
		return getPackageManagerUninstallCmd($selectedPackageManager);
	}

	let cmdStart = getCmd(type, $selectedPackageManager);

	$: cmdStart = getCmd(type, $selectedPackageManager);
</script>

<figure data-rehype-pretty-code-figure>
	<Pre isPackageManagerBlock={true} tabindex={0} data-language="bash" data-theme="github-dark">
		<code data-language="bash" data-theme="github-dark" style="display: grid;">
			<span data-line>
				<span style="color:#B392F0;font-weight:bold">{`${cmdStart}`}</span>
				{#if type === "install" || type === "create" || type == "remove"}
					<span style="color:#9ECBFF">
						{#if type === "install"}
							{`${getInstallCommand()} `}
						{:else if type == "create"}
							{"create "}
						{:else if type == "remove"}
							{`${getUninstallCommand()} `}
						{/if}
					</span>
				{/if}
				{#if command !== ""}
					{#each command.split(" ") as word, i}
						{#if i === 0}
							<span style="color:#9ECBFF; margin-left:-8px">{`${word}`}</span>
						{:else}
							<span style="color:#9ECBFF">{` ${word}`}</span>
						{/if}
					{/each}
				{/if}
			</span>
		</code>
	</Pre>
</figure>
