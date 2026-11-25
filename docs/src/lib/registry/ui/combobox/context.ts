export const COMBOBOX_CONTEXT = Symbol("COMBOBOX_CONTEXT");

export type ComboboxContext = {
	anchor: HTMLElement | null;
	disabled: boolean;
	hasValue: boolean;
	clear: () => void;
	setOpen: (open: boolean) => void;
	setAnchor: (anchor: HTMLElement | null) => void;
};
