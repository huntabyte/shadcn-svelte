import { test, expect } from "@playwright/test";

for (const language of ["ar", "en"] as const) {
	test(`composed combobox chips support ${language} arrow navigation and deletion`, async ({
		page,
	}) => {
		await page.goto("/?example=combobox");
		if (language === "en") {
			await page.getByRole("combobox", { name: "Language", exact: true }).click();
			await page.getByRole("option", { name: "English", exact: true }).click();
		}
		const input = page.locator("#rtl-categories");
		await input.fill(language === "ar" ? "تصميم" : "Design");
		await page
			.getByRole("option", { name: language === "ar" ? "التصميم" : "Design", exact: true })
			.click();
		await page.getByTestId("rtl-example").screenshot({
			animations: "disabled",
			path: `test-results/completion-combobox-${language}.png`,
		});
		await input.focus();
		const previous = language === "ar" ? "ArrowRight" : "ArrowLeft";
		const next = language === "ar" ? "ArrowLeft" : "ArrowRight";
		const design = page.locator('[data-category-chip="design"]');
		const technology = page.locator('[data-category-chip="technology"]');
		await input.press(previous);
		await expect(design).toBeFocused();
		await design.press(previous);
		await expect(technology).toBeFocused();
		await technology.press(next);
		await expect(design).toBeFocused();
		await design.press(next);
		await expect(input).toBeFocused();
		await input.fill("abc");
		await input.press("End");
		await input.press(previous);
		await expect(input).toBeFocused();
		await expect(design).toHaveCount(1);
		await input.fill("");
		await input.press(previous);
		await design.press("Delete");
		await expect(design).toHaveCount(0);
		await expect(technology).toBeFocused();
		await technology.press("Backspace");
		await expect(technology).toHaveCount(0);
		await expect(input).toBeFocused();
	});
}

test("menubar submenus follow direction and reload items use upstream translations", async ({
	page,
}) => {
	await page.setViewportSize({ width: 1400, height: 900 });
	await page.goto("/?example=menubar");
	for (const [language, file, share, side] of [
		["ar", "ملف", "مشاركة", "left"],
		["en", "File", "Share", "right"],
	] as const) {
		if (language === "en") {
			await page.getByRole("combobox", { name: "Language", exact: true }).click();
			await page.getByRole("option", { name: "English", exact: true }).click();
		}
		await page.getByRole("menuitem", { name: file, exact: true }).click();
		const trigger = page.getByRole("menuitem", { name: share, exact: true });
		await trigger.focus();
		await trigger.press(language === "ar" ? "ArrowLeft" : "ArrowRight");
		await expect(page.locator('[data-slot="menubar-sub-content"]')).toHaveAttribute(
			"data-side",
			side
		);
		await page.screenshot({
			animations: "disabled",
			path: `test-results/completion-menubar-${language}.png`,
		});
		await page.keyboard.press("Escape");
		await page.keyboard.press("Escape");
	}
	await page.getByRole("combobox", { name: "Language", exact: true }).click();
	await page.getByRole("option", { name: "Hebrew (עברית)", exact: true }).click();
	await page.getByRole("menuitem", { name: "תצוגה", exact: true }).click();
	await expect(page.getByRole("menuitem", { name: "רענן ⌘R", exact: true })).toBeVisible();
	await expect(page.getByRole("menuitem", { name: "רענן בכוח ⇧⌘R", exact: true })).toBeVisible();
});

test("resizable dragging works when document and group directions match", async ({ page }) => {
	for (const direction of ["rtl", "ltr"] as const) {
		await page.goto("/?example=resizable");
		if (direction === "ltr") {
			await page.getByRole("combobox", { name: "Language", exact: true }).click();
			await page.getByRole("option", { name: "English", exact: true }).click();
		}
		await page.evaluate((dir) => {
			document.documentElement.dir = dir;
		}, direction);
		const group = page.locator('[data-pane-group][data-direction="horizontal"]');
		const first = group.locator(":scope > [data-pane]").first();
		const handle = group.locator(":scope > [data-pane-resizer]");
		await handle.hover();
		const box = (await handle.boundingBox())!;
		const width = (await first.boundingBox())!.width;
		await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
		await page.mouse.down();
		await expect(handle).toHaveAttribute("data-active", "pointer");
		await page.mouse.move(box.x + (direction === "rtl" ? -40 : 40), box.y + box.height / 2, {
			steps: 8,
		});
		await page.mouse.up();
		await expect.poll(async () => (await first.boundingBox())!.width).toBeGreaterThan(width + 20);
		await page.getByTestId("rtl-example").screenshot({
			animations: "disabled",
			path: `test-results/completion-resizable-${direction}.png`,
		});
	}
});

test("nested RTL resizing records Paneforge's document-direction limitation", async ({ page }) => {
	await page.goto("/?example=resizable");
	await expect(page.locator("html")).not.toHaveAttribute("dir", "rtl");
	const group = page.locator('[data-pane-group][data-direction="horizontal"]');
	await expect(group).toHaveCSS("direction", "rtl");
	const first = group.locator(":scope > [data-pane]").first();
	const handle = group.locator(":scope > [data-pane-resizer]");
	await handle.hover();
	const box = (await handle.boundingBox())!;
	const width = (await first.boundingBox())!.width;
	await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
	await page.mouse.down();
	await expect(handle).toHaveAttribute("data-active", "pointer");
	await page.mouse.move(box.x - 40, box.y + box.height / 2, { steps: 8 });
	await page.mouse.up();
	// This should expand in RTL. Paneforge currently shrinks because document.dir is LTR.
	await expect.poll(async () => (await first.boundingBox())!.width).toBeLessThan(width - 20);
});
