import Root from "./components/AlertDialog.svelte";
import Title from "./components/AlertDialogTitle.svelte";
import Action from "./components/AlertDialogAction.svelte";
import Cancel from "./components/AlertDialogCancel.svelte";
import Portal from "./components/AlertDialogPortal.svelte";
import Content from "./components/AlertDialogContent.svelte";
import Overlay from "./components/AlertDialogOverlay.svelte";
import Trigger from "./components/AlertDialogTrigger.svelte";
import Description from "./components/AlertDialogDescription.svelte";

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
