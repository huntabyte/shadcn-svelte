import { describe, it, expect } from "vitest";
import { iconLibraries, phosphorWeight } from "../../src/icons/libraries.js";

describe("phosphorWeight", () => {
	it("is duotone for form and field icons", () => {
		for (const name of [
			"UserIcon",
			"EnvelopeIcon",
			"LockIcon",
			"MagnifyingGlassIcon",
			"CalendarIcon",
		]) {
			expect(phosphorWeight(name), name).toBe("duotone");
		}
	});

	it("is bold for arrows, carets, plus, check, X, minus, dots and text format", () => {
		for (const name of [
			"ArrowRightIcon",
			"ArrowLeftIcon",
			"CaretDownIcon",
			"CaretUpDownIcon",
			"PlusIcon",
			"CheckIcon",
			"XIcon",
			"MinusIcon",
			"DotsThreeIcon",
			"DotsThreeVerticalIcon",
			"TextTIcon",
			"TextBIcon",
		]) {
			expect(phosphorWeight(name), name).toBe("bold");
		}
	});

	it("keeps filled shapes that start with the same word duotone", () => {
		for (const name of [
			"CheckCircleIcon",
			"PlusCircleIcon",
			"XCircleIcon",
			"ArrowSquareOutIcon",
			"CaretCircleDownIcon",
			"CaretSquareDownIcon",
			"DotsThreeCircleIcon",
			"DotsThreeCircleVerticalIcon",
		]) {
			expect(phosphorWeight(name), name).toBe("duotone");
		}
	});

	it("does not make brand or unrelated glyphs bold because of a shared prefix", () => {
		for (const name of [
			"XLogoIcon",
			"CheckerboardIcon",
			"PlusMinusIcon",
			"CheckSquareOffsetIcon",
		]) {
			expect(phosphorWeight(name), name).toBe("duotone");
		}
	});

	it("keeps the plain check family bold", () => {
		for (const name of ["CheckIcon", "ChecksIcon", "CheckFatIcon"]) {
			expect(phosphorWeight(name), name).toBe("bold");
		}
	});

	it("accepts a name without the Icon suffix", () => {
		expect(phosphorWeight("Plus")).toBe("bold");
		expect(phosphorWeight("User")).toBe("duotone");
	});
});

describe("phosphor usage", () => {
	it("adds the weight before the other attributes", () => {
		expect(iconLibraries.phosphor.usage({ name: "ArrowRightIcon" }, 'class="size-4"')).toBe(
			'<ArrowRightIcon weight="bold" class="size-4" />'
		);
		expect(iconLibraries.phosphor.usage({ name: "UserIcon" }, "")).toBe(
			'<UserIcon weight="duotone" />'
		);
	});

	it("keeps a weight the component already sets", () => {
		expect(iconLibraries.phosphor.usage({ name: "UserIcon" }, 'weight="fill" class="size-4"')).toBe(
			'<UserIcon weight="fill" class="size-4" />'
		);
	});

	it("keeps a shorthand {weight} the caller passes", () => {
		expect(iconLibraries.phosphor.usage({ name: "UserIcon" }, '{weight} class="size-4"')).toBe(
			'<UserIcon {weight} class="size-4" />'
		);
	});
});
