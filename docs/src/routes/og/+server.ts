import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";
import { html } from "satori-html";
import normal from "./geist-regular-otf.json" with { type: "json" };
import mono from "./geist-mono-otf.json" with { type: "json" };
import semibold from "./geist-semibold-otf.json" with { type: "json" };

function createTemplate(title: string | null, description: string | null) {
	return `<div
        tw="flex h-full w-full bg-black text-white"
		style="font-family: Geist Sans;"
      >
        <div tw="flex border absolute border-stone-700 border-dashed inset-y-0 left-16 w-[1px]" />
        <div tw="flex border absolute border-stone-700 border-dashed inset-y-0 right-16 w-[1px]" />
        <div tw="flex border absolute border-stone-700 inset-x-0 h-[1px] top-16" />
        <div tw="flex border absolute border-stone-700 inset-x-0 h-[1px] bottom-16" />
        <div tw="flex absolute flex-row bottom-24 right-24 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
			width="48"
			height="48"
          >
            <rect width="256" height="256" fill="none"></rect>
            <line
              x1="208"
              y1="128"
              x2="128"
              y2="208"
              fill="none"
              stroke="#EB4F27"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
            ></line>
            <line
              x1="192"
              y1="40"
              x2="40"
              y2="192"
              fill="none"
              stroke="#EB4F27"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
            ></line>
          </svg>
        </div>
        <div tw="flex flex-col absolute w-[896px] justify-center inset-32">
          <div
            tw="tracking-tight flex-grow-1 flex flex-col justify-center leading-[1.1]"
			style="text-wrap: balance; font-weight: 600; letter-spacing: -0.04em; font-size: ${title && title.length > 20 ? 64 : 80}px"
          >
            ${title}
          </div>
          <div
            tw="text-[40px] leading-[1.5] flex-grow-1 text-stone-400"
			style="font-weight: 500; text-wrap: balance;"
          >
            ${description}
          </div>
        </div>
      </div>`;
}

function getAssets() {
	return [
		{
			name: "Geist",
			data: Buffer.from(normal.base64Font, "base64"),
			weight: 400 as const,
			style: "normal" as const,
		},
		{
			name: "Geist Mono",
			data: Buffer.from(mono.base64Font, "base64"),
			weight: 400 as const,
			style: "normal" as const,
		},
		{
			name: "Geist",
			data: Buffer.from(semibold.base64Font, "base64"),
			weight: 600 as const,
			style: "normal" as const,
		},
	];
}

export async function GET({ url }: { url: URL }) {
	const title = url.searchParams.get("title");
	const description = url.searchParams.get("description");

	return new ImageResponse(html(createTemplate(title, description)), {
		fonts: getAssets(),
		width: 1200,
		height: 630,
	});
}
