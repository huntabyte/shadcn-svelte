import {
	createAvatar,
	type Avatar as AvatarReturn,
	type CreateAvatarProps,
	melt
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";
import { default as Root } from "./Avatar.svelte";
import { default as Fallback } from "./AvatarFallback.svelte";
import { default as Image } from "./AvatarImage.svelte";

const NAME = "avatar";

function get() {
	return getContext<AvatarReturn>(NAME);
}

function set(props: CreateAvatar) {
	setContext(NAME, createAvatar({ ...props, src: "" }));
}

function getImage(srcProp: string = "") {
	const {
		elements: { image },
		options: { src }
	} = get();
	src.set(srcProp);
	return image;
}

export const ctx = {
	set,
	get,
	getImage: getImage,
	getFallback: () => get().elements.fallback
};

export const Avatar = Object.assign(Root, {
	Fallback,
	Image
});

export { Root as AvatarRoot };
export { Image as AvatarImage };
export { Fallback as AvatarFallback };

export { melt };

export type CreateAvatar = Omit<CreateAvatarProps, "src">;
