import Root from "./AlertDialog.svelte";
import Title from "./AlertDialogTitle.svelte";
import Action from "./AlertDialogAction.svelte";
import Cancel from "./AlertDialogCancel.svelte";
import Portal from "./AlertDialogPortal.svelte";
import Content from "./AlertDialogContent.svelte";
import Overlay from "./AlertDialogOverlay.svelte";
import Trigger from "./AlertDialogTrigger.svelte";
import Description from "./AlertDialogDescription.svelte";

export {
	Root,
	Title,
	Action,
	Cancel,
	Portal,
	Content,
	Overlay,
	Trigger,
	Description,

	//
	Root as AlertDialog,
	Title as AlertDialogTitle,
	Action as AlertDialogAction,
	Cancel as AlertDialogCancel,
	Portal as AlertDialogPortal,
	Content as AlertDialogContent,
	Overlay as AlertDialogOverlay,
	Trigger as AlertDialogTrigger,
	Description as AlertDialogDescription
};

export * from "./types";
