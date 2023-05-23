import { AlertDialog as AlertDialogPrimitive } from "radix-svelte";
import AlertDialogAction from "./AlertDialogAction.svelte";
import AlertDialogCancel from "./AlertDialogCancel.svelte";
import AlertDialogContent from "./AlertDialogContent.svelte";
import AlertDialogDescription from "./AlertDialogDescription.svelte";
import AlertDialogFooter from "./AlertDialogFooter.svelte";
import AlertDialogHeader from "./AlertDialogHeader.svelte";
import AlertDialogTitle from "./AlertDialogTitle.svelte";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
};
