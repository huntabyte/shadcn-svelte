import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
});

test("provider aliases, nesting, reactivity, fallback and other BitsConfig options", async ({
	page,
}) => {
	await expect(page.getByTestId("fallback")).toHaveText("ltr");
	await expect(page.getByTestId("outer")).toHaveText("rtl");
	await expect(page.getByTestId("inherited")).toHaveText("rtl");
	await expect(page.getByTestId("override")).toHaveText("ltr");
	await expect(page.getByTestId("outer")).toHaveAttribute("data-locale", "ar");
	await expect(page.getByTestId("outer")).toHaveAttribute("data-portal", "#portal-target");
	await page.getByRole("button", { name: "Toggle provider" }).click();
	await expect(page.getByTestId("inherited")).toHaveText("ltr");
	await page.getByRole("button", { name: "Toggle provider" }).click();
	await page.getByRole("button", { name: "Inherit direction" }).click();
	await expect(page.getByTestId("override")).toHaveText("rtl");
});

test("slider provider direction and explicit override control arrow keys", async ({ page }) => {
	const inherited = page.locator('[aria-label="Provider volume"]').getByRole("slider");
	await inherited.focus();
	await inherited.press("ArrowLeft");
	await expect(inherited).toHaveAttribute("aria-valuenow", "51");
	const override = page.locator('[aria-label="Override volume"]').getByRole("slider");
	await override.focus();
	await override.press("ArrowLeft");
	await expect(override).toHaveAttribute("aria-valuenow", "49");
	await page.getByRole("button", { name: "Toggle provider" }).click();
	await inherited.focus();
	await inherited.press("ArrowLeft");
	await expect(inherited).toHaveAttribute("aria-valuenow", "50");
});

test("tabs, mirrored icons, switch and portalled submenu in both directions", async ({ page }) => {
	const demo = page.getByTestId("direction-demo");
	for (const dir of ["rtl", "ltr"] as const) {
		await expect(demo).toHaveAttribute("dir", dir);
		const tabs = demo.getByRole("tab");
		await tabs.first().focus();
		await tabs.first().press(dir === "rtl" ? "ArrowLeft" : "ArrowRight");
		await expect(tabs.nth(1)).toBeFocused();
		const icon = demo.locator('[data-slot="breadcrumb-separator"] svg');
		await expect(icon).toHaveCSS("rotate", dir === "rtl" ? "180deg" : "none");
		const toggle = demo.getByRole("switch");
		const thumb = toggle.locator('[data-slot="switch-thumb"]');
		await toggle.setChecked(false);
		const before = (await thumb.boundingBox())!.x;
		await toggle.setChecked(true);
		if (dir === "rtl")
			await expect.poll(async () => (await thumb.boundingBox())!.x).toBeLessThan(before - 1);
		else await expect.poll(async () => (await thumb.boundingBox())!.x).toBeGreaterThan(before + 1);
		await toggle.setChecked(false);
		await demo.locator('[data-slot="dropdown-menu-trigger"]').click();
		const menu = page.locator('[data-slot="dropdown-menu-content"]');
		await expect(menu).toHaveCSS("direction", dir);
		const sub = menu.locator('[data-slot="dropdown-menu-sub-trigger"]');
		await sub.focus();
		await sub.press(dir === "rtl" ? "ArrowLeft" : "ArrowRight");
		const submenu = page.locator('[data-slot="dropdown-menu-sub-content"]');
		await expect(submenu).toBeVisible();
		await expect(submenu).toHaveAttribute("data-side", dir === "rtl" ? "left" : "right");
		await page.keyboard.press("Escape");
		await page.keyboard.press("Escape");
		if (dir === "rtl") await page.getByRole("button", { name: "Switch to LTR" }).click();
	}
});

test("carousel follows provider and reverses keyboard controls on live changes", async ({
	page,
}) => {
	const carousel = page.locator('[data-slot="carousel"]');
	await expect(carousel).toHaveAttribute("dir", "rtl");
	const next = page.getByRole("button", { name: "Next slide" });
	const previous = page.getByRole("button", { name: "Previous slide" });
	await expect(previous).toBeDisabled();
	await next.focus();
	await next.press("ArrowLeft");
	await expect(previous).toBeEnabled();
	await previous.press("ArrowRight");
	await expect(previous).toBeDisabled();
	await page.getByRole("button", { name: "Toggle provider" }).click();
	await expect(carousel).toHaveAttribute("dir", "ltr");
	await next.focus();
	await next.press("ArrowRight");
	await expect(previous).toBeEnabled();
});

test("calendar fallback arrows flip exactly once", async ({ page }) => {
	const calendar = page.getByTestId("calendar");
	const previous = calendar.locator("[data-calendar-prev-button]");
	await expect(previous).toHaveCSS("rotate", "none");
	await expect(previous.locator("svg")).toHaveCSS("rotate", "180deg");
	await page.getByRole("button", { name: "Toggle provider" }).click();
	await expect(previous.locator("svg")).toHaveCSS("rotate", "none");
});
