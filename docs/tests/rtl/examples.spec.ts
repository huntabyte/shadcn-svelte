import { test, expect } from "@playwright/test";
import coverage from "../../rtl-port-coverage.json" with { type: "json" };
for (const example of coverage.examples) {
	test(`${example.name}: source RTL example renders and switches languages`, async ({ page }) => {
		const errors: string[] = [];
		page.on("pageerror", (e) => errors.push(e.message));
		await page.goto(`/?example=${example.name}`);
		const preview = page.getByTestId("rtl-example");
		await expect(preview).toBeVisible();
		if (example.translationMode === "static bilingual comparison") {
			await expect(preview.locator('[dir="ltr"]')).toBeVisible();
			await expect(preview.locator('[dir="rtl"]')).toBeVisible();
			await preview.screenshot({
				animations: "disabled",
				path: `test-results/rtl-screenshots/${example.name}.png`,
			});
			expect(errors).toEqual([]);
			return;
		}
		await expect(page.locator('[data-lang="ar"]').filter({ has: preview })).toHaveAttribute(
			"dir",
			"rtl"
		);
		for (const [label, lang, dir] of [
			["English", "en", "ltr"],
			["Hebrew (עברית)", "he", "rtl"],
			["Arabic (العربية)", "ar", "rtl"],
		]) {
			await page.getByRole("combobox", { name: "Language", exact: true }).click();
			const popupId = await page
				.getByRole("combobox", { name: "Language", exact: true })
				.getAttribute("aria-controls");
			await page.getByRole("option", { name: label, exact: true }).click();
			await expect(page.locator(`[id="${popupId}"]`)).not.toBeVisible();
			await expect(page.locator(`[data-lang="${lang}"]`).filter({ has: preview })).toHaveAttribute(
				"dir",
				dir
			);
		}
		if (example.name === "sidebar")
			await page.screenshot({
				animations: "disabled",
				path: `test-results/rtl-screenshots/${example.name}.png`,
				fullPage: true,
			});
		else
			await preview.screenshot({
				animations: "disabled",
				path: `test-results/rtl-screenshots/${example.name}.png`,
			});
		expect(errors).toEqual([]);
	});
}
