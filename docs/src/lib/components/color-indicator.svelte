<script lang="ts">
	interface Props {
		color: string;
	}

	let { color }: Props = $props();
</script>

<span class="inline-block size-3 border border-border/50" style="background-color: {color}"></span>
