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
