import type { MenuColorValue } from "$lib/registry/config.js";

/**
 * Menu content components ship with `cn-menu-target cn-menu-translucent` so every menu color can be
 * previewed. This keeps rendered menus in sync with `menuColor` (toggling `dark` for inverted menus
 * and `cn-menu-translucent` for translucent ones), including menus that are portaled in later.
 *
 * Returns a cleanup function.
 */
export function syncMenuColor(menuColor: MenuColorValue): () => void {
	const isInvertedMenu = menuColor === "inverted" || menuColor === "inverted-translucent";
	const isTranslucentMenu =
		menuColor === "default-translucent" || menuColor === "inverted-translucent";

	let frameId = 0;

	const updateMenuElements = () => {
		const allElements = document.querySelectorAll<HTMLElement>(
			".cn-menu-target, [data-menu-translucent]"
		);

		if (allElements.length === 0) return;

		allElements.forEach((element) => {
			element.style.transition = "none";
		});

		allElements.forEach((element) => {
			if (element.classList.contains("cn-menu-target")) {
				if (isInvertedMenu) {
					element.classList.add("dark");
				} else {
					element.classList.remove("dark");
				}
			}

			if (isTranslucentMenu) {
				element.classList.add("cn-menu-translucent");
				element.removeAttribute("data-menu-translucent");
			} else if (element.classList.contains("cn-menu-translucent")) {
				element.classList.remove("cn-menu-translucent");
				element.setAttribute("data-menu-translucent", "");
			}
		});

		void document.body.offsetHeight;

		allElements.forEach((element) => {
			element.style.transition = "";
		});
	};

	updateMenuElements();

	const observer = new MutationObserver(() => {
		if (frameId) return;

		frameId = window.requestAnimationFrame(() => {
			frameId = 0;
			updateMenuElements();
		});
	});

	observer.observe(document.body, { childList: true, subtree: true });

	return () => {
		observer.disconnect();
		if (frameId) {
			window.cancelAnimationFrame(frameId);
			frameId = 0;
		}
	};
}
