// Function to convert hex to RGB
function hexToRGB(hex: string): string {
	const r = Number.parseInt(hex.slice(1, 3), 16);
	const g = Number.parseInt(hex.slice(3, 5), 16);
	const b = Number.parseInt(hex.slice(5, 7), 16);
	return `rgb(${r}, ${g}, ${b})`;
}

// Function to convert hex to HSL
function hexToHSL(hex: string): string {
	const r = Number.parseInt(hex.slice(1, 3), 16) / 255;
	const g = Number.parseInt(hex.slice(3, 5), 16) / 255;
	const b = Number.parseInt(hex.slice(5, 7), 16) / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h: number = 0;
	let s: number = 0;
	const l: number = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return `hsl(${(h * 360).toFixed(0)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%)`;
}

// Function to create a color entry with all formats
function createColorEntry(className: string, hex: string) {
	return {
		className,
		hex,
		hsl: hexToHSL(hex),
		rgb: hexToRGB(hex),
	};
}

// Updated color data with correct Tailwind CSS colors
export const colorData = {
	slate: {
		50: createColorEntry("slate-50", "#f8fafc"),
		100: createColorEntry("slate-100", "#f1f5f9"),
		200: createColorEntry("slate-200", "#e2e8f0"),
		300: createColorEntry("slate-300", "#cbd5e1"),
		400: createColorEntry("slate-400", "#94a3b8"),
		500: createColorEntry("slate-500", "#64748b"),
		600: createColorEntry("slate-600", "#475569"),
		700: createColorEntry("slate-700", "#334155"),
		800: createColorEntry("slate-800", "#1e293b"),
		900: createColorEntry("slate-900", "#0f172a"),
		950: createColorEntry("slate-950", "#020617"),
	},
	gray: {
		50: createColorEntry("gray-50", "#f9fafb"),
		100: createColorEntry("gray-100", "#f3f4f6"),
		200: createColorEntry("gray-200", "#e5e7eb"),
		300: createColorEntry("gray-300", "#d1d5db"),
		400: createColorEntry("gray-400", "#9ca3af"),
		500: createColorEntry("gray-500", "#6b7280"),
		600: createColorEntry("gray-600", "#4b5563"),
		700: createColorEntry("gray-700", "#374151"),
		800: createColorEntry("gray-800", "#1f2937"),
		900: createColorEntry("gray-900", "#111827"),
		950: createColorEntry("gray-950", "#030712"),
	},
	zinc: {
		50: createColorEntry("zinc-50", "#fafafa"),
		100: createColorEntry("zinc-100", "#f4f4f5"),
		200: createColorEntry("zinc-200", "#e4e4e7"),
		300: createColorEntry("zinc-300", "#d4d4d8"),
		400: createColorEntry("zinc-400", "#a1a1aa"),
		500: createColorEntry("zinc-500", "#71717a"),
		600: createColorEntry("zinc-600", "#52525b"),
		700: createColorEntry("zinc-700", "#3f3f46"),
		800: createColorEntry("zinc-800", "#27272a"),
		900: createColorEntry("zinc-900", "#18181b"),
		950: createColorEntry("zinc-950", "#09090b"),
	},
	neutral: {
		50: createColorEntry("neutral-50", "#fafafa"),
		100: createColorEntry("neutral-100", "#f5f5f5"),
		200: createColorEntry("neutral-200", "#e5e5e5"),
		300: createColorEntry("neutral-300", "#d4d4d4"),
		400: createColorEntry("neutral-400", "#a3a3a3"),
		500: createColorEntry("neutral-500", "#737373"),
		600: createColorEntry("neutral-600", "#525252"),
		700: createColorEntry("neutral-700", "#404040"),
		800: createColorEntry("neutral-800", "#262626"),
		900: createColorEntry("neutral-900", "#171717"),
		950: createColorEntry("neutral-950", "#0a0a0a"),
	},
	stone: {
		50: createColorEntry("stone-50", "#fafaf9"),
		100: createColorEntry("stone-100", "#f5f5f4"),
		200: createColorEntry("stone-200", "#e7e5e4"),
		300: createColorEntry("stone-300", "#d6d3d1"),
		400: createColorEntry("stone-400", "#a8a29e"),
		500: createColorEntry("stone-500", "#78716c"),
		600: createColorEntry("stone-600", "#57534e"),
		700: createColorEntry("stone-700", "#44403c"),
		800: createColorEntry("stone-800", "#292524"),
		900: createColorEntry("stone-900", "#1c1917"),
		950: createColorEntry("stone-950", "#0c0a09"),
	},
	red: {
		50: createColorEntry("red-50", "#fef2f2"),
		100: createColorEntry("red-100", "#fee2e2"),
		200: createColorEntry("red-200", "#fecaca"),
		300: createColorEntry("red-300", "#fca5a5"),
		400: createColorEntry("red-400", "#f87171"),
		500: createColorEntry("red-500", "#ef4444"),
		600: createColorEntry("red-600", "#dc2626"),
		700: createColorEntry("red-700", "#b91c1c"),
		800: createColorEntry("red-800", "#991b1b"),
		900: createColorEntry("red-900", "#7f1d1d"),
		950: createColorEntry("red-950", "#450a0a"),
	},
	orange: {
		50: createColorEntry("orange-50", "#fff7ed"),
		100: createColorEntry("orange-100", "#ffedd5"),
		200: createColorEntry("orange-200", "#fed7aa"),
		300: createColorEntry("orange-300", "#fdba74"),
		400: createColorEntry("orange-400", "#fb923c"),
		500: createColorEntry("orange-500", "#f97316"),
		600: createColorEntry("orange-600", "#ea580c"),
		700: createColorEntry("orange-700", "#c2410c"),
		800: createColorEntry("orange-800", "#9a3412"),
		900: createColorEntry("orange-900", "#7c2d12"),
		950: createColorEntry("orange-950", "#431407"),
	},
	amber: {
		50: createColorEntry("amber-50", "#fffbeb"),
		100: createColorEntry("amber-100", "#fef3c7"),
		200: createColorEntry("amber-200", "#fde68a"),
		300: createColorEntry("amber-300", "#fcd34d"),
		400: createColorEntry("amber-400", "#fbbf24"),
		500: createColorEntry("amber-500", "#f59e0b"),
		600: createColorEntry("amber-600", "#d97706"),
		700: createColorEntry("amber-700", "#b45309"),
		800: createColorEntry("amber-800", "#92400e"),
		900: createColorEntry("amber-900", "#78350f"),
		950: createColorEntry("amber-950", "#451a03"),
	},
	yellow: {
		50: createColorEntry("yellow-50", "#fefce8"),
		100: createColorEntry("yellow-100", "#fef9c3"),
		200: createColorEntry("yellow-200", "#fef08a"),
		300: createColorEntry("yellow-300", "#fde047"),
		400: createColorEntry("yellow-400", "#facc15"),
		500: createColorEntry("yellow-500", "#eab308"),
		600: createColorEntry("yellow-600", "#ca8a04"),
		700: createColorEntry("yellow-700", "#a16207"),
		800: createColorEntry("yellow-800", "#854d0e"),
		900: createColorEntry("yellow-900", "#713f12"),
		950: createColorEntry("yellow-950", "#422006"),
	},
	lime: {
		50: createColorEntry("lime-50", "#f7fee7"),
		100: createColorEntry("lime-100", "#ecfccb"),
		200: createColorEntry("lime-200", "#d9f99d"),
		300: createColorEntry("lime-300", "#bef264"),
		400: createColorEntry("lime-400", "#a3e635"),
		500: createColorEntry("lime-500", "#84cc16"),
		600: createColorEntry("lime-600", "#65a30d"),
		700: createColorEntry("lime-700", "#4d7c0f"),
		800: createColorEntry("lime-800", "#3f6212"),
		900: createColorEntry("lime-900", "#365314"),
		950: createColorEntry("lime-950", "#1a2e05"),
	},
	green: {
		50: createColorEntry("green-50", "#f0fdf4"),
		100: createColorEntry("green-100", "#dcfce7"),
		200: createColorEntry("green-200", "#bbf7d0"),
		300: createColorEntry("green-300", "#86efac"),
		400: createColorEntry("green-400", "#4ade80"),
		500: createColorEntry("green-500", "#22c55e"),
		600: createColorEntry("green-600", "#16a34a"),
		700: createColorEntry("green-700", "#15803d"),
		800: createColorEntry("green-800", "#166534"),
		900: createColorEntry("green-900", "#14532d"),
		950: createColorEntry("green-950", "#052e16"),
	},
	emerald: {
		50: createColorEntry("emerald-50", "#ecfdf5"),
		100: createColorEntry("emerald-100", "#d1fae5"),
		200: createColorEntry("emerald-200", "#a7f3d0"),
		300: createColorEntry("emerald-300", "#6ee7b7"),
		400: createColorEntry("emerald-400", "#34d399"),
		500: createColorEntry("emerald-500", "#10b981"),
		600: createColorEntry("emerald-600", "#059669"),
		700: createColorEntry("emerald-700", "#047857"),
		800: createColorEntry("emerald-800", "#065f46"),
		900: createColorEntry("emerald-900", "#064e3b"),
		950: createColorEntry("emerald-950", "#022c22"),
	},
	teal: {
		50: createColorEntry("teal-50", "#f0fdfa"),
		100: createColorEntry("teal-100", "#ccfbf1"),
		200: createColorEntry("teal-200", "#99f6e4"),
		300: createColorEntry("teal-300", "#5eead4"),
		400: createColorEntry("teal-400", "#2dd4bf"),
		500: createColorEntry("teal-500", "#14b8a6"),
		600: createColorEntry("teal-600", "#0d9488"),
		700: createColorEntry("teal-700", "#0f766e"),
		800: createColorEntry("teal-800", "#115e59"),
		900: createColorEntry("teal-900", "#134e4a"),
		950: createColorEntry("teal-950", "#042f2e"),
	},
	cyan: {
		50: createColorEntry("cyan-50", "#ecfeff"),
		100: createColorEntry("cyan-100", "#cffafe"),
		200: createColorEntry("cyan-200", "#a5f3fc"),
		300: createColorEntry("cyan-300", "#67e8f9"),
		400: createColorEntry("cyan-400", "#22d3ee"),
		500: createColorEntry("cyan-500", "#06b6d4"),
		600: createColorEntry("cyan-600", "#0891b2"),
		700: createColorEntry("cyan-700", "#0e7490"),
		800: createColorEntry("cyan-800", "#155e75"),
		900: createColorEntry("cyan-900", "#164e63"),
		950: createColorEntry("cyan-950", "#083344"),
	},
	sky: {
		50: createColorEntry("sky-50", "#f0f9ff"),
		100: createColorEntry("sky-100", "#e0f2fe"),
		200: createColorEntry("sky-200", "#bae6fd"),
		300: createColorEntry("sky-300", "#7dd3fc"),
		400: createColorEntry("sky-400", "#38bdf8"),
		500: createColorEntry("sky-500", "#0ea5e9"),
		600: createColorEntry("sky-600", "#0284c7"),
		700: createColorEntry("sky-700", "#0369a1"),
		800: createColorEntry("sky-800", "#075985"),
		900: createColorEntry("sky-900", "#0c4a6e"),
		950: createColorEntry("sky-950", "#082f49"),
	},
	blue: {
		50: createColorEntry("blue-50", "#eff6ff"),
		100: createColorEntry("blue-100", "#dbeafe"),
		200: createColorEntry("blue-200", "#bfdbfe"),
		300: createColorEntry("blue-300", "#93c5fd"),
		400: createColorEntry("blue-400", "#60a5fa"),
		500: createColorEntry("blue-500", "#3b82f6"),
		600: createColorEntry("blue-600", "#2563eb"),
		700: createColorEntry("blue-700", "#1d4ed8"),
		800: createColorEntry("blue-800", "#1e40af"),
		900: createColorEntry("blue-900", "#1e3a8a"),
		950: createColorEntry("blue-950", "#172554"),
	},
	indigo: {
		50: createColorEntry("indigo-50", "#eef2ff"),
		100: createColorEntry("indigo-100", "#e0e7ff"),
		200: createColorEntry("indigo-200", "#c7d2fe"),
		300: createColorEntry("indigo-300", "#a5b4fc"),
		400: createColorEntry("indigo-400", "#818cf8"),
		500: createColorEntry("indigo-500", "#6366f1"),
		600: createColorEntry("indigo-600", "#4f46e5"),
		700: createColorEntry("indigo-700", "#4338ca"),
		800: createColorEntry("indigo-800", "#3730a3"),
		900: createColorEntry("indigo-900", "#312e81"),
		950: createColorEntry("indigo-950", "#1e1b4b"),
	},
	violet: {
		50: createColorEntry("violet-50", "#f5f3ff"),
		100: createColorEntry("violet-100", "#ede9fe"),
		200: createColorEntry("violet-200", "#ddd6fe"),
		300: createColorEntry("violet-300", "#c4b5fd"),
		400: createColorEntry("violet-400", "#a78bfa"),
		500: createColorEntry("violet-500", "#8b5cf6"),
		600: createColorEntry("violet-600", "#7c3aed"),
		700: createColorEntry("violet-700", "#6d28d9"),
		800: createColorEntry("violet-800", "#5b21b6"),
		900: createColorEntry("violet-900", "#4c1d95"),
		950: createColorEntry("violet-950", "#2e1065"),
	},
	purple: {
		50: createColorEntry("purple-50", "#faf5ff"),
		100: createColorEntry("purple-100", "#f3e8ff"),
		200: createColorEntry("purple-200", "#e9d5ff"),
		300: createColorEntry("purple-300", "#d8b4fe"),
		400: createColorEntry("purple-400", "#c084fc"),
		500: createColorEntry("purple-500", "#a855f7"),
		600: createColorEntry("purple-600", "#9333ea"),
		700: createColorEntry("purple-700", "#7e22ce"),
		800: createColorEntry("purple-800", "#6b21a8"),
		900: createColorEntry("purple-900", "#581c87"),
		950: createColorEntry("purple-950", "#3b0764"),
	},
	fuchsia: {
		50: createColorEntry("fuchsia-50", "#fdf4ff"),
		100: createColorEntry("fuchsia-100", "#fae8ff"),
		200: createColorEntry("fuchsia-200", "#f5d0fe"),
		300: createColorEntry("fuchsia-300", "#f0abfc"),
		400: createColorEntry("fuchsia-400", "#e879f9"),
		500: createColorEntry("fuchsia-500", "#d946ef"),
		600: createColorEntry("fuchsia-600", "#c026d3"),
		700: createColorEntry("fuchsia-700", "#a21caf"),
		800: createColorEntry("fuchsia-800", "#86198f"),
		900: createColorEntry("fuchsia-900", "#701a75"),
		950: createColorEntry("fuchsia-950", "#4a044e"),
	},
	pink: {
		50: createColorEntry("pink-50", "#fdf2f8"),
		100: createColorEntry("pink-100", "#fce7f3"),
		200: createColorEntry("pink-200", "#fbcfe8"),
		300: createColorEntry("pink-300", "#f9a8d4"),
		400: createColorEntry("pink-400", "#f472b6"),
		500: createColorEntry("pink-500", "#ec4899"),
		600: createColorEntry("pink-600", "#db2777"),
		700: createColorEntry("pink-700", "#be185d"),
		800: createColorEntry("pink-800", "#9d174d"),
		900: createColorEntry("pink-900", "#831843"),
		950: createColorEntry("pink-950", "#500724"),
	},
	rose: {
		50: createColorEntry("rose-50", "#fff1f2"),
		100: createColorEntry("rose-100", "#ffe4e6"),
		200: createColorEntry("rose-200", "#fecdd3"),
		300: createColorEntry("rose-300", "#fda4af"),
		400: createColorEntry("rose-400", "#fb7185"),
		500: createColorEntry("rose-500", "#f43f5e"),
		600: createColorEntry("rose-600", "#e11d48"),
		700: createColorEntry("rose-700", "#be123c"),
		800: createColorEntry("rose-800", "#9f1239"),
		900: createColorEntry("rose-900", "#881337"),
		950: createColorEntry("rose-950", "#4c0519"),
	},
};
