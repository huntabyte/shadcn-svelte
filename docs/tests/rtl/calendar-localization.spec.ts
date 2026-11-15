import { test, expect } from "@playwright/test";

test("Persian calendar localizes Jalali dates and records the current Bits horizontal-key limitation", async ({
	page,
}) => {
	await page.goto("/?example=persian-calendar");
	const preview = page.getByTestId("rtl-example");
	const calendar = preview.locator("[data-calendar-root]");
	await expect(calendar).toBeVisible();
	await expect(calendar).toHaveCSS("direction", "rtl");
	await expect(preview).toContainText("۱۴۰۴");
	await expect(preview).toContainText("خرداد");
	await expect(preview.locator("th")).toHaveText(["ش", "۱ش", "۲ش", "۳ش", "۴ش", "۵ش", "ج"]);
	const selected = calendar.locator("[data-calendar-day][data-selected]");
	await expect(selected).toHaveText("۲۲");
	await selected.focus();
	await page.keyboard.press("ArrowLeft");
	// Bits currently maps Left to -1 even in RTL (shared Calendar/RangeCalendar helper).
	await expect(calendar.locator(":focus")).toHaveText("۲۱");
	await page.keyboard.press("ArrowRight");
	await expect(selected).toBeFocused();
	await preview.screenshot({ path: "test-results/persian-calendar.png", animations: "disabled" });
	await calendar.locator("[data-calendar-next-button]").click();
	await expect(preview).toContainText("تیر");
	await calendar.locator("[data-calendar-prev-button]").click();
	await expect(preview).toContainText("خرداد");
});

test("calendar RTL example keeps distinct localized weekday labels", async ({ page }) => {
	await page.goto("/?example=calendar");
	const headings = page.getByTestId("rtl-example").locator("th");
	await expect(headings).toHaveText(["ح", "ن", "ث", "ر", "خ", "ج", "س"]);
	await page.getByRole("combobox", { name: "Language", exact: true }).click();
	await page.getByRole("option", { name: "Hebrew (עברית)", exact: true }).click();
	await expect(headings).toHaveText(["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"]);
	await page.getByRole("combobox", { name: "Language", exact: true }).click();
	await page.getByRole("option", { name: "English", exact: true }).click();
	await expect(headings).toHaveText(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);
});
