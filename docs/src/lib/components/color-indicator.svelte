<script lang="ts">
	interface Props {
		color: string;
	}

	let { color }: Props = $props();
</script>

<span class="border-border/50 inline-block size-3 border" style="background-color: {color}"></span>
