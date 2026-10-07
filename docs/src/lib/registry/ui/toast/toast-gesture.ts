/**
 * Svelte adaptation of Base UI Toast (https://github.com/mui/base-ui).
 * MIT License
 *
 * Copyright (c) 2019 Material-UI SAS
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
import type { ToastStore } from "./toast-store.js";
export type SwipeDirection = "up" | "down" | "left" | "right";
/** Base UI's 40px dismissal, directional damping, axis lock and reverse cancellation. */
export function swipeToast(
	node: HTMLElement,
	options: {
		store: ToastStore;
		id: string;
		directions: SwipeDirection[];
		onChange: (x: number, y: number, direction?: SwipeDirection, transform?: string) => void;
	}
) {
	let pointer: number | null = null;
	let startX = 0,
		startY = 0,
		baselineX = 0,
		baselineY = 0;
	let deltaX = 0,
		deltaY = 0;
	let initial = { x: 0, y: 0, scale: 1 };
	let first = false;
	let axis: "horizontal" | "vertical" | null = null;
	let intended: SwipeDirection | undefined;
	let maximum = 0;
	let cancelled = false;
	const displacement = (direction: SwipeDirection, x: number, y: number) =>
		direction === "right" ? x : direction === "left" ? -x : direction === "down" ? y : -y;
	function end(event: PointerEvent) {
		if (event.pointerId !== pointer) return;
		pointer = null;
		const direction =
			event.type !== "pointercancel" && !cancelled
				? options.directions.find((direction) => displacement(direction, deltaX, deltaY) > 40)
				: undefined;
		if (direction) {
			options.onChange(deltaX, deltaY, direction);
			options.store.close(options.id);
		} else options.onChange(0, 0);
	}
	function down(event: PointerEvent) {
		if (
			event.button !== 0 ||
			pointer !== null ||
			!options.directions.length ||
			node.hasAttribute("data-ending-style") ||
			node.inert
		)
			return;
		if (
			(event.target as Element).closest(
				"button,a,input,textarea,[role=button],[data-base-ui-swipe-ignore],[data-swipe-ignore]"
			)
		)
			return;
		pointer = event.pointerId;
		startX = baselineX = event.clientX;
		startY = baselineY = event.clientY;
		deltaX = deltaY = maximum = 0;
		first = true;
		axis = null;
		intended = undefined;
		cancelled = false;
		const matrix = new DOMMatrix(getComputedStyle(node).transform);
		initial = { x: matrix.m41, y: matrix.m42, scale: Math.hypot(matrix.m11, matrix.m12) };
		options.store.setHovering(true);
		options.onChange(
			0,
			0,
			undefined,
			`translateX(${initial.x}px) translateY(${initial.y}px) scale(${initial.scale})`
		);
		node.setPointerCapture?.(event.pointerId);
	}
	function move(event: PointerEvent) {
		if (event.pointerId !== pointer) return;
		event.preventDefault();
		if (first) {
			startX = event.clientX;
			startY = event.clientY;
			first = false;
		}
		if (
			(event.movementX < 0 && event.clientX > baselineX) ||
			(event.movementX > 0 && event.clientX < baselineX)
		)
			baselineX = event.clientX;
		if (
			(event.movementY < 0 && event.clientY > baselineY) ||
			(event.movementY > 0 && event.clientY < baselineY)
		)
			baselineY = event.clientY;
		const x = event.clientX - startX,
			y = event.clientY - startY;
		const horizontal = options.directions.includes("left") || options.directions.includes("right");
		const vertical = options.directions.includes("up") || options.directions.includes("down");
		if (!axis && Math.hypot(x, y) >= 1 && horizontal && vertical)
			axis = Math.abs(x) > Math.abs(y) ? "horizontal" : "vertical";
		if (!intended) {
			const candidate =
				axis === "vertical"
					? y > 0
						? "down"
						: "up"
					: axis === "horizontal" || Math.abs(x) >= Math.abs(y)
						? x > 0
							? "right"
							: "left"
						: y > 0
							? "down"
							: "up";
			if (options.directions.includes(candidate)) {
				intended = candidate;
				maximum = displacement(candidate, x, y);
			}
		} else {
			const current = displacement(intended, event.clientX - baselineX, event.clientY - baselineY);
			if (current > 40) cancelled = false;
			else if (
				!(options.directions.includes("left") && options.directions.includes("right")) &&
				!(options.directions.includes("up") && options.directions.includes("down")) &&
				maximum - current >= 10
			)
				cancelled = true;
		}
		const damp = (value: number) => Math.sign(value) * Math.sqrt(Math.abs(value));
		deltaX =
			axis !== "vertical" && horizontal
				? (x > 0 && !options.directions.includes("right")) ||
					(x < 0 && !options.directions.includes("left"))
					? damp(x)
					: x
				: 0;
		deltaY =
			axis !== "horizontal" && vertical
				? (y > 0 && !options.directions.includes("down")) ||
					(y < 0 && !options.directions.includes("up"))
					? damp(y)
					: y
				: 0;
		options.onChange(
			deltaX,
			deltaY,
			intended,
			`translateX(${initial.x + deltaX}px) translateY(${initial.y + deltaY}px) scale(${initial.scale})`
		);
	}
	const touch = (event: TouchEvent) => {
		if (pointer !== null) event.preventDefault();
	};
	node.addEventListener("pointerdown", down);
	node.addEventListener("pointermove", move);
	// End on the root before the viewport handles pointerup. Otherwise a deferred
	// mouseleave collapses the stack before dismissal marks this toast as ending.
	node.addEventListener("pointerup", end);
	node.addEventListener("pointercancel", end);
	node.ownerDocument.addEventListener("pointerup", end);
	node.ownerDocument.addEventListener("pointercancel", end);
	node.addEventListener("touchmove", touch, { passive: false });
	return {
		update(next: typeof options) {
			options = next;
		},
		destroy() {
			node.removeEventListener("pointerdown", down);
			node.removeEventListener("pointermove", move);
			node.removeEventListener("pointerup", end);
			node.removeEventListener("pointercancel", end);
			node.ownerDocument.removeEventListener("pointerup", end);
			node.ownerDocument.removeEventListener("pointercancel", end);
			node.removeEventListener("touchmove", touch);
		},
	};
}
