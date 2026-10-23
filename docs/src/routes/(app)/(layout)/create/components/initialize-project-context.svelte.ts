import { Context } from "runed";

export class InitializeProjectContext {
	open = $state(false);
}

export const InitializeProjectCtx = new Context<InitializeProjectContext>("initialize-project-ctx");
