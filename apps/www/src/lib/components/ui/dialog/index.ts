import { Dialog as DialogPrimitive } from "@huntabyte/primitives";

const Root = DialogPrimitive.Root;
const Trigger = DialogPrimitive.Trigger;

import Title from "./DialogTitle.svelte";
import Portal from "./DialogPortal.svelte";
import Footer from "./DialogFooter.svelte";
import Header from "./DialogHeader.svelte";
import Overlay from "./DialogOverlay.svelte";
import Content from "./DialogContent.svelte";
import Description from "./DialogDescription.svelte";

export {
	Root,
	Title,
	Portal,
	Footer,
	Header,
	Trigger,
	Overlay,
	Content,
	Description,
	//
	Root as Dialog,
	Title as DialogTitle,
	Portal as DialogPortal,
	Footer as DialogFooter,
	Header as DialogHeader,
	Trigger as DialogTrigger,
	Overlay as DialogOverlay,
	Content as DialogContent,
	Description as DialogDescription
};
