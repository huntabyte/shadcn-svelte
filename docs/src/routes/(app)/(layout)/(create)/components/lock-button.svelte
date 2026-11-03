<script lang="ts">
	import LockButton from "$lib/components/lock-button.svelte";
	import { useDesignSystem, type Lockable } from "$lib/features/design-system/index.js";

	type Props = {
		prop: keyof Lockable;
		class?: string;
	};

	let { prop, class: className }: Props = $props();

	const designSystem = useDesignSystem();

	const isLocked = $derived(designSystem.locks[prop]);
</script>

<LockButton
	locked={isLocked}
	onToggle={() => (isLocked ? designSystem.unlock(prop) : designSystem.lock(prop))}
	class={className}
/>
