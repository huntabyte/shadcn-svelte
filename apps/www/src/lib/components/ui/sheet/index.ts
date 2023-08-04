import { cva } from "class-variance-authority";
import {
	createDialog,
	type CreateDialogProps,
	type Dialog as DialogReturn
} from "@melt-ui/svelte";
import { getContext, setContext } from "svelte";

import Root from "./Sheet.svelte";
import Content from "./SheetContent.svelte";
import Close from "./SheetClose.svelte";
import Description from "./SheetDescription.svelte";
import Footer from "./SheetFooter.svelte";
import Header from "./SheetHeader.svelte";
import Overlay from "./SheetOverlay.svelte";
import Portal from "./SheetPortal.svelte";
import Title from "./SheetTitle.svelte";
import Trigger from "./SheetTrigger.svelte";

export const ctx = {
	set,
	get,
	getClose: () => get().elements.close,
	getContent: () => get().elements.content,
	getOverlay: () => get().elements.overlay,
	getPortal,
	getTitle: () => get().elements.title,
	getDescription: () => get().elements.description,
	getTrigger: () => get().elements.trigger
};

const NAME = "Dialog";

function set(props: CreateDialogProps) {
	const Dialog = createDialog({ ...props });
	setContext(NAME, Dialog);
}

function get() {
	return getContext<DialogReturn>(NAME);
}

function getPortal() {
	const {
		elements: { portalled },
		states: { open }
	} = get();
	return { portal: portalled, open };
}
export {
	melt,
	type CreateDialogProps as CreateDialogProps
} from "@melt-ui/svelte";

export const Sheet = Object.assign(Root, {
	Content,
	Close,
	Description,
	Footer,
	Header,
	Overlay,
	Portal,
	Title,
	Trigger
});

export {
	Root as SheetRoot,
	Content as SheetContent,
	Close as SheetClose,
	Description as SheetDescription,
	Footer as SheetFooter,
	Header as SheetHeader,
	Overlay as SheetOverlay,
	Portal as SheetPortal,
	Title as SheetTitle,
	Trigger as SheetTrigger
};

export const sheetVariants = cva(
	"fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
	{
		variants: {
			side: {
				top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
				bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
				left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
				right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
			}
		},
		defaultVariants: {
			side: "right"
		}
	}
);
