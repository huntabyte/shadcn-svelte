import { DEV } from "esm-env";
import { flushSync, untrack } from "svelte";
import { attachRef, type ReadableBoxedValues, type WritableBoxedValues } from "svelte-toolbelt";
import { Context } from "runed";
import { boolToEmptyStrOrUndef, boolToTrueOrUndef } from "$lib/internal/attrs.js";
import type { RefAttachment, WithRefOpts } from "$lib/internal/types.js";
import {
	createQuestionnaireCollection,
	getCollectionDefinitionWarnings,
	getCollectionRegistrationWarnings,
	getInitialItemName,
	getShortcutByChoiceValue,
} from "./collection.js";
import type {
	AnswerControlRegistration,
	ItemRegistration,
	PendingFocus,
	QuestionnaireChoiceState,
	QuestionnaireInputState,
	QuestionnaireInputType,
	QuestionnaireItemDefinition,
	QuestionnaireItemState,
	QuestionnaireItemStatus,
	QuestionnaireNavigationState,
	QuestionnaireRootState as QuestionnaireRootViewState,
	QuestionnaireShortcutMode,
} from "./types.js";
import {
	compareAnswerOrder,
	compareItemOrder,
	getAnswerKeyShortcuts,
	getShortcutFromKey,
	getShortcutKeys,
	hasInputValue,
	isAnswerFilled,
	isEmptyNavigableInput,
	isRadioTarget,
	isTextEntryTarget,
} from "./utils.js";

const QuestionnaireRootContext = new Context<QuestionnaireRootState>("Questionnaire.Root");
const QuestionnaireItemContext = new Context<QuestionnaireItemStateClass>("Questionnaire.Item");
const QuestionnaireChoiceContext = new Context<QuestionnaireChoiceStateClass>(
	"Questionnaire.Choice"
);

interface QuestionnaireRootStateOpts
	extends WithRefOpts<{}, HTMLFormElement>,
		ReadableBoxedValues<{
			defaultItem: string | undefined;
			items: readonly QuestionnaireItemDefinition[] | undefined;
			noValidate: boolean;
			onItemChange: ((item: string) => void) | undefined;
			onReset: ((event: Event) => void) | undefined;
			onSubmit: ((event: SubmitEvent) => void) | undefined;
			shortcuts: QuestionnaireShortcutMode | undefined;
		}>,
		WritableBoxedValues<{
			item: string | undefined;
		}> {}

export class QuestionnaireRootState {
	static create(opts: QuestionnaireRootStateOpts) {
		return QuestionnaireRootContext.set(new QuestionnaireRootState(opts));
	}

	static get() {
		return QuestionnaireRootContext.get();
	}

	readonly opts: QuestionnaireRootStateOpts;
	readonly attachment: RefAttachment<HTMLFormElement>;
	registrations = $state.raw<ItemRegistration[]>([]);
	uncontrolledItem = $state<string | null>(null);
	rootElement = $state<HTMLFormElement | null>(null);
	domVersion = $state(0);
	pendingFocus: PendingFocus | null = null;
	previousActiveItemName: string | null | undefined = undefined;
	activeWarnings = new Set<string>();

	constructor(opts: QuestionnaireRootStateOpts) {
		this.opts = opts;
		this.attachment = attachRef(this.opts.ref, (node) => {
			this.rootElement = node as HTMLFormElement | null;
		});
		this.uncontrolledItem = getInitialItemName(this.collection, this.opts.defaultItem.current);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		$effect(() => {
			const node = this.opts.ref.current as HTMLFormElement | null;
			if (this.rootElement !== node) this.rootElement = node;
		});

		$effect(() => {
			const root = this.rootElement;
			if (!root || typeof MutationObserver === "undefined") return;

			let pending = false;
			const observer = new MutationObserver(() => {
				if (pending) return;
				pending = true;
				queueMicrotask(() => {
					pending = false;
					this.domVersion += 1;
				});
			});
			observer.observe(root, { childList: true, subtree: true });
			return () => observer.disconnect();
		});

		$effect(() => {
			if (!DEV) return;
			const collection = this.collection;
			const root = this.rootElement;
			if (!collection || !root) {
				this.activeWarnings.clear();
				return;
			}

			let cancelled = false;
			queueMicrotask(() => {
				if (cancelled) return;
				const warnings = [
					...getCollectionDefinitionWarnings(collection, this.opts.defaultItem.current),
					...getCollectionRegistrationWarnings(collection, this.registrations, this.shortcuts),
				];
				const nextWarnings = new Set(warnings);
				for (const warning of nextWarnings) {
					if (!this.activeWarnings.has(warning)) {
						console.warn(`[Questionnaire] ${warning}`);
					}
				}
				this.activeWarnings = nextWarnings;
			});

			return () => {
				cancelled = true;
			};
		});

		$effect.pre(() => {
			const total = this.total;
			if (total === 0) return;

			const currentIndex = this.currentIndex;
			const activeItemName = this.activeItemName;
			const logicalItems = this.logicalItems;

			if (currentIndex < 0) {
				if (!this.controlled && activeItemName === null) {
					this.uncontrolledItem = logicalItems[0]!.name;
					return;
				}
				this.setItem(logicalItems[0]!.name);
			}
		});

		$effect(() => {
			const pendingFocus = this.pendingFocus;
			const activeItemName = this.activeItemName;
			const activeItemChanged = this.previousActiveItemName !== activeItemName;
			this.previousActiveItemName = activeItemName;

			if (!pendingFocus || pendingFocus.name !== activeItemName) {
				if (this.controlled && activeItemChanged) {
					this.pendingFocus = null;
					this.activeItem?.focus();
				}
				return;
			}

			if (pendingFocus.target === "invalid") {
				this.activeItem?.focusInvalid();
			} else {
				this.activeItem?.focus();
			}
			this.pendingFocus = null;
		});
	}

	readonly collection = $derived.by(() => createQuestionnaireCollection(this.opts.items.current));
	readonly controlled = $derived.by(() => this.opts.item.current !== undefined);
	readonly activeItemName = $derived.by(() =>
		this.controlled ? (this.opts.item.current ?? null) : this.uncontrolledItem
	);
	readonly nativeValidation = $derived.by(() => this.opts.noValidate.current === false);
	readonly shortcuts = $derived.by(() => this.opts.shortcuts.current ?? null);

	readonly runtimeItems = $derived.by(() => {
		void this.domVersion;
		return this.registrations.filter((registration) => !registration.disabled).sort(compareItemOrder);
	});

	readonly runtimeItemByName = $derived.by(
		() => new Map(this.runtimeItems.map((runtimeItem) => [runtimeItem.name, runtimeItem]))
	);

	readonly logicalItems = $derived.by(() => this.collection?.enabledItems ?? this.runtimeItems);

	readonly currentIndex = $derived.by(() =>
		this.logicalItems.findIndex((logicalItem) => logicalItem.name === this.activeItemName)
	);

	readonly activeItem = $derived.by(() => {
		if (this.currentIndex < 0 || !this.activeItemName) return null;
		return this.runtimeItemByName.get(this.activeItemName) ?? null;
	});

	readonly activeItemRequired = $derived.by(() => {
		if (this.currentIndex < 0) return null;
		const activeDefinition = this.activeItemName
			? this.collection?.itemByName.get(this.activeItemName)
			: undefined;
		return activeDefinition ? Boolean(activeDefinition.required) : (this.activeItem?.required ?? false);
	});

	readonly activeItemStatus = $derived.by(() => {
		if (this.currentIndex < 0) return null;
		return this.activeItem?.status ?? (this.activeItemName ? "unanswered" : null);
	});

	readonly orderedRegistrations = $derived.by(() =>
		this.collection
			? this.collection.enabledItems.flatMap((definition) => {
					const registration = this.runtimeItemByName.get(definition.name);
					return registration ? [registration] : [];
				})
			: this.runtimeItems
	);

	readonly total = $derived.by(() => this.logicalItems.length);
	readonly current = $derived.by(() => (this.currentIndex < 0 ? 0 : this.currentIndex + 1));
	readonly first = $derived.by(() => this.total > 0 && this.currentIndex === 0);
	readonly last = $derived.by(() => this.total > 0 && this.currentIndex === this.total - 1);

	readonly viewState = $derived.by(
		(): QuestionnaireRootViewState => ({
			current: this.current,
			first: this.first,
			last: this.last,
			total: this.total,
		})
	);

	setItem(nextItem: string, focusTarget: PendingFocus["target"] = "item") {
		if (nextItem === this.activeItemName) return;

		this.pendingFocus = { name: nextItem, target: focusTarget };

		if (!this.controlled) {
			this.uncontrolledItem = nextItem;
		} else {
			this.opts.item.current = nextItem;
		}

		this.opts.onItemChange.current?.(nextItem);
	}

	registerItem(registration: ItemRegistration) {
		this.registrations = [
			...this.registrations.filter(
				(currentRegistration) =>
					currentRegistration.element !== registration.element &&
					currentRegistration.name !== registration.name
			),
			registration,
		];

		return () => {
			this.registrations = this.registrations.filter(
				(currentRegistration) => currentRegistration !== registration
			);
		};
	}

	goPrevious() {
		if (this.currentIndex <= 0) return;
		this.setItem(this.logicalItems[this.currentIndex - 1]!.name);
	}

	goNext() {
		if (!this.activeItem || this.currentIndex >= this.total - 1) return;
		if (!this.activeItem.validate()) {
			this.activeItem.focusInvalid();
			return;
		}
		this.setItem(this.logicalItems[this.currentIndex + 1]!.name);
	}

	confirmCurrent() {
		if (!this.activeItem) return;
		if (!this.activeItem.validate()) {
			this.activeItem.focusInvalid();
			return;
		}
		if (this.last) {
			this.rootElement?.requestSubmit();
			return;
		}
		this.setItem(this.logicalItems[this.currentIndex + 1]!.name);
	}

	skipCurrent() {
		if (!this.activeItem || this.activeItem.required) return;
		this.activeItem.skip();
		flushSync();
		if (!this.last) {
			this.setItem(this.logicalItems[this.currentIndex + 1]!.name);
			return;
		}
		this.rootElement?.requestSubmit();
	}

	handleReset(event: Event) {
		this.opts.onReset.current?.(event);
		if (event.defaultPrevented) return;

		for (const registration of this.registrations) {
			registration.reset();
		}

		const resetItemName = this.collection
			? getInitialItemName(this.collection, this.opts.defaultItem.current)
			: (this.runtimeItems.find((registration) => registration.name === this.opts.defaultItem.current)
					?.name ?? this.runtimeItems[0]?.name);

		if (resetItemName) {
			this.setItem(resetItemName);
		}
	}

	handleSubmit(event: SubmitEvent) {
		const firstInvalidItem = this.orderedRegistrations.find(
			(registration) => !registration.validate()
		);

		if (firstInvalidItem) {
			event.preventDefault();
			this.setItem(firstInvalidItem.name, "invalid");
			if (firstInvalidItem.name === this.activeItemName) {
				firstInvalidItem.focusInvalid();
				this.pendingFocus = null;
			}
			return;
		}

		this.opts.onSubmit.current?.(event);
	}

	handleKeyDown(event: KeyboardEvent) {
		if (
			event.defaultPrevented ||
			event.isComposing ||
			event.keyCode === 229 ||
			!this.activeItem ||
			!(event.target instanceof Element)
		) {
			return;
		}

		if (
			event.key === "Enter" &&
			(event.metaKey || event.ctrlKey) &&
			!event.altKey &&
			!event.shiftKey
		) {
			event.preventDefault();
			if (!event.repeat) this.confirmCurrent();
			return;
		}

		if (event.metaKey || event.ctrlKey || event.altKey) return;

		if (event.key === "ArrowUp" || event.key === "ArrowDown") {
			const moved = this.activeItem.moveAnswerFocus(
				event.target,
				event.key === "ArrowDown" ? "next" : "previous"
			);
			if (moved) {
				event.preventDefault();
				return;
			}
		}

		if (
			(event.key === "ArrowLeft" || event.key === "ArrowRight") &&
			!isTextEntryTarget(event.target) &&
			!isRadioTarget(event.target)
		) {
			event.preventDefault();
			if (event.repeat) return;
			if (event.key === "ArrowLeft") {
				this.goPrevious();
			} else if (this.activeItem.status !== "unanswered") {
				this.goNext();
			}
			return;
		}

		if (event.key === "Enter") {
			const answer = this.activeItem.getAnswerByElement(event.target);
			if (!answer) return;
			event.preventDefault();
			if (!event.repeat && isAnswerFilled(answer)) {
				this.confirmCurrent();
			}
			return;
		}

		if (!this.shortcuts || isTextEntryTarget(event.target)) return;

		const shortcut = getShortcutFromKey(event.key, this.shortcuts);
		const answer = shortcut ? this.activeItem.getAnswerByShortcut(shortcut) : null;
		if (!answer) return;

		event.preventDefault();
		if (event.repeat) return;
		answer.element.focus();
		if (answer.type === "choice") {
			answer.element.click();
		}
	}

	readonly props = $derived.by(
		() =>
			({
				id: this.opts.id.current,
				novalidate: this.opts.noValidate.current,
				"data-current": this.current ? String(this.current) : undefined,
				"data-first": boolToEmptyStrOrUndef(this.first),
				"data-last": boolToEmptyStrOrUndef(this.last),
				"data-total": this.total ? String(this.total) : undefined,
				"data-shortcuts": this.shortcuts ?? undefined,
				onkeydown: this.handleKeyDown,
				onreset: this.handleReset,
				onsubmit: this.handleSubmit,
			}) as const
	);
}

interface QuestionnaireItemStateOpts
	extends WithRefOpts<{}, HTMLFieldSetElement>,
		ReadableBoxedValues<{
			ariaDescribedBy: string | undefined;
			ariaKeyShortcuts: string | undefined;
			disabled: boolean;
			invalid: boolean;
			multiple: boolean;
			name: string;
			onStatusChange: ((status: QuestionnaireItemStatus) => void) | undefined;
			required: boolean;
		}> {}

export class QuestionnaireItemStateClass {
	static create(opts: QuestionnaireItemStateOpts) {
		return QuestionnaireItemContext.set(
			new QuestionnaireItemStateClass(opts, QuestionnaireRootContext.get())
		);
	}

	static get() {
		return QuestionnaireItemContext.get();
	}

	readonly opts: QuestionnaireItemStateOpts;
	readonly root: QuestionnaireRootState;
	readonly attachment: RefAttachment<HTMLFieldSetElement>;
	element = $state<HTMLFieldSetElement | null>(null);
	answerControlRegistrations = $state.raw<AnswerControlRegistration[]>([]);
	validationAttempted = $state(false);
	selectedAnswerIds = $state.raw<string[]>([]);
	skipped = $state(false);
	resetVersion = $state(0);
	descriptionIds = $state.raw<string[]>([]);
	errorIds = $state.raw<string[]>([]);
	defaultSelectedAnswerIds: string[] = [];
	previousStatus: QuestionnaireItemStatus | null = null;
	previousMultiple: boolean;

	constructor(opts: QuestionnaireItemStateOpts, root: QuestionnaireRootState) {
		this.opts = opts;
		this.root = root;
		this.previousMultiple = opts.multiple.current;
		this.attachment = attachRef(this.opts.ref, (node) => {
			this.element = node as HTMLFieldSetElement | null;
		});

		$effect(() => {
			const node = this.opts.ref.current as HTMLFieldSetElement | null;
			if (this.element !== node) this.element = node;
		});

		$effect.pre(() => {
			this.emitStatusChange();
		});

		$effect.pre(() => {
			const multiple = this.opts.multiple.current;
			const wasMultiple = this.previousMultiple;
			this.previousMultiple = multiple;
			if (!wasMultiple || multiple) return;
			const answers = this.answers;
			this.selectedAnswerIds = (() => {
				const selectedAnswer = answers.find((answer) =>
					this.selectedAnswerIds.includes(answer.id)
				);
				return selectedAnswer ? [selectedAnswer.id] : [];
			})();
		});

		$effect.pre(() => {
			const element = this.element;
			if (!element) return;
			const item = this;
			return untrack(() =>
				this.root.registerItem({
				get choices() {
					return item.answerControls.flatMap((answer) =>
						answer.type === "choice" ? [{ disabled: answer.ownDisabled, value: answer.value }] : []
					);
				},
				get disabled() {
					return item.opts.disabled.current;
				},
				element,
				focus: () => item.focus(),
				focusInvalid: () => item.focusInvalid(),
				getAnswerByElement: (answerElement) => item.getAnswerByElement(answerElement),
				getAnswerByShortcut: (shortcut) => item.getAnswerByShortcut(shortcut),
				moveAnswerFocus: (currentElement, direction) =>
					item.moveAnswerFocus(currentElement, direction),
				get name() {
					return item.opts.name.current;
				},
				get required() {
					return item.opts.required.current;
				},
				reset: () => item.reset(),
				skip: () => item.skip(),
				get status() {
					return item.status;
				},
				validate: () => item.validate(),
			})
			);
		});
	}

	readonly active = $derived.by(
		() => !this.opts.disabled.current && this.root.activeItemName === this.opts.name.current
	);

	readonly answerControls = $derived.by(() => {
		void this.root.domVersion;
		return [...this.answerControlRegistrations].sort(compareAnswerOrder);
	});

	readonly answers = $derived.by(() =>
		this.answerControls.filter((registration) => !registration.disabled)
	);

	readonly answered = $derived.by(() =>
		this.answers.some((answer) => this.selectedAnswerIds.includes(answer.id))
	);

	readonly status = $derived.by((): QuestionnaireItemStatus => {
		if (this.skipped) return "skipped";
		return this.answered ? "answered" : "unanswered";
	});

	readonly intentionallySkipped = $derived.by(
		() => this.status === "skipped" && !this.opts.required.current
	);

	readonly valid = $derived.by(
		() =>
			this.opts.disabled.current ||
			this.intentionallySkipped ||
			(!this.opts.invalid.current && this.status === "answered")
	);

	readonly invalid = $derived.by(
		() =>
			!this.opts.disabled.current &&
			!this.intentionallySkipped &&
			(this.opts.invalid.current || (this.validationAttempted && !this.valid))
	);

	readonly hasInputAnswer = $derived.by(() => this.answers.some((answer) => answer.type === "input"));

	readonly itemDefinition = $derived.by(() =>
		this.root.collection?.itemByName.get(this.opts.name.current)
	);

	readonly shortcutByChoiceValue = $derived.by(() =>
		this.root.collection
			? getShortcutByChoiceValue(this.itemDefinition, this.root.shortcuts)
			: null
	);

	readonly shortcutByAnswerId = $derived.by(() => {
		if (this.shortcutByChoiceValue) return new Map<string, string>();
		const keys = getShortcutKeys(this.root.shortcuts);
		const shortcutAnswers = this.answers.filter((answer) => answer.type === "choice");
		return new Map(
			shortcutAnswers.slice(0, keys.length).map((answer, index) => [answer.id, keys[index]!])
		);
	});

	registerAnswerControl(registration: AnswerControlRegistration) {
		this.answerControlRegistrations = [
			...this.answerControlRegistrations.filter(
				(currentRegistration) =>
					currentRegistration.element !== registration.element &&
					currentRegistration.id !== registration.id
			),
			registration,
		];
		return () => {
			this.answerControlRegistrations = this.answerControlRegistrations.filter(
				(currentRegistration) => currentRegistration !== registration
			);
		};
	}

	updateAnswerSelected(answerId: string, selected: boolean) {
		if (!selected) {
			if (!this.selectedAnswerIds.includes(answerId)) return;
			this.selectedAnswerIds = this.selectedAnswerIds.filter(
				(currentAnswerId) => currentAnswerId !== answerId
			);
			return;
		}
		if (!this.opts.multiple.current) {
			if (this.selectedAnswerIds.length === 1 && this.selectedAnswerIds[0] === answerId) return;
			this.selectedAnswerIds = [answerId];
			return;
		}
		if (this.selectedAnswerIds.includes(answerId)) return;
		this.selectedAnswerIds = [...this.selectedAnswerIds, answerId];
	}

	setAnswerSelectionFromInteraction(answerId: string, selected: boolean) {
		this.skipped = false;
		this.updateAnswerSelected(answerId, selected);
	}

	syncControlledAnswerSelection(answerId: string, selected: boolean) {
		if (selected) {
			untrack(() => {
				if (this.skipped) this.skipped = false;
			});
		}
		this.updateAnswerSelected(answerId, selected);
	}

	registerAnswerSelection(answerId: string, defaultSelected: boolean) {
		if (defaultSelected) {
			this.defaultSelectedAnswerIds = [
				...this.defaultSelectedAnswerIds.filter((currentAnswerId) => currentAnswerId !== answerId),
				answerId,
			];
			if (!this.opts.multiple.current) {
				if (!this.selectedAnswerIds.length) this.selectedAnswerIds = [answerId];
			} else if (!this.selectedAnswerIds.includes(answerId)) {
				this.selectedAnswerIds = [...this.selectedAnswerIds, answerId];
			}
		}

		return () => {
			this.defaultSelectedAnswerIds = this.defaultSelectedAnswerIds.filter(
				(currentAnswerId) => currentAnswerId !== answerId
			);
			if (!this.selectedAnswerIds.includes(answerId)) return;
			this.selectedAnswerIds = this.selectedAnswerIds.filter(
				(currentAnswerId) => currentAnswerId !== answerId
			);
		};
	}

	setAnswerDefault(answerId: string, defaultSelected: boolean) {
		if (defaultSelected) {
			this.defaultSelectedAnswerIds = this.defaultSelectedAnswerIds.includes(answerId)
				? this.defaultSelectedAnswerIds
				: [...this.defaultSelectedAnswerIds, answerId];
			return;
		}
		this.defaultSelectedAnswerIds = this.defaultSelectedAnswerIds.filter(
			(currentAnswerId) => currentAnswerId !== answerId
		);
	}

	registerDescription(registeredDescriptionId: string) {
		if (!this.descriptionIds.includes(registeredDescriptionId)) {
			this.descriptionIds = [...this.descriptionIds, registeredDescriptionId];
		}
		return () => {
			this.descriptionIds = this.descriptionIds.filter(
				(currentDescriptionId) => currentDescriptionId !== registeredDescriptionId
			);
		};
	}

	registerError(registeredErrorId: string) {
		if (!this.errorIds.includes(registeredErrorId)) {
			this.errorIds = [...this.errorIds, registeredErrorId];
		}
		return () => {
			this.errorIds = this.errorIds.filter(
				(currentErrorId) => currentErrorId !== registeredErrorId
			);
		};
	}

	validate() {
		this.validationAttempted = true;
		if (!this.valid) return false;
		if (!this.root.nativeValidation) return true;

		const invalidAnswer = this.answers.find(
			(answer) =>
				isAnswerFilled(answer) && answer.element.willValidate && !answer.element.validity.valid
		);
		if (!invalidAnswer) return true;
		invalidAnswer.element.focus();
		invalidAnswer.element.reportValidity();
		return false;
	}

	focus() {
		this.element?.focus();
	}

	focusInvalid() {
		const selectedInput = this.element?.querySelector<HTMLInputElement>(
			"input[data-filled][name]:not(:disabled)"
		);
		const firstControl = this.element?.querySelector<HTMLElement>(
			"input:not([type=hidden]):not(:disabled), textarea:not(:disabled)"
		);
		(selectedInput ?? firstControl ?? this.element)?.focus();
	}

	reset() {
		this.validationAttempted = false;
		this.skipped = false;
		this.selectedAnswerIds = this.opts.multiple.current
			? [...this.defaultSelectedAnswerIds]
			: this.defaultSelectedAnswerIds.slice(0, 1);
		this.resetVersion += 1;
	}

	skip() {
		if (this.opts.required.current) return;
		this.selectedAnswerIds = [];
		this.skipped = true;
		this.emitStatusChange();
	}

	emitStatusChange() {
		const status = this.status;
		if (this.previousStatus === status) return;
		const previous = this.previousStatus;
		this.previousStatus = status;
		if (previous === null) return;
		this.opts.onStatusChange.current?.(status);
	}

	getAnswerByElement(answerElement: Element) {
		return this.answers.find((answer) => answer.element === answerElement) ?? null;
	}

	getAnswerByShortcut(shortcut: string) {
		if (this.shortcutByChoiceValue) {
			const choiceValue = Array.from(this.shortcutByChoiceValue.entries()).find(
				([, choiceShortcut]) => choiceShortcut === shortcut
			)?.[0];
			return (
				this.answers.find((answer) => answer.type === "choice" && answer.value === choiceValue) ??
				null
			);
		}
		const answerId = Array.from(this.shortcutByAnswerId.entries()).find(
			([, answerShortcut]) => answerShortcut === shortcut
		)?.[0];
		return this.answers.find((answer) => answer.id === answerId) ?? null;
	}

	moveAnswerFocus(currentElement: Element, direction: "next" | "previous") {
		const currentIndex = this.answers.findIndex((answer) => answer.element === currentElement);
		const currentAnswer = currentIndex < 0 ? null : (this.answers[currentIndex] ?? null);

		if (
			!this.answers.length ||
			(isTextEntryTarget(currentElement) && !isEmptyNavigableInput(currentAnswer)) ||
			(currentIndex < 0 && currentElement !== this.element)
		) {
			return false;
		}

		const nextAnswer =
			currentIndex < 0
				? (this.answers.find(isAnswerFilled) ??
					(direction === "next" ? this.answers[0] : this.answers[this.answers.length - 1]))
				: this.answers[
						(currentIndex + (direction === "next" ? 1 : -1) + this.answers.length) %
							this.answers.length
					];

		if (!nextAnswer || nextAnswer.element === currentElement) return false;

		if (
			currentIndex >= 0 &&
			isRadioTarget(currentElement) &&
			isRadioTarget(nextAnswer.element)
		) {
			return false;
		}

		nextAnswer.element.focus();
		if (nextAnswer.type === "choice" && isRadioTarget(nextAnswer.element)) {
			nextAnswer.element.click();
		}
		return true;
	}

	readonly viewState = $derived.by(
		(): QuestionnaireItemState => ({
			active: this.active,
			disabled: this.opts.disabled.current,
			invalid: this.invalid,
			multiple: this.opts.multiple.current,
			required: this.opts.required.current,
			status: this.status,
		})
	);

	readonly describedBy = $derived.by(
		() =>
			[
				...this.descriptionIds,
				...(this.invalid ? this.errorIds : []),
				this.opts.ariaDescribedBy.current,
			]
				.filter(Boolean)
				.join(" ") || undefined
	);

	readonly keyShortcuts = $derived.by(
		() =>
			[
				this.opts.ariaKeyShortcuts.current,
				this.active ? "Meta+Enter Control+Enter" : undefined,
				this.active && this.answers.length ? "ArrowUp ArrowDown" : undefined,
				this.active && !this.root.first ? "ArrowLeft" : undefined,
				this.active && !this.root.last && this.status !== "unanswered" ? "ArrowRight" : undefined,
			]
				.filter(Boolean)
				.join(" ") || undefined
	);

	readonly props = $derived.by(
		() =>
			({
				id: this.opts.id.current,
				"aria-describedby": this.describedBy,
				"aria-invalid": boolToTrueOrUndef(this.invalid),
				"aria-keyshortcuts": this.keyShortcuts,
				disabled: this.opts.disabled.current,
				hidden: !this.active,
				inert: this.active ? undefined : true,
				tabindex: -1,
				"data-active": boolToEmptyStrOrUndef(this.active),
				"data-disabled": boolToEmptyStrOrUndef(this.opts.disabled.current),
				"data-invalid": boolToEmptyStrOrUndef(this.invalid),
				"data-multiple": boolToEmptyStrOrUndef(this.opts.multiple.current),
				"data-required": boolToEmptyStrOrUndef(this.opts.required.current),
				"data-status": this.status,
			}) as const
	);
}

interface QuestionnaireChoiceStateOpts
	extends ReadableBoxedValues<{
		checked: boolean | undefined;
		defaultChecked: boolean;
		disabled: boolean;
		onChange: ((event: Event) => void) | undefined;
		value: string;
		answerId: string;
	}> {}

export class QuestionnaireChoiceStateClass {
	static create(opts: QuestionnaireChoiceStateOpts) {
		return QuestionnaireChoiceContext.set(
			new QuestionnaireChoiceStateClass(opts, QuestionnaireItemContext.get())
		);
	}

	static get() {
		return QuestionnaireChoiceContext.get();
	}

	readonly opts: QuestionnaireChoiceStateOpts;
	readonly item: QuestionnaireItemStateClass;
	inputElement = $state<HTMLInputElement | null>(null);
	readonly initialDefaultChecked: boolean;

	constructor(opts: QuestionnaireChoiceStateOpts, item: QuestionnaireItemStateClass) {
		this.opts = opts;
		this.item = item;
		this.initialDefaultChecked = opts.defaultChecked.current;

		$effect.pre(() =>
			untrack(() =>
				this.item.registerAnswerSelection(this.opts.answerId.current, this.initialDefaultChecked)
			)
		);
		$effect.pre(() =>
			this.item.setAnswerDefault(this.opts.answerId.current, this.opts.defaultChecked.current)
		);

		$effect.pre(() => {
			const input = this.inputElement;
			if (!input) return;
			const choice = this;
			return untrack(() =>
				this.item.registerAnswerControl({
					get disabled() {
						return choice.disabled;
					},
					element: input,
					get id() {
						return choice.opts.answerId.current;
					},
					get ownDisabled() {
						return choice.opts.disabled.current;
					},
					type: "choice",
					get value() {
						return choice.opts.value.current;
					},
				})
			);
		});

		$effect.pre(() => {
			const controlled = this.controlled;
			const answerId = this.opts.answerId.current;
			const checked = this.opts.checked.current;
			void this.item.resetVersion;
			if (!controlled) return;
			untrack(() => this.item.syncControlledAnswerSelection(answerId, checked!));
		});

		$effect.pre(() => {
			const input = this.inputElement;
			if (!input) return;
			const controlled = this.controlled;
			const controlledChecked = this.opts.checked.current;
			const defaultChecked = this.opts.defaultChecked.current;
			const resetVersion = this.item.resetVersion;
			const skipped = this.item.status === "skipped";
			input.defaultChecked = controlled ? Boolean(controlledChecked) : defaultChecked;
			if (resetVersion > 0 || skipped) {
				untrack(() => {
					if (input.checked !== this.checked) input.checked = this.checked;
				});
			}
		});
	}

	readonly controlled = $derived.by(() => this.opts.checked.current !== undefined);
	readonly disabled = $derived.by(() => this.item.opts.disabled.current || this.opts.disabled.current);
	readonly selected = $derived.by(() => this.item.selectedAnswerIds.includes(this.opts.answerId.current));
	readonly checked = $derived.by(() =>
		this.controlled
			? this.item.status === "skipped"
				? false
				: Boolean(this.opts.checked.current)
			: this.selected
	);
	readonly type = $derived.by((): "checkbox" | "radio" =>
		this.item.opts.multiple.current ? "checkbox" : "radio"
	);
	readonly shortcut = $derived.by(
		() =>
			this.item.shortcutByChoiceValue?.get(this.opts.value.current) ??
			this.item.shortcutByAnswerId.get(this.opts.answerId.current) ??
			null
	);

	handleChange(event: Event) {
		this.opts.onChange.current?.(event);
		if (event.defaultPrevented) return;
		const target = event.currentTarget as HTMLInputElement;
		if (!this.controlled) {
			this.item.setAnswerSelectionFromInteraction(this.opts.answerId.current, target.checked);
			return;
		}
		if (this.item.status === "skipped" && this.opts.checked.current === target.checked) {
			this.item.setAnswerSelectionFromInteraction(this.opts.answerId.current, Boolean(this.opts.checked.current));
		}
	}

	readonly viewState = $derived.by(
		(): QuestionnaireChoiceState => ({
			checked: this.checked,
			disabled: this.disabled,
			invalid: this.item.invalid,
			shortcut: this.shortcut,
			type: this.type,
		})
	);

	readonly inputProps = $derived.by(
		() =>
			({
				"aria-invalid": boolToTrueOrUndef(this.item.invalid),
				"aria-keyshortcuts": getAnswerKeyShortcuts(this.shortcut, !this.disabled && this.checked),
				checked: this.checked,
				disabled: this.disabled,
				id: this.opts.answerId.current,
				name: this.item.status === "skipped" ? undefined : this.item.opts.name.current,
				onchange: (event: Event) => this.handleChange(event),
				required:
					this.item.opts.required.current && !this.item.opts.multiple.current && !this.item.hasInputAnswer,
				type: this.type,
				value: this.opts.value.current,
				"data-checked": boolToEmptyStrOrUndef(this.checked),
				"data-unchecked": boolToEmptyStrOrUndef(!this.checked),
				"data-disabled": boolToEmptyStrOrUndef(this.disabled),
				"data-invalid": boolToEmptyStrOrUndef(this.item.invalid),
				"data-shortcut": this.shortcut ?? undefined,
				"data-type": this.type,
			}) as const
	);

	readonly props = $derived.by(
		() =>
			({
				"data-checked": boolToEmptyStrOrUndef(this.checked),
				"data-unchecked": boolToEmptyStrOrUndef(!this.checked),
				"data-disabled": boolToEmptyStrOrUndef(this.disabled),
				"data-invalid": boolToEmptyStrOrUndef(this.item.invalid),
				"data-shortcut": this.shortcut ?? undefined,
				"data-type": this.type,
			}) as const
	);
}

interface QuestionnaireInputStateOpts
	extends WithRefOpts<{}, HTMLInputElement>,
		ReadableBoxedValues<{
			defaultValue: string | undefined;
			disabled: boolean;
			onChange: ((event: Event) => void) | undefined;
			type: QuestionnaireInputType;
			value: string | undefined;
			answerId: string;
		}> {}

export class QuestionnaireInputStateClass {
	static create(opts: QuestionnaireInputStateOpts) {
		return new QuestionnaireInputStateClass(opts, QuestionnaireItemContext.get());
	}

	readonly opts: QuestionnaireInputStateOpts;
	readonly item: QuestionnaireItemStateClass;
	readonly attachment: RefAttachment<HTMLInputElement>;
	inputElement = $state<HTMLInputElement | null>(null);
	uncontrolledFilled = $state(false);
	readonly initialDefaultFilled: boolean;

	constructor(opts: QuestionnaireInputStateOpts, item: QuestionnaireItemStateClass) {
		this.opts = opts;
		this.item = item;
		this.initialDefaultFilled = hasInputValue(opts.defaultValue.current);
		this.uncontrolledFilled = this.initialDefaultFilled;
		this.attachment = attachRef(this.opts.ref, (node) => {
			this.inputElement = node as HTMLInputElement | null;
		});

		$effect(() => {
			const node = this.opts.ref.current as HTMLInputElement | null;
			if (this.inputElement !== node) this.inputElement = node;
		});

		$effect.pre(() =>
			untrack(() =>
				this.item.registerAnswerSelection(this.opts.answerId.current, this.initialDefaultFilled)
			)
		);
		$effect.pre(() =>
			this.item.setAnswerDefault(this.opts.answerId.current, this.defaultFilled)
		);

		$effect.pre(() => {
			const input = this.inputElement;
			if (!input) return;
			const answer = this;
			return untrack(() =>
				this.item.registerAnswerControl({
					get disabled() {
						return answer.disabled;
					},
					element: input,
					get id() {
						return answer.opts.answerId.current;
					},
					type: "input",
				})
			);
		});

		$effect.pre(() => {
			const controlled = this.controlled;
			const answerId = this.opts.answerId.current;
			const filled = this.controlledFilled;
			const resetVersion = this.item.resetVersion;
			const defaultFilled = this.defaultFilled;
			if (controlled) {
				untrack(() => this.item.syncControlledAnswerSelection(answerId, filled));
				return;
			}
			if (resetVersion > 0) {
				this.uncontrolledFilled = defaultFilled;
			}
		});

		$effect.pre(() => {
			const input = this.inputElement;
			if (!input) return;
			if (this.controlled) {
				const nextValue = String(this.opts.value.current ?? "");
				input.defaultValue = nextValue;
				if (input.value !== nextValue) input.value = nextValue;
				return;
			}
			const defaultValue = this.opts.defaultValue.current;
			if (defaultValue !== undefined) input.defaultValue = String(defaultValue);
			if (this.item.resetVersion > 0) {
				input.value = String(defaultValue ?? "");
			}
		});
	}

	readonly controlled = $derived.by(() => this.opts.value.current !== undefined);
	readonly defaultFilled = $derived.by(() => hasInputValue(this.opts.defaultValue.current));
	readonly controlledFilled = $derived.by(() => hasInputValue(this.opts.value.current));
	readonly disabled = $derived.by(() => this.item.opts.disabled.current || this.opts.disabled.current);
	readonly filled = $derived.by(() => (this.controlled ? this.controlledFilled : this.uncontrolledFilled));
	readonly selected = $derived.by(() => this.item.selectedAnswerIds.includes(this.opts.answerId.current));

	handleInput(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		this.opts.onChange.current?.(event);
		if (event.defaultPrevented) return;
		if (this.controlled) {
			const nextValue = String(this.opts.value.current ?? "");
			if (target.value !== nextValue) target.value = nextValue;
			return;
		}
		const nextFilled = target.value.trim().length > 0;
		this.uncontrolledFilled = nextFilled;
		this.item.setAnswerSelectionFromInteraction(this.opts.answerId.current, nextFilled);
	}

	readonly viewState = $derived.by(
		(): QuestionnaireInputState => ({
			disabled: this.disabled,
			filled: this.filled,
			invalid: this.item.invalid,
		})
	);

	readonly props = $derived.by(() => {
		const valueProps = this.controlled
			? { value: this.opts.value.current }
			: { defaultValue: this.opts.defaultValue.current };
		return {
			id: this.opts.answerId.current,
			"aria-invalid": boolToTrueOrUndef(this.item.invalid),
			"aria-keyshortcuts": getAnswerKeyShortcuts(null, !this.disabled && this.filled && this.selected),
			disabled: this.disabled,
			form: this.selected ? undefined : "",
			name: this.selected ? this.item.opts.name.current : undefined,
			oninput: (event: Event) => this.handleInput(event),
			type: this.opts.type.current,
			...valueProps,
			"data-empty": boolToEmptyStrOrUndef(!this.filled),
			"data-filled": boolToEmptyStrOrUndef(this.filled),
			"data-disabled": boolToEmptyStrOrUndef(this.disabled),
			"data-invalid": boolToEmptyStrOrUndef(this.item.invalid),
		} as const;
	});
}

export function getNavigationState(opts: {
	disabled: boolean;
	shortcut?: "Enter";
	status: QuestionnaireItemStatus | null;
	visible: boolean;
}): QuestionnaireNavigationState {
	return {
		disabled: opts.disabled,
		shortcut: opts.visible && !opts.disabled ? (opts.shortcut ?? null) : null,
		status: opts.status,
		visible: opts.visible,
	};
}

export function getNavigationProps(opts: {
	disabled: boolean;
	onClick?: (event: MouseEvent) => void;
	shortcut?: "Enter";
	status: QuestionnaireItemStatus | null;
	tabIndex: number | undefined;
	type: "button" | "reset" | "submit";
	visible: boolean;
}) {
	const state = getNavigationState(opts);
	return {
		state,
		props: {
			"aria-hidden": opts.visible ? undefined : true,
			"aria-keyshortcuts": state.shortcut ?? undefined,
			disabled: opts.disabled,
			hidden: !opts.visible,
			inert: opts.visible ? undefined : true,
			onclick: opts.onClick,
			tabindex: opts.visible ? opts.tabIndex : -1,
			type: opts.type,
			"data-disabled": boolToEmptyStrOrUndef(opts.disabled),
			"data-hidden": boolToEmptyStrOrUndef(!opts.visible),
			"data-visible": boolToEmptyStrOrUndef(opts.visible),
			"data-shortcut": state.shortcut ?? undefined,
			"data-status": opts.status ?? undefined,
		},
	};
}
