import { AlertDialog as AlertDialogPrimitive } from "@huntabyte/primitives";

const Root = AlertDialogPrimitive.Root;
const Trigger = AlertDialogPrimitive.Trigger;

import Title from "./AlertDialogTitle.svelte";
import Action from "./AlertDialogAction.svelte";
import Cancel from "./AlertDialogCancel.svelte";
import Portal from "./AlertDialogPortal.svelte";
import Footer from "./AlertDialogFooter.svelte";
import Header from "./AlertDialogHeader.svelte";
import Overlay from "./AlertDialogOverlay.svelte";
import Content from "./AlertDialogContent.svelte";
import Description from "./AlertDialogDescription.svelte";

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
