<script lang="ts">
	import { tick, untrack, type Snippet } from "svelte";
	import { createAttachmentKey } from "svelte/attachments";
	import { cn } from "$lib/utils.js";
	import { getProvider, setRoot, type RootContext } from "./toast-context.js";
	import { swipeToast, type SwipeDirection } from "./toast-gesture.js";
	import type { ToastItem } from "./toast-manager.js";
	import type { HTMLAttributes } from "svelte/elements";
	import "./toaster.css";
	let {
		toast: item,
		swipeDirection = ["down", "right"],
		class: className,
		style = "",
		children,
		child,
		ref = $bindable(null),
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		toast: ToastItem;
		swipeDirection?: SwipeDirection | SwipeDirection[];
		ref?: HTMLDivElement | null;
		children?: Snippet;
		child?: Snippet<
			[
				{
					props: Record<string, unknown>;
					state: {
						expanded: boolean;
						limited: boolean;
						type?: string;
						transitionStatus?: string;
						swiping: boolean;
						swipeDirection?: SwipeDirection;
					};
				},
			]
		>;
	} = $props();
	const context = getProvider();
	const store = context.store;
	const items = $derived.by(() => {
		void context.version;
		return store.toasts;
	});
	const expanded = $derived.by(() => {
		void context.version;
		return store.expanded;
	});
	const focused = $derived.by(() => {
		void context.version;
		return store.focused;
	});
	const domIndex = $derived(items.findIndex((toast) => toast.id === item.id));
	const index = $derived(
		item.transitionStatus === "ending"
			? domIndex
			: items.slice(0, domIndex).filter((toast) => toast.transitionStatus !== "ending").length
	);
	const offset = $derived(
		items.slice(0, domIndex).reduce((height, toast) => height + (toast.height ?? 0), 0)
	);
	let labels = $state<{ titleId?: string; descriptionId?: string }>({});
	const root: RootContext = {
		get toast() {
			return item;
		},
		get index() {
			return index;
		},
		get expanded() {
			return expanded;
		},
		get titleId() {
			return labels.titleId;
		},
		set titleId(id) {
			labels.titleId = id;
		},
		get descriptionId() {
			return labels.descriptionId;
		},
		set descriptionId(id) {
			labels.descriptionId = id;
		},
	};
	setRoot(root);
	let swipeX = $state(0),
		swipeY = $state(0);
	let direction = $state<SwipeDirection>();
	let dragTransform = $state<string>();
	function onSwipe(x: number, y: number, nextDirection?: SwipeDirection, transform?: string) {
		swipeX = x;
		swipeY = y;
		direction = nextDirection;
		dragTransform = transform;
	}
	function measure(node: HTMLElement) {
		let destroyed = false;
		const recalculate = () => {
			if (destroyed || item.transitionStatus === "ending") return;
			const previous = node.style.height;
			node.style.height = "auto";
			const height = node.offsetHeight;
			node.style.height = previous;
			store.measure(item.id, height, node);
		};
		void tick().then(() => {
			requestAnimationFrame(() => {
				recalculate();
			});
		});
		const resize = new ResizeObserver(recalculate);
		const mutation = new MutationObserver(recalculate);
		// Observe content instead of the root's animated/stacked height.
		for (const content of node.children) resize.observe(content);
		mutation.observe(node, { childList: true, subtree: true, characterData: true });
		return {
			recalculate,
			destroy() {
				destroyed = true;
				resize.disconnect();
				mutation.disconnect();
			},
		};
	}
	let lifecycleId: string | undefined;
	let wasStarting = false;
	$effect(() => {
		const starting = item.transitionStatus === "starting";
		if (starting && (!wasStarting || lifecycleId !== item.id)) {
			untrack(() => {
				swipeX = swipeY = 0;
				direction = undefined;
				dragTransform = undefined;
			});
		}
		wasStarting = starting;
		lifecycleId = item.id;
	});
	$effect(() => {
		if (item.transitionStatus !== "ending" || !ref) return;
		const ending = item;
		let cancelled = false;
		void tick().then(() => {
			if (cancelled || !ref) return;
			async function waitForAnimations() {
				while (!cancelled && ref) {
					const animations = ref
						.getAnimations()
						.filter((animation) => animation.playState !== "finished");
					if (!animations.length) {
						store.remove(ending.id, ending);
						return;
					}
					await Promise.allSettled(animations.map((animation) => animation.finished));
					// A stack change can retarget an exit transition. Wait for its replacement too.
				}
			}
			void waitForAnimations();
		});
		return () => {
			cancelled = true;
		};
	});
	const attachmentKey = createAttachmentKey();
	let gesture: ReturnType<typeof swipeToast> | undefined;
	let recalculateHeight: (() => void) | undefined;
	function attach(node: HTMLDivElement) {
		// Attach once per element. Reading toast props here would reattach the gesture
		// whenever measurement or a stack update replaces its toast record.
		return untrack(() => {
			ref = node;
			const measurement = measure(node);
			recalculateHeight = measurement.recalculate;
			gesture = swipeToast(node, {
				store,
				id: item.id,
				directions: Array.isArray(swipeDirection) ? swipeDirection : [swipeDirection],
				onChange: onSwipe,
			});
			return () => {
				measurement.destroy();
				gesture?.destroy();
				gesture = undefined;
				recalculateHeight = undefined;
				if (ref === node) ref = null;
			};
		});
	}
	$effect(() => {
		const id = item.id;
		const directions = Array.isArray(swipeDirection) ? swipeDirection : [swipeDirection];
		gesture?.update({ store, id, directions, onChange: onSwipe });
	});
	$effect(() => {
		if (item.transitionStatus === "starting") {
			void tick().then(() => requestAnimationFrame(() => recalculateHeight?.()));
		}
	});
	const toastState = $derived({
		expanded,
		limited: !!item.limited,
		type: item.type,
		transitionStatus: item.transitionStatus,
		swiping: !!dragTransform,
		swipeDirection: direction,
	});
	const elementProps = $derived({
		...restProps,
		[attachmentKey]: attach,
		"data-slot": "toast",
		"data-type": item.type,
		"data-expanded": expanded ? "" : undefined,
		"data-limited": item.limited ? "" : undefined,
		"data-starting-style": item.transitionStatus === "starting" ? "" : undefined,
		"data-ending-style": item.transitionStatus === "ending" ? "" : undefined,
		"data-swiping": dragTransform ? "" : undefined,
		"data-swipe-direction": direction,
		class: cn(
			"cn-toast base-toast group/toast pointer-events-auto absolute right-0 bottom-0 w-full origin-bottom border bg-popover text-popover-foreground shadow-lg will-change-transform outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
			className
		),
		role: item.priority === "high" ? "alertdialog" : "dialog",
		tabindex: 0,
		"aria-modal": false,
		"aria-labelledby": labels.titleId,
		"aria-describedby": labels.descriptionId,
		"aria-hidden": item.priority === "high" && !focused ? true : undefined,
		inert: !!item.limited,
		style: `--toast-index:${index};--toast-offset-y:${offset}px;${item.height ? `--toast-height:${item.height}px;` : ""}--toast-swipe-movement-x:${swipeX}px;--toast-swipe-movement-y:${swipeY}px;${dragTransform ? `transition:none;transform:${dragTransform};` : ""}${style}`,
		onkeydown: (event: KeyboardEvent) => {
			restProps.onkeydown?.(
				event as KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }
			);
			if (
				!event.defaultPrevented &&
				event.key === "Escape" &&
				ref?.contains(ref.ownerDocument.activeElement)
			)
				store.close(item.id);
		},
	} satisfies HTMLAttributes<HTMLDivElement> & Record<string, unknown>);
</script>

{#if child}
	{@render child({ props: elementProps, state: toastState })}
{:else}
	<div {...elementProps}>
		{@render children?.()}
	</div>
{/if}
