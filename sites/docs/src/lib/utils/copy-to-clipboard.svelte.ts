type CopyToClipboardProps = {
	timeout?: number;
	onCopy?: () => void;
};

export class CopyToClipboard {
	isCopied = $state(false);
	onCopy: CopyToClipboardProps["onCopy"];
	timeout: CopyToClipboardProps["timeout"];

	constructor(props?: CopyToClipboardProps) {
		this.onCopy = props?.onCopy;
		this.timeout = props?.timeout ?? 2000;
	}

	copyToClipboard = (value: string) => {
		if (typeof window === "undefined" || !navigator.clipboard.writeText) {
			return;
		}

		if (!value) return;

		navigator.clipboard.writeText(value).then(() => {
			this.isCopied = true;

			if (this.onCopy) {
				this.onCopy();
			}

			setTimeout(() => {
				this.isCopied = false;
			}, this.timeout);
		}, console.error);
	};
}
