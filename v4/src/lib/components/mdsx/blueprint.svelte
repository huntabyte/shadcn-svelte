<script module>
	export {
		a,
		blockquote,
		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		hr,
		img,
		li,
		ol,
		p,
		pre,
		strong,
		table,
		td,
		th,
		tr,
		ul,
		figcaption,
	} from "./index.js";
</script>

<script lang="ts">
	type Props = {
		title: string;
		description: string;
		source: string;
		component: string;
	};
	let { title, description, source, component }: Props = $props();
</script>

<div class="mdsx">
	<!-- eslint-disable-next-line svelte/no-unused-svelte-ignore -->
	<!-- svelte-ignore slot_element_deprecated -->
	<slot {title} {description} {source} {component} />
</div>
