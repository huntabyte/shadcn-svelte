import { Context } from "runed";

export class ActionMenuContext {
	open = $state(false);
}

export const ActionMenuCtx = new Context<ActionMenuContext>("action-menu-ctx");
