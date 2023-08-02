import {
	createAvatar,
	type Avatar,
	type CreateAvatarProps
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";

export { default as Avatar } from "./Avatar.svelte";
export { default as AvatarFallback } from "./AvatarFallback.svelte";
export { default as AvatarImage } from "./AvatarImage.svelte";

const NAME = "avatar";

export const ctx = {
	set: setAvatar,
	getImage: () => getContext<Avatar>(NAME).elements.image,
	getFallback: () => getContext<Avatar>(NAME).elements.fallback
};

function setAvatar(props: CreateAvatarProps) {
	const avatar = createAvatar({ ...props });
	setContext(NAME, avatar);
}
