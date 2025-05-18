import fs from "node:fs";
import promises from "node:fs/promises";
import path from "node:path";
import puppeteer, { Browser } from "puppeteer";
import { globby } from "globby";
import sharp from "sharp";

import { getAllBlockIds } from "../src/lib/blocks.js";

const SCREENSHOT_PATH = path.join(process.cwd(), "static/img/registry");

async function captureBlockScreenshot(browser: Browser, block: string) {
	const pageUrl = `http://localhost:5173/view/${block}`;
	const page = await browser.newPage();
	await page.goto(pageUrl);

	for (const theme of ["light", "dark"]) {
		const screenshotPath = path.join(SCREENSHOT_PATH, `${block}-${theme}-uncompressed.png`);
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

async function compressImages(): Promise<void> {
	const files = await globby([`${SCREENSHOT_PATH}/**/*-uncompressed.png`], { absolute: true });

	await Promise.all(
		files.map(async (file) => {
			const beforeStat = await promises.stat(file);
			const beforeKB = (beforeStat.size / 1024).toFixed(1);

			console.log(`🔄 Compressing ${path.basename(file)} (before: ${beforeKB} KB)…`);
			const out = file.replace("-uncompressed", "");
			await sharp(file).png({ compressionLevel: 9, quality: 75 }).toFile(out);

			const afterStat = await promises.stat(out);
			const afterKB = (afterStat.size / 1024).toFixed(1);
			const delta = (((afterStat.size - beforeStat.size) / beforeStat.size) * 100).toFixed(1);

			fs.unlinkSync(file);

			console.log(
				`✅ ${path.basename(file)}: ${beforeKB} KB → ${afterKB} KB (${delta}% change)`
			);
		})
	);
}

try {
	console.log("🎬 Capturing registry screenshots...");
	await captureScreenshots();
	console.log("⚙️ Converting PNGs to WebP...");
	await compressImages();
	console.log("✨ Done!");
} catch (error) {
	console.error("❌ Error:", error);
	process.exit(1);
}
