import { test, expect } from "@playwright/test";

test("upstream card copy responds to preview language", async ({ page }) => {
	await page.goto("/?example=card");
	await expect(page.getByText("تسجيل الدخول إلى حسابك", { exact: true })).toBeVisible();
	await page.getByRole("combobox", { name: "Language", exact: true }).click();
	await page.getByRole("option", { name: "English", exact: true }).click();
	await expect(page.getByText("Login to your account", { exact: true })).toBeVisible();
	await expect(page.getByLabel("Email", { exact: true })).toHaveAttribute(
		"placeholder",
		"m@example.com"
	);
});
test("multi-category combobox filters, selects and removes Arabic chips", async ({ page }) => {
	await page.goto("/?example=combobox");
	const input = page.getByPlaceholder("أضف فئات");
	await input.fill("تصميم");
	await page.getByRole("option", { name: "التصميم", exact: true }).click();
	await expect(input).toHaveValue("");
	const remove = page.getByRole("button", { name: "التصميم", exact: true });
	await expect(remove).toBeVisible();
	await remove.click();
	await expect(remove).toHaveCount(0);
});
test("localized data table filters the original payments", async ({ page }) => {
	await page.goto("/?example=data-table");
	await page.getByPlaceholder("تصفية البريد الإلكتروني...").fill("ken99");
	await expect(page.getByRole("row")).toHaveCount(2);
	await expect(page.getByRole("cell", { name: "ken99@example.com", exact: true })).toBeVisible();
});
test("date picker preserves upstream width and opens an RTL calendar", async ({ page }) => {
	await page.goto("/?example=date-picker");
	const trigger = page.getByRole("button", { name: "اختر تاريخًا", exact: true });
	await expect(trigger).toHaveCSS("width", "212px");
	await trigger.click();
	const calendar = page.locator("[data-calendar-root]");
	await expect(calendar).toBeVisible();
	await expect(calendar).toHaveCSS("direction", "rtl");
	await page.keyboard.press("Escape");
	await expect(calendar).not.toBeVisible();
});
test("sidebar mirrors physical side and forwards RTL into its mobile sheet", async ({ page }) => {
	await page.setViewportSize({ width: 1200, height: 800 });
	await page.goto("/?example=sidebar");
	await expect(page.locator('[data-slot="sidebar-container"]')).toHaveAttribute(
		"data-side",
		"right"
	);
	await page.getByRole("combobox", { name: "Language", exact: true }).click();
	await page.getByRole("option", { name: "English", exact: true }).click();
	await expect(page.locator('[data-slot="sidebar-container"]')).toHaveAttribute(
		"data-side",
		"left"
	);
	await page.getByRole("combobox", { name: "Language", exact: true }).click();
	await page.getByRole("option", { name: "Arabic (العربية)", exact: true }).click();
	await page.setViewportSize({ width: 390, height: 844 });
	await page.getByRole("button", { name: "Toggle Sidebar", exact: true }).click();
	await expect(page.getByRole("dialog")).toHaveAttribute("dir", "rtl");
	await page.keyboard.press("Escape");
	await expect(page.getByRole("dialog")).not.toBeVisible();
});
