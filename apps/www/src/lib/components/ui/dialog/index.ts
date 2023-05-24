import DialogContent from "./DialogContent.svelte";
import DialogDescription from "./DialogDescription.svelte";
import DialogFooter from "./DialogFooter.svelte";
import DialogHeader from "./DialogHeader.svelte";
import DialogOverlay from "./DialogOverlay.svelte";
import DialogPortal from "./DialogPortal.svelte";
import DialogTitle from "./DialogTitle.svelte";
import { Dialog as DialogPrimitive } from "radix-svelte";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
};
