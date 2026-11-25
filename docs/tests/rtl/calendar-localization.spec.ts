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
	await expect(preview.getByRole("columnheader", { name: "شنبه", exact: true })).toHaveText("ش");
	const selected = calendar.locator("[data-calendar-day][data-selected]");
	await expect(selected).toHaveText("۲۲");
	await expect(selected).toHaveAttribute("data-value", "2025-06-12");
	await page.mouse.move(0, 0);
	const color = await selected.evaluate((node) => getComputedStyle(node).color);
	await selected.hover();
	await expect(selected).toHaveCSS("color", color);
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

test("numerals update day cells and dropdowns without replacing custom snippets or changing defaults", async ({
	page,
}) => {
	await page.goto("/?example=calendar-numerals");
	const calendar = page.getByTestId("number-calendar");
	const selected = calendar.locator("[data-calendar-day][data-selected]");
	const year = calendar.locator("select").nth(1);
	await expect(selected).toHaveText("۲۲");
	await expect(year.locator("option:checked")).toHaveText("۱۴۰۴");
	await page.getByRole("button", { name: "Latin numerals" }).click();
	await expect(selected).toHaveText("22");
	await expect(year.locator("option:checked")).toHaveText("1404");
	await page.getByRole("button", { name: "Arabic numerals" }).click();
	await expect(selected).toHaveText("٢٢");
	await expect(year.locator("option:checked")).toHaveText("١٤٠٤");
	await expect(
		page.getByTestId("custom-day-calendar").getByText("custom-22", { exact: true })
	).toBeVisible();
	await page.getByRole("button", { name: "Default numerals" }).click();
	await expect(selected).toHaveText("22");
});
