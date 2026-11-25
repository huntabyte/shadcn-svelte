import { test, expect, type Page } from "@playwright/test";

for (const kind of ["context", "context-sub", "dropdown"] as const) {
	test(`${kind} resolves logical sides reactively and preserves physical sides`, async ({
		page,
	}) => {
		await page.goto(`/?logical-sides&kind=${kind}`);
		const target = page.locator(
			`[data-slot="${kind === "dropdown" ? "dropdown-menu-sub-content" : kind === "context-sub" ? "context-menu-sub-content" : "context-menu-content"}"]`
		);
		async function open(page: Page) {
			if (kind === "dropdown") await page.getByRole("button", { name: "Open dropdown" }).click();
			else await page.getByText("Open context", { exact: true }).click({ button: "right" });
			if (kind !== "context")
				await page.getByRole("menuitem", { name: "Submenu", exact: true }).hover();
			await expect(target).toBeVisible();
		}
		async function close() {
			await page.keyboard.press("Escape");
			await page.keyboard.press("Escape");
		}
		await open(page);
		await expect(target).toHaveAttribute("data-side", "left");
		await page.getByRole("menuitem", { name: "Toggle direction" }).click();
		await expect(target).toHaveAttribute("data-side", "right");
		await close();
		await page.getByRole("combobox", { name: "Side", exact: true }).selectOption("inline-start");
		await open(page);
		await expect(target).toHaveAttribute("data-side", "left");
		await page.getByRole("menuitem", { name: "Toggle direction" }).click();
		await expect(target).toHaveAttribute("data-side", "right");
		await close();
		for (const side of ["left", "right", "top", "bottom"]) {
			await page.getByRole("combobox", { name: "Side", exact: true }).selectOption(side);
			await open(page);
			await expect(target).toHaveAttribute("data-side", side);
			await page.getByRole("menuitem", { name: "Toggle direction" }).click();
			await expect(target).toHaveAttribute("data-side", side);
			await close();
		}
		await page.getByRole("combobox", { name: "Side", exact: true }).selectOption("inline-end");
		await page.getByRole("combobox", { name: "Content direction" }).selectOption("ltr");
		await open(page);
		await expect(target).toHaveAttribute("data-side", "right");
		await close();
		await page
			.getByRole("combobox", { name: "Content direction" })
			.selectOption({ label: "Inherited" });
		await page.getByRole("combobox", { name: "Root direction" }).selectOption("ltr");
		await open(page);
		await expect(target).toHaveAttribute("data-side", "right");
	});
}
