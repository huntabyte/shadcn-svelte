import puppeteer from "puppeteer";

const BLOCKS = [
	"login-01",
	"sidebar-01",
	"sidebar-02",
	"sidebar-03",
	"sidebar-04",
	"sidebar-05",
	"sidebar-06",
	"sidebar-07",
	"sidebar-08",
	"sidebar-09",
	"sidebar-10",
	"sidebar-11",
	"sidebar-12",
	"sidebar-13",
	"sidebar-14",
	"sidebar-15",
	"sidebar-demo",
	"sidebar-header",
	"sidebar-footer",
	"sidebar-group",
	"sidebar-group-collapsible",
	"sidebar-group-action",
	"sidebar-menu",
	"sidebar-menu-action",
	"sidebar-menu-sub",
	"sidebar-menu-collapsible",
	"sidebar-menu-badge",
	"sidebar-controlled",
];

try {
	const browser = await puppeteer.launch({
		defaultViewport: {
			width: 1440,
			height: 900,
			deviceScaleFactor: 2,
		},
	});

	console.log("☀️ Capturing screenshots for light theme");
	for (const block of BLOCKS) {
		const pageUrl = `http://localhost:5173/blocks/${block}`;
		console.log(`- ${block}`);

		const page = await browser.newPage();
		await page.goto(pageUrl, {
			waitUntil: "networkidle2",
		});

		// Hide Tailwind indicator
		await page.evaluate(() => {
			const indicator = document.querySelector("[data-tailwind-indicator]");
			if (indicator) {
				indicator.remove();
			}
			localStorage.setItem("mode-watcher-mode", "light");
		});

		await page.screenshot({
			path: `./static/img/blocks/${block}.png`,
		});
	}

	console.log("🌙 Capturing screenshots for dark theme");
	for (const block of BLOCKS) {
		const pageUrl = `http://localhost:5173/blocks/${block}`;
		console.log(`- ${block}`);

		const page = await browser.newPage();
		await page.goto(pageUrl, {
			waitUntil: "networkidle2",
		});

		// Hide Tailwind indicator
		await page.evaluate(() => {
			const indicator = document.querySelector("[data-tailwind-indicator]");
			if (indicator) {
				indicator.remove();
			}
		});

		// Set theme to dark
		await page.evaluate(() => {
			localStorage.setItem("mode-watcher-mode", "dark");
		});

		await page.screenshot({
			path: `./static/img/blocks/${block}-dark.png`,
		});
	}

	await browser.close();
	console.log("✅ Done!");
} catch (error) {
	console.error(error);
	process.exit(1);
}
