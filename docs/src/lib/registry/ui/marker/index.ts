import Content from "./marker-content.svelte";
import Icon from "./marker-icon.svelte";
import Root, { markerVariants, type MarkerVariant } from "./marker.svelte";

export {
	Root,
	Icon,
	Content,
	markerVariants,
	type MarkerVariant,
	//
	Root as Marker,
	Icon as MarkerIcon,
	Content as MarkerContent,
};
