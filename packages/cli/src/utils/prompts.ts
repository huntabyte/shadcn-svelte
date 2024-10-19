import process from "node:process";
import type { State } from "@clack/core";
import {
	ConfirmPrompt,
	GroupMultiSelectPrompt,
	MultiSelectPrompt,
	PasswordPrompt,
	SelectKeyPrompt,
	SelectPrompt,
	TextPrompt,
	block,
	isCancel,
} from "@clack/core";
import isUnicodeSupported from "is-unicode-supported";
import color from "chalk";
import { cursor, erase } from "sisteransi";

export { isCancel } from "@clack/core";

const unicode = isUnicodeSupported();
const s = (c: string, fallback: string) => (unicode ? c : fallback);
const S_STEP_ACTIVE = s("◆", "*");
const S_STEP_CANCEL = s("■", "x");
const S_STEP_ERROR = s("▲", "x");
const S_STEP_SUBMIT = s("◇", "o");

const S_BAR_START = s("┌", "T");
const S_BAR = s("│", "|");
const S_BAR_END = s("└", "—");

const S_RADIO_ACTIVE = s("●", ">");
const S_RADIO_INACTIVE = s("○", " ");
const S_CHECKBOX_ACTIVE = s("◻", "[•]");
const S_CHECKBOX_SELECTED = s("◼", "[+]");
const S_CHECKBOX_INACTIVE = s("◻", "[ ]");
const S_PASSWORD_MASK = s("▪", "•");

const S_BAR_H = s("─", "-");
const S_CORNER_TOP_RIGHT = s("╮", "+");
const S_CONNECT_LEFT = s("├", "+");
const S_CORNER_BOTTOM_RIGHT = s("╯", "+");

const S_INFO = s("●", "•");
const S_SUCCESS = s("◆", "*");
const S_WARN = s("▲", "!");
const S_ERROR = s("■", "x");

function symbol(state: State) {
	switch (state) {
		case "initial":
		case "active":
			return color.cyan(S_STEP_ACTIVE);
		case "cancel":
			return color.red(S_STEP_CANCEL);
		case "error":
			return color.yellow(S_STEP_ERROR);
		case "submit":
			return color.green(S_STEP_SUBMIT);
	}
}

type LimitOptionsParams<TOption> = {
	options: TOption[];
	maxItems: number | undefined;
	cursor: number;
	style: (option: TOption, active: boolean) => string;
};

function limitOptions<TOption>(params: LimitOptionsParams<TOption>): string[] {
	const { cursor, options, style } = params;

	// We clamp to minimum 5 because anything less doesn't make sense UX wise
	const maxItems =
		params.maxItems === undefined ? Number.POSITIVE_INFINITY : Math.max(params.maxItems, 5);
	let slidingWindowLocation = 0;

	if (cursor >= slidingWindowLocation + maxItems - 3) {
		slidingWindowLocation = Math.max(
			Math.min(cursor - maxItems + 3, options.length - maxItems),
			0
		);
	} else if (cursor < slidingWindowLocation + 2) {
		slidingWindowLocation = Math.max(cursor - 2, 0);
	}

	const shouldRenderTopEllipsis = maxItems < options.length && slidingWindowLocation > 0;
	const shouldRenderBottomEllipsis =
		maxItems < options.length && slidingWindowLocation + maxItems < options.length;

	return options
		.slice(slidingWindowLocation, slidingWindowLocation + maxItems)
		.map((option, i, arr) => {
			const isTopLimit = i === 0 && shouldRenderTopEllipsis;
			const isBottomLimit = i === arr.length - 1 && shouldRenderBottomEllipsis;
			return isTopLimit || isBottomLimit
				? color.dim("...")
				: style(option, i + slidingWindowLocation === cursor);
		});
}

export type TextOptions = {
	message: string;
	placeholder?: string;
	defaultValue?: string;
	initialValue?: string;
	validate?: (value: string) => string | void;
};
export function text(opts: TextOptions) {
	return new TextPrompt({
		validate: opts.validate,
		placeholder: opts.placeholder,
		defaultValue: opts.defaultValue,
		initialValue: opts.initialValue,
		render() {
			const title = `${color.gray(S_BAR)}\n${symbol(this.state)}  ${opts.message}\n`;
			const placeholder = opts.placeholder
				? color.inverse(opts.placeholder[0]) + color.dim(opts.placeholder.slice(1))
				: color.inverse(color.hidden("_"));
			const value = !this.value ? placeholder : this.valueWithCursor;

			switch (this.state) {
				case "error":
					return `${title.trim()}\n${color.yellow(S_BAR)}  ${value}\n${color.yellow(
						S_BAR_END
					)}  ${color.yellow(this.error)}\n`;
				case "submit":
					return `${title}${color.gray(S_BAR)}  ${color.dim(this.value || opts.placeholder)}`;
				case "cancel":
					return `${title}${color.gray(S_BAR)}  ${color.strikethrough(
						color.dim(this.value ?? "")
					)}${this.value?.trim() ? `\n${color.gray(S_BAR)}` : ""}`;
				default:
					return `${title}${color.cyan(S_BAR)}  ${value}\n${color.cyan(S_BAR_END)}\n`;
			}
		},
	}).prompt() as Promise<string | symbol>;
}

export type PasswordOptions = {
	message: string;
	mask?: string;
	validate?: (value: string) => string | void;
};
export function password(opts: PasswordOptions) {
	return new PasswordPrompt({
		validate: opts.validate,
		mask: opts.mask ?? S_PASSWORD_MASK,
		render() {
			const title = `${color.gray(S_BAR)}\n${symbol(this.state)}  ${opts.message}\n`;
			const value = this.valueWithCursor;
			const masked = this.masked;

			switch (this.state) {
				case "error":
					return `${title.trim()}\n${color.yellow(S_BAR)}  ${masked}\n${color.yellow(
						S_BAR_END
					)}  ${color.yellow(this.error)}\n`;
				case "submit":
					return `${title}${color.gray(S_BAR)}  ${color.dim(masked)}`;
				case "cancel":
					return `${title}${color.gray(S_BAR)}  ${color.strikethrough(color.dim(masked ?? ""))}${
						masked ? `\n${color.gray(S_BAR)}` : ""
					}`;
				default:
					return `${title}${color.cyan(S_BAR)}  ${value}\n${color.cyan(S_BAR_END)}\n`;
			}
		},
	}).prompt() as Promise<string | symbol>;
}

export type ConfirmOptions = {
	message: string;
	active?: string;
	inactive?: string;
	initialValue?: boolean;
};
export function confirm(opts: ConfirmOptions) {
	const active = opts.active ?? "Yes";
	const inactive = opts.inactive ?? "No";
	return new ConfirmPrompt({
		active,
		inactive,
		initialValue: opts.initialValue ?? true,
		render() {
			const title = `${color.gray(S_BAR)}\n${symbol(this.state)}  ${opts.message}\n`;
			const value = this.value ? active : inactive;

			switch (this.state) {
				case "submit":
					return `${title}${color.gray(S_BAR)}  ${color.dim(value)}`;
				case "cancel":
					return `${title}${color.gray(S_BAR)}  ${color.strikethrough(
						color.dim(value)
					)}\n${color.gray(S_BAR)}`;
				default: {
					return `${title}${color.cyan(S_BAR)}  ${
						this.value
							? `${color.green(S_RADIO_ACTIVE)} ${active}`
							: `${color.dim(S_RADIO_INACTIVE)} ${color.dim(active)}`
					} ${color.dim("/")} ${
						!this.value
							? `${color.green(S_RADIO_ACTIVE)} ${inactive}`
							: `${color.dim(S_RADIO_INACTIVE)} ${color.dim(inactive)}`
					}\n${color.cyan(S_BAR_END)}\n`;
				}
			}
		},
	}).prompt() as Promise<boolean | symbol>;
}

type Primitive = Readonly<string | boolean | number>;

type Option<Value> = Value extends Primitive
	? { value: Value; label?: string; hint?: string }
	: { value: Value; label: string; hint?: string };

export type SelectOptions<Value> = {
	message: string;
	options: Option<Value>[];
	initialValue?: Value;
	maxItems?: number;
};

export function select<Value>(opts: SelectOptions<Value>) {
	const opt = (
		option: Option<Value>,
		state: "inactive" | "active" | "selected" | "cancelled"
	) => {
		const label = option.label ?? String(option.value);
		switch (state) {
			case "selected":
				return `${color.dim(label)}`;
			case "active":
				return `${color.green(S_RADIO_ACTIVE)} ${label} ${
					option.hint ? color.dim(`(${option.hint})`) : ""
				}`;
			case "cancelled":
				return `${color.strikethrough(color.dim(label))}`;
			default:
				return `${color.dim(S_RADIO_INACTIVE)} ${color.dim(label)}`;
		}
	};

	return new SelectPrompt({
		options: opts.options,
		initialValue: opts.initialValue,
		render() {
			const title = `${color.gray(S_BAR)}\n${symbol(this.state)}  ${opts.message}\n`;

			switch (this.state) {
				case "submit":
					return `${title}${color.gray(S_BAR)}  ${opt(this.options[this.cursor]!, "selected")}`;
				case "cancel":
					return `${title}${color.gray(S_BAR)}  ${opt(
						this.options[this.cursor]!,
						"cancelled"
					)}\n${color.gray(S_BAR)}`;
				default: {
					return `${title}${color.cyan(S_BAR)}  ${limitOptions({
						cursor: this.cursor,
						options: this.options,
						maxItems: opts.maxItems,
						style: (item, active) => opt(item, active ? "active" : "inactive"),
					}).join(`\n${color.cyan(S_BAR)}  `)}\n${color.cyan(S_BAR_END)}\n`;
				}
			}
		},
	}).prompt() as Promise<Value | symbol>;
}

export function selectKey<Value extends string>(opts: SelectOptions<Value>) {
	const opt = (
		option: Option<Value>,
		state: "inactive" | "active" | "selected" | "cancelled" = "inactive"
	) => {
		const label = option.label ?? String(option.value);
		if (state === "selected") {
			return `${color.dim(label)}`;
		} else if (state === "cancelled") {
			return `${color.strikethrough(color.dim(label))}`;
		} else if (state === "active") {
			return `${color.bgCyan(color.gray(` ${option.value} `))} ${label} ${
				option.hint ? color.dim(`(${option.hint})`) : ""
			}`;
		}
		return `${color.gray(color.bgWhite(color.inverse(` ${option.value} `)))} ${label} ${
			option.hint ? color.dim(`(${option.hint})`) : ""
		}`;
	};

	return new SelectKeyPrompt({
		options: opts.options,
		initialValue: opts.initialValue,
		render() {
			const title = `${color.gray(S_BAR)}\n${symbol(this.state)}  ${opts.message}\n`;

			switch (this.state) {
				case "submit":
					return `${title}${color.gray(S_BAR)}  ${opt(
						this.options.find((opt) => opt.value === this.value)!,
						"selected"
					)}`;
				case "cancel":
					return `${title}${color.gray(S_BAR)}  ${opt(this.options[0]!, "cancelled")}\n${color.gray(
						S_BAR
					)}`;
				default: {
					return `${title}${color.cyan(S_BAR)}  ${this.options
						.map((option, i) => opt(option, i === this.cursor ? "active" : "inactive"))
						.join(`\n${color.cyan(S_BAR)}  `)}\n${color.cyan(S_BAR_END)}\n`;
				}
			}
		},
	}).prompt() as Promise<Value | symbol>;
}

export type MultiSelectOptions<Value> = {
	message: string;
	options: Option<Value>[];
	initialValues?: Value[];
	maxItems?: number;
	required?: boolean;
	cursorAt?: Value;
};
export function multiselect<Value>(opts: MultiSelectOptions<Value>) {
	const opt = (
		option: Option<Value>,
		state: "inactive" | "active" | "selected" | "active-selected" | "submitted" | "cancelled"
	) => {
		const label = option.label ?? String(option.value);
		if (state === "active") {
			return `${color.cyan(S_CHECKBOX_ACTIVE)} ${label} ${
				option.hint ? color.dim(`(${option.hint})`) : ""
			}`;
		} else if (state === "selected") {
			return `${color.green(S_CHECKBOX_SELECTED)} ${color.dim(label)}`;
		} else if (state === "cancelled") {
			return `${color.strikethrough(color.dim(label))}`;
		} else if (state === "active-selected") {
			return `${color.green(S_CHECKBOX_SELECTED)} ${label} ${
				option.hint ? color.dim(`(${option.hint})`) : ""
			}`;
		} else if (state === "submitted") {
			return `${color.dim(label)}`;
		}
		return `${color.dim(S_CHECKBOX_INACTIVE)} ${color.dim(label)}`;
	};

	return new MultiSelectPrompt({
		options: opts.options,
		initialValues: opts.initialValues,
		required: opts.required ?? true,
		cursorAt: opts.cursorAt,
		validate(selected: Value[]) {
			if (this.required && selected.length === 0)
				return `Please select at least one option.\n${color.reset(
					color.dim(
						`Press ${color.gray(color.bgWhite(color.inverse(" space ")))} to select, ${color.gray(
							color.bgWhite(color.inverse(" enter "))
						)} to submit`
					)
				)}`;
		},
		render() {
			const title = `${color.gray(S_BAR)}\n${symbol(this.state)}  ${opts.message}\n`;

			const styleOption = (option: Option<Value>, active: boolean) => {
				const selected = this.value.includes(option.value);
				if (active && selected) {
					return opt(option, "active-selected");
				}
				if (selected) {
					return opt(option, "selected");
				}
				return opt(option, active ? "active" : "inactive");
			};

			switch (this.state) {
				case "submit": {
					return `${title}${color.gray(S_BAR)}  ${
						this.options
							.filter(({ value }) => this.value.includes(value))
							.map((option) => opt(option, "submitted"))
							.join(color.dim(", ")) || color.dim("none")
					}`;
				}
				case "cancel": {
					const label = this.options
						.filter(({ value }) => this.value.includes(value))
						.map((option) => opt(option, "cancelled"))
						.join(color.dim(", "));
					return `${title}${color.gray(S_BAR)}  ${
						label.trim() ? `${label}\n${color.gray(S_BAR)}` : ""
					}`;
				}
				case "error": {
					const footer = this.error
						.split("\n")
						.map((ln, i) =>
							i === 0 ? `${color.yellow(S_BAR_END)}  ${color.yellow(ln)}` : `   ${ln}`
						)
						.join("\n");
					return `${title + color.yellow(S_BAR)}  ${limitOptions({
						options: this.options,
						cursor: this.cursor,
						maxItems: opts.maxItems,
						style: styleOption,
					}).join(`\n${color.yellow(S_BAR)}  `)}\n${footer}\n`;
				}
				default: {
					return `${title}${color.cyan(S_BAR)}  ${limitOptions({
						options: this.options,
						cursor: this.cursor,
						maxItems: opts.maxItems,
						style: styleOption,
					}).join(`\n${color.cyan(S_BAR)}  `)}\n${color.cyan(S_BAR_END)}\n`;
				}
			}
		},
	}).prompt() as Promise<Value[] | symbol>;
}

export type GroupMultiSelectOptions<Value> = {
	message: string;
	options: Record<string, Option<Value>[]>;
	initialValues?: Value[];
	required?: boolean;
	cursorAt?: Value;
};
export function groupMultiselect<Value>(opts: GroupMultiSelectOptions<Value>) {
	const opt = (
		option: Option<Value>,
		state:
			| "inactive"
			| "active"
			| "selected"
			| "active-selected"
			| "group-active"
			| "group-active-selected"
			| "submitted"
			| "cancelled",
		options: Option<Value>[] = []
	) => {
		const label = option.label ?? String(option.value);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const isItem = typeof (option as any).group === "string";
		const next = isItem && (options[options.indexOf(option) + 1] ?? { group: true });
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const isLast = isItem && (next as any).group === true;
		const prefix = isItem ? `${isLast ? S_BAR_END : S_BAR} ` : "";

		if (state === "active") {
			return `${color.dim(prefix)}${color.cyan(S_CHECKBOX_ACTIVE)} ${label} ${
				option.hint ? color.dim(`(${option.hint})`) : ""
			}`;
		} else if (state === "group-active") {
			return `${prefix}${color.cyan(S_CHECKBOX_ACTIVE)} ${color.dim(label)}`;
		} else if (state === "group-active-selected") {
			return `${prefix}${color.green(S_CHECKBOX_SELECTED)} ${color.dim(label)}`;
		} else if (state === "selected") {
			return `${color.dim(prefix)}${color.green(S_CHECKBOX_SELECTED)} ${color.dim(label)}`;
		} else if (state === "cancelled") {
			return `${color.strikethrough(color.dim(label))}`;
		} else if (state === "active-selected") {
			return `${color.dim(prefix)}${color.green(S_CHECKBOX_SELECTED)} ${label} ${
				option.hint ? color.dim(`(${option.hint})`) : ""
			}`;
		} else if (state === "submitted") {
			return `${color.dim(label)}`;
		}
		return `${color.dim(prefix)}${color.dim(S_CHECKBOX_INACTIVE)} ${color.dim(label)}`;
	};

	return new GroupMultiSelectPrompt({
		options: opts.options,
		initialValues: opts.initialValues,
		required: opts.required ?? true,
		cursorAt: opts.cursorAt,
		validate(selected: Value[]) {
			if (this.required && selected.length === 0)
				return `Please select at least one option.\n${color.reset(
					color.dim(
						`Press ${color.gray(color.bgWhite(color.inverse(" space ")))} to select, ${color.gray(
							color.bgWhite(color.inverse(" enter "))
						)} to submit`
					)
				)}`;
		},
		render() {
			const title = `${color.gray(S_BAR)}\n${symbol(this.state)}  ${opts.message}\n`;

			switch (this.state) {
				case "submit": {
					return `${title}${color.gray(S_BAR)}  ${this.options
						.filter(({ value }) => this.value.includes(value))
						.map((option) => opt(option, "submitted"))
						.join(color.dim(", "))}`;
				}
				case "cancel": {
					const label = this.options
						.filter(({ value }) => this.value.includes(value))
						.map((option) => opt(option, "cancelled"))
						.join(color.dim(", "));
					return `${title}${color.gray(S_BAR)}  ${
						label.trim() ? `${label}\n${color.gray(S_BAR)}` : ""
					}`;
				}
				case "error": {
					const footer = this.error
						.split("\n")
						.map((ln, i) =>
							i === 0 ? `${color.yellow(S_BAR_END)}  ${color.yellow(ln)}` : `   ${ln}`
						)
						.join("\n");
					return `${title}${color.yellow(S_BAR)}  ${this.options
						.map((option, i, options) => {
							const selected =
								this.value.includes(option.value) ||
								(option.group === true && this.isGroupSelected(`${option.value}`));
							const active = i === this.cursor;
							const groupActive =
								!active &&
								typeof option.group === "string" &&
								this.options[this.cursor]!.value === option.group;
							if (groupActive) {
								return opt(
									option,
									selected ? "group-active-selected" : "group-active",
									options
								);
							}
							if (active && selected) {
								return opt(option, "active-selected", options);
							}
							if (selected) {
								return opt(option, "selected", options);
							}
							return opt(option, active ? "active" : "inactive", options);
						})
						.join(`\n${color.yellow(S_BAR)}  `)}\n${footer}\n`;
				}
				default: {
					return `${title}${color.cyan(S_BAR)}  ${this.options
						.map((option, i, options) => {
							const selected =
								this.value.includes(option.value) ||
								(option.group === true && this.isGroupSelected(`${option.value}`));
							const active = i === this.cursor;
							const groupActive =
								!active &&
								typeof option.group === "string" &&
								this.options[this.cursor]!.value === option.group;
							if (groupActive) {
								return opt(
									option,
									selected ? "group-active-selected" : "group-active",
									options
								);
							}
							if (active && selected) {
								return opt(option, "active-selected", options);
							}
							if (selected) {
								return opt(option, "selected", options);
							}
							return opt(option, active ? "active" : "inactive", options);
						})
						.join(`\n${color.cyan(S_BAR)}  `)}\n${color.cyan(S_BAR_END)}\n`;
				}
			}
		},
	}).prompt() as Promise<Value[] | symbol>;
}

const strip = (str: string) => str.replace(ansiRegex(), "");
export function note(message = "", title = "") {
	const lines = `\n${message}\n`.split("\n");
	const titleLen = strip(title).length;
	const len =
		Math.max(
			lines.reduce((sum, ln) => {
				ln = strip(ln);
				return ln.length > sum ? ln.length : sum;
			}, 0),
			titleLen
		) + 2;
	const msg = lines
		.map(
			(ln) =>
				`${color.gray(S_BAR)}  ${color.dim(ln)}${" ".repeat(len - strip(ln).length)}${color.gray(
					S_BAR
				)}`
		)
		.join("\n");
	process.stdout.write(
		`${color.gray(S_BAR)}\n${color.green(S_STEP_SUBMIT)}  ${color.reset(title)} ${color.gray(
			S_BAR_H.repeat(Math.max(len - titleLen - 1, 1)) + S_CORNER_TOP_RIGHT
		)}\n${msg}\n${color.gray(S_CONNECT_LEFT + S_BAR_H.repeat(len + 2) + S_CORNER_BOTTOM_RIGHT)}\n`
	);
}

export function cancel(message = "") {
	process.stdout.write(`${color.gray(S_BAR_END)}  ${color.red(message)}\n\n`);
}

export function intro(title = "") {
	process.stdout.write(`${color.gray(S_BAR_START)}  ${title}\n`);
}

export function outro(message = "") {
	process.stdout.write(`${color.gray(S_BAR)}\n${color.gray(S_BAR_END)}  ${message}\n\n`);
}

export type LogMessageOptions = {
	symbol?: string;
};
export const log = {
	message: (message = "", { symbol = color.gray(S_BAR) }: LogMessageOptions = {}) => {
		const parts = [`${color.gray(S_BAR)}`];
		if (message) {
			const [firstLine, ...lines] = message.split("\n");
			parts.push(
				`${symbol}  ${firstLine}`,
				...lines.map((ln) => `${color.gray(S_BAR)}  ${ln}`)
			);
		}
		process.stdout.write(`${parts.join("\n")}\n`);
	},
	info: (message: string) => {
		log.message(message, { symbol: color.blue(S_INFO) });
	},
	success: (message: string) => {
		log.message(message, { symbol: color.green(S_SUCCESS) });
	},
	step: (message: string) => {
		log.message(message, { symbol: color.green(S_STEP_SUBMIT) });
	},
	warn: (message: string) => {
		log.message(message, { symbol: color.yellow(S_WARN) });
	},
	/** alias for `log.warn()`. */
	warning: (message: string) => {
		log.warn(message);
	},
	error: (message: string) => {
		log.message(message, { symbol: color.red(S_ERROR) });
	},
};

export function spinner() {
	const frames = unicode ? ["◒", "◐", "◓", "◑"] : ["•", "o", "O", "0"];
	const delay = unicode ? 80 : 120;

	let unblock: () => void;
	let loop: NodeJS.Timeout;
	let isSpinnerActive: boolean = false;
	let _message: string = "";

	function handleExit(code: number) {
		const msg = code > 1 ? "Something went wrong" : "Canceled";
		if (isSpinnerActive) stop(msg, code);
	}

	const errorEventHandler = () => handleExit(2);
	const signalEventHandler = () => handleExit(1);

	function registerHooks() {
		// Reference: https://nodejs.org/api/process.html#event-uncaughtexception
		process.on("uncaughtExceptionMonitor", errorEventHandler);
		// Reference: https://nodejs.org/api/process.html#event-unhandledrejection
		process.on("unhandledRejection", errorEventHandler);
		// Reference Signal Events: https://nodejs.org/api/process.html#signal-events
		process.on("SIGINT", signalEventHandler);
		process.on("SIGTERM", signalEventHandler);
		// process.on("exit", handleExit);
	}

	function clearHooks() {
		process.removeListener("uncaughtExceptionMonitor", errorEventHandler);
		process.removeListener("unhandledRejection", errorEventHandler);
		process.removeListener("SIGINT", signalEventHandler);
		process.removeListener("SIGTERM", signalEventHandler);
		// process.removeListener("exit", handleExit);
	}

	function start(msg: string = ""): void {
		isSpinnerActive = true;
		unblock = block();
		_message = msg.replace(/\.+$/, "");
		process.stdout.write(`${color.gray(S_BAR)}\n`);
		let frameIndex = 0;
		let dotsTimer = 0;
		registerHooks();
		loop = setInterval(() => {
			const frame = color.magenta(frames[frameIndex]);
			const loadingDots = ".".repeat(Math.floor(dotsTimer)).slice(0, 3);
			process.stdout.write(cursor.move(-999, 0));
			process.stdout.write(erase.down(1));
			process.stdout.write(`${frame}  ${_message}${loadingDots}`);
			frameIndex = frameIndex + 1 < frames.length ? frameIndex + 1 : 0;
			dotsTimer = dotsTimer < frames.length ? dotsTimer + 0.125 : 0;
		}, delay);
	}

	function stop(msg: string = "", code: number = 0): void {
		_message = msg ?? _message;
		isSpinnerActive = false;
		clearInterval(loop);
		const step =
			code === 0
				? color.green(S_STEP_SUBMIT)
				: code === 1
					? color.red(S_STEP_CANCEL)
					: color.red(S_STEP_ERROR);
		process.stdout.write(cursor.move(-999, 0));
		process.stdout.write(erase.down(1));
		process.stdout.write(`${step}  ${_message}\n`);
		clearHooks();
		unblock();
	}

	const message = (msg: string = ""): void => {
		_message = msg ?? _message;
	};

	return {
		start,
		stop,
		message,
	};
}

// Adapted from https://github.com/chalk/ansi-regex
// @see LICENSE
function ansiRegex() {
	const pattern = [
		"[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
		"(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))",
	].join("|");

	return new RegExp(pattern, "g");
}

export type PromptGroupAwaitedReturn<T> = {
	[P in keyof T]: Exclude<Awaited<T[P]>, symbol>;
};

export type PromptGroupOptions<T> = {
	/**
	 * Control how the group can be canceled
	 * if one of the prompts is canceled.
	 */
	onCancel?: (opts: { results: Prettify<Partial<PromptGroupAwaitedReturn<T>>> }) => void;
};

type Prettify<T> = {
	[P in keyof T]: T[P];
} & {};

export type PromptGroup<T> = {
	[P in keyof T]: (opts: {
		results: Prettify<Partial<PromptGroupAwaitedReturn<Omit<T, P>>>>;
	}) => void | Promise<T[P] | void>;
};

/**
 * Define a group of prompts to be displayed
 * and return a results of objects within the group
 */
export async function group<T>(
	prompts: PromptGroup<T>,
	opts?: PromptGroupOptions<T>
): Promise<Prettify<PromptGroupAwaitedReturn<T>>> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const results = {} as any;
	const promptNames = Object.keys(prompts);

	for (const name of promptNames) {
		const prompt = prompts[name as keyof T];
		const result = await prompt({ results })?.catch((e) => {
			throw e;
		});

		// Pass the results to the onCancel function
		// so the user can decide what to do with the results
		// TODO: Switch to callback within core to avoid isCancel Fn
		if (typeof opts?.onCancel === "function" && isCancel(result)) {
			results[name] = "canceled";
			opts.onCancel({ results });
			continue;
		}

		results[name] = result;
	}

	return results;
}

export type Task = {
	/**
	 * Task title
	 */
	title: string;
	/**
	 * Task function
	 */
	task: (message: (string: string) => void) => string | Promise<string> | void | Promise<void>;

	/**
	 * If enabled === false the task will be skipped
	 */
	enabled?: boolean;
};

/**
 * Define a group of tasks to be executed
 */
export async function tasks(tasks: Task[]) {
	for (const task of tasks) {
		if (task.enabled === false) continue;

		const s = spinner();
		s.start(task.title);
		const result = await task.task(s.message);
		s.stop(result || task.title);
	}
}
