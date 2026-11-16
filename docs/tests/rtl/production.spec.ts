import { test, expect } from "@playwright/test";

async function language(page: import("@playwright/test").Page, english: boolean) {
	if (!english) return;
	await page.getByRole("combobox", { name: "Language", exact: true }).click();
	await page.getByRole("option", { name: "English", exact: true }).click();
}

test("localized dialog has a name, traps keyboard focus and restores its trigger", async ({
	page,
}) => {
	for (const english of [false, true]) {
		await page.goto("/?example=dialog");
		await language(page, english);
		const trigger = page.getByTestId("rtl-example").getByRole("button");
		await trigger.focus();
		await page.keyboard.press("Enter");
		const dialog = page.getByRole("dialog");
		await expect(dialog).toHaveAccessibleName(english ? "Edit profile" : "تعديل الملف الشخصي");
		await expect(dialog).toHaveCSS("direction", english ? "ltr" : "rtl");
		await expect(dialog.getByLabel(english ? "Name" : "الاسم", { exact: true })).toBeFocused();
		for (let i = 0; i < 8; i++) {
			await page.keyboard.press("Tab");
			await expect
				.poll(() => dialog.evaluate((node) => node.contains(document.activeElement)))
				.toBe(true);
		}
		await page.keyboard.press("Escape");
		await expect(dialog).not.toBeVisible();
		await expect(trigger).toBeFocused();
	}
});

test("portalled popovers inherit locale direction and return keyboard focus", async ({ page }) => {
	for (const english of [false, true]) {
		await page.goto("/?example=popover");
		await language(page, english);
		const preview = page.getByTestId("rtl-example");
		const trigger = preview.getByRole("button").first();
		await trigger.focus();
		await page.keyboard.press("Enter");
		const content = page.locator('[data-slot="popover-content"]');
		await expect(content).toBeVisible();
		await expect(content).toHaveCSS("direction", english ? "ltr" : "rtl");
		await expect(preview.locator('[data-slot="popover-content"]')).toHaveCount(0);
		await page.keyboard.press("Escape");
		await expect(content).not.toBeVisible();
		await expect(trigger).toBeFocused();
	}
});

test("keyboard tooltips carry provider direction through their portal", async ({ page }) => {
	for (const english of [false, true]) {
		await page.goto("/?example=tooltip");
		await language(page, english);
		const preview = page.getByTestId("rtl-example");
		const trigger = preview.getByRole("button").first();
		await trigger.focus();
		const tooltip = page.getByRole("tooltip");
		await expect(tooltip).toHaveText(english ? "Add to library" : "إضافة إلى المكتبة");
		await expect(tooltip).toHaveCSS("direction", english ? "ltr" : "rtl");
		await expect(preview.getByRole("tooltip")).toHaveCount(0);
		await expect(trigger).toHaveAttribute("aria-describedby", (await tooltip.getAttribute("id"))!);
		await page.keyboard.press("Escape");
		await expect(tooltip).not.toBeVisible();
		await expect(trigger).toBeFocused();
	}
});
