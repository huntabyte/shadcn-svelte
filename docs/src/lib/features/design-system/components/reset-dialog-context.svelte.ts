import { Context } from "runed";

export class ResetDialogContext {
	open = $state(false);
}

export const ResetDialogCtx = new Context<ResetDialogContext>("reset-dialog-ctx");
