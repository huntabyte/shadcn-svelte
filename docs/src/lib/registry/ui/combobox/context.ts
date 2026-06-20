export const COMBOBOX_CONTEXT = Symbol("COMBOBOX_CONTEXT");

export type ComboboxContext = {
	setOpen: (open: boolean) => void;
};
