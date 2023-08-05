import Root from "./components/Dialog.svelte";
import Title from "./components/DialogTitle.svelte";
import Close from "./components/DialogClose.svelte";
import Portal from "./components/DialogPortal.svelte";
import Content from "./components/DialogContent.svelte";
import Overlay from "./components/DialogOverlay.svelte";
import Trigger from "./components/DialogTrigger.svelte";
import Description from "./components/DialogDescription.svelte";

export {
	Root,
	Title,
	Close,
	Portal,
	Content,
	Overlay,
	Trigger,
	Description,

	//
	Root as Dialog,
	Title as DialogTitle,
	Close as DialogClose,
	Portal as DialogPortal,
	Content as DialogContent,
	Overlay as DialogOverlay,
	Trigger as DialogTrigger,
	Description as DialogDescription
};

export * from "./types";
