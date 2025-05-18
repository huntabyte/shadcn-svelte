import fs from "node:fs";
import path from "node:path";
import puppeteer, { Browser } from "puppeteer";
import { getAllBlockIds } from "../src/lib/blocks.js";

const SCREENSHOT_PATH = path.join(process.cwd(), "static/img/registry");

async function captureBlockScreenshot(browser: Browser, block: string) {
	const pageUrl = `http://localhost:5173/view/${block}`;
	const page = await browser.newPage();
	await page.goto(pageUrl);

	for (const theme of ["light", "dark"]) {
		const screenshotPath = path.join(SCREENSHOT_PATH, `${block}-${theme}.png`);
		if (fs.existsSync(screenshotPath)) {
			fs.unlinkSync(screenshotPath);
		}

		await page.evaluate((currentTheme) => {
			localStorage.setItem("mode-watcher-mode", currentTheme);
		}, theme);

		await page.reload({ waitUntil: "networkidle2" });

		if (block.startsWith("chart") || block.startsWith("dashboard")) {
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}

		await page.evaluate(() => {
			const indicator = document.querySelector("[data-tailwind-indicator]");
			if (indicator) indicator.remove();
		});

		await page.screenshot({ path: screenshotPath });
	}

	await page.close();
}

async function captureScreenshots() {
	// if the screenshot path doesn't exist, create it
	if (!fs.existsSync(SCREENSHOT_PATH)) {
		fs.mkdirSync(SCREENSHOT_PATH, { recursive: true });
	}

	const blocks = getAllBlockIds();

	const browser = await puppeteer.launch({
		defaultViewport: {
			width: 1440,
			height: 900,
			deviceScaleFactor: 2,
		},
	});

	for (const block of blocks) {
		await captureBlockScreenshot(browser, block);
		console.log(`✅ Captured ${block}`);
	}

	await browser.close();
}

try {
	console.log("🎬 Capturing registry screenshots...");
	await captureScreenshots();
	console.log("✨ Done!");
} catch (error) {
	console.error("❌ Error:", error);
	process.exit(1);
}
