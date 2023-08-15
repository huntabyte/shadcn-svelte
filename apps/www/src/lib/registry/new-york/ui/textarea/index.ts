import Root from "./textarea.svelte";

export type FormTextareaEvent<T extends Event = Event> = T & {
	currentTarget: EventTarget & HTMLTextAreaElement;
};

export {
	Root,
	//
	Root as Textarea
};
