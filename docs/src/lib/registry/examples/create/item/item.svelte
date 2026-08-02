<script lang="ts">
	import ItemAsChild from "./item-as-child.svelte";
	import ItemFooter from "./item-footer.svelte";
	import ItemGroup from "./item-group.svelte";
	import ItemHeaderAndFooter from "./item-header-and-footer.svelte";
	import ItemHeader from "./item-header.svelte";
	import ItemMutedGroup from "./item-muted-group.svelte";
	import ItemMutedImage from "./item-muted-image.svelte";
	import ItemMutedLink from "./item-muted-link.svelte";
	import ItemOutlineGroup from "./item-outline-group.svelte";
	import ItemOutlineImageExtraSmall from "./item-outline-image-extra-small.svelte";
	import ItemOutlineImageSmall from "./item-outline-image-small.svelte";
	import ItemOutlineImage from "./item-outline-image.svelte";
	import ItemOutlineLink from "./item-outline-link.svelte";
	import ItemSeparator from "./item-separator.svelte";
	import ItemVariants from "./item-variants.svelte";
	import ItemWithImage from "./item-with-image.svelte";
	import ExampleWrapper from "../../../../../routes/(app)/(layout)/(create)/components/example-wrapper.svelte";
</script>

<ExampleWrapper>
	<ItemVariants />
	<ItemAsChild />
	<ItemOutlineLink />
	<ItemMutedLink />
	<ItemGroup />
	<ItemOutlineGroup />
	<ItemMutedGroup />
	<ItemSeparator />
	<ItemHeader />
	<ItemFooter />
	<ItemHeaderAndFooter />
	<ItemWithImage />
	<ItemOutlineImage />
	<ItemOutlineImageSmall />
	<ItemOutlineImageExtraSmall />
	<ItemMutedImage />
</ExampleWrapper>
