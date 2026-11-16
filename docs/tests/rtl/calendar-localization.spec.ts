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
	await expect(preview.locator("th")).toHaveText(["ش", "ی", "د", "س", "چ", "پ", "ج"]);
	await expect(preview.getByRole("columnheader", { name: "شنبه", exact: true })).toHaveText("ش");
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

test("Islamic Hijri example uses Umm al-Qura dates and locale-generated labels", async ({
	page,
}) => {
	await page.goto("/?example=hijri-calendar");
	const preview = page.getByTestId("rtl-example");
	const calendar = preview.locator("[data-calendar-root]");
	await expect(calendar).toHaveCSS("direction", "rtl");
	await expect(preview).toContainText("١٤٤٦");
	const selected = calendar.locator("[data-calendar-day][data-selected]");
	await expect(selected).toHaveAttribute("data-value", "2025-06-12");
	await expect(selected).toHaveText("١٦");
	await expect(preview.locator("th")).toHaveText(["ح", "ن", "ث", "ر", "خ", "ج", "س"]);
	await preview.screenshot({ path: "test-results/hijri-calendar.png", animations: "disabled" });
});

for (const [timeZone, instant] of [
	["America/Los_Angeles", "2025-06-20T07:00:00.000Z"],
	["Asia/Tokyo", "2025-06-19T15:00:00.000Z"],
]) {
	test.describe(timeZone, () => {
		test.use({ timezoneId: timeZone });
		test("selected date converts to midnight in the detected client time zone without an offset", async ({
			page,
		}) => {
			const errors: string[] = [];
			page.on("pageerror", (error) => errors.push(error.message));
			await page.clock.install({ time: new Date("2025-06-12T00:30:00.000Z") });
			await page.goto("/?example=calendar-timezone");
			const preview = page.getByTestId("rtl-example");
			await expect(preview).toContainText(`Time zone: ${timeZone}`);
			await expect(preview.getByRole("status")).toHaveText("No date selected.");
			await expect(preview.locator("[data-calendar-day][data-today]")).toHaveAttribute(
				"data-value",
				timeZone === "America/Los_Angeles" ? "2025-06-11" : "2025-06-12"
			);
			const selected = preview.locator('[data-calendar-day][data-value="2025-06-20"]');
			await selected.click();
			await expect(selected).toHaveAttribute("data-selected", "");
			await page.mouse.move(0, 0);
			const color = await selected.evaluate((node) => getComputedStyle(node).color);
			await selected.hover();
			await expect(selected).toHaveCSS("color", color);
			await expect(preview.locator("time")).toHaveAttribute("datetime", instant);
			await expect(preview.locator("time")).toHaveText("Friday, June 20, 2025");
			expect(errors).toEqual([]);
			await preview.screenshot({
				path: `test-results/timezone-${timeZone.replaceAll("/", "-")}.png`,
				animations: "disabled",
			});
		});
	});
}
