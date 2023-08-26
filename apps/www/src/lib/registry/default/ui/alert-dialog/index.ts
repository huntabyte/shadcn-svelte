import { AlertDialog as AlertDialogPrimitive } from "bits-ui";

const Root = AlertDialogPrimitive.Root;
const Trigger = AlertDialogPrimitive.Trigger;

import Title from "./alert-dialog-title.svelte";
import Action from "./alert-dialog-action.svelte";
import Cancel from "./alert-dialog-cancel.svelte";
import Portal from "./alert-dialog-portal.svelte";
import Footer from "./alert-dialog-footer.svelte";
import Header from "./alert-dialog-header.svelte";
import Overlay from "./alert-dialog-overlay.svelte";
import Content from "./alert-dialog-content.svelte";
import Description from "./alert-dialog-description.svelte";

export {
	Root,
	Title,
	Action,
	Cancel,
	Portal,
	Footer,
	Header,
	Trigger,
	Overlay,
	Content,
	Description,
	//
	Root as AlertDialog,
	Title as AlertDialogTitle,
	Action as AlertDialogAction,
	Cancel as AlertDialogCancel,
	Portal as AlertDialogPortal,
	Footer as AlertDialogFooter,
	Header as AlertDialogHeader,
	Trigger as AlertDialogTrigger,
	Overlay as AlertDialogOverlay,
	Content as AlertDialogContent,
	Description as AlertDialogDescription
};
