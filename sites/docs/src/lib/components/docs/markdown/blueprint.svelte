<script module>
	import "../../../../styles/markdown.pcss";
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
		table,
		td,
		th,
		tr,
		ul,
	} from "$lib/components/docs/markdown/index.js";
</script>

<script lang="ts">
	type Props = {
		title: string;
		description: string;
		source: string;
		component: string;
		radix: string;
	};
	let { title, description, source, component, radix }: Props = $props();
</script>

<slot {title} {description} {source} {component} {radix} />
