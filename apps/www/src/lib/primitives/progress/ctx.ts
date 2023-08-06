import { createProgress, type CreateProgressProps } from "@melt-ui/svelte";
import { getOptionUpdater, removeUndefined } from "../internal/helpers";

export const ctx = {
	set
};

function set(props: CreateProgressProps) {
	const progress = createProgress(removeUndefined(props));

	return {
		...progress,
		updateOption: getOptionUpdater(progress.options)
	};
}
