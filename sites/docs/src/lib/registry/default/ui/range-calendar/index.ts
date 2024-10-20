import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
import Root from "./range-calendar.svelte";
import Cell from "./range-calendar-cell.svelte";
import Day from "./range-calendar-day.svelte";
import Grid from "./range-calendar-grid.svelte";
import Header from "./range-calendar-header.svelte";
import Months from "./range-calendar-months.svelte";
import GridRow from "./range-calendar-grid-row.svelte";
import Heading from "./range-calendar-heading.svelte";
import HeadCell from "./range-calendar-head-cell.svelte";
import NextButton from "./range-calendar-next-button.svelte";
import PrevButton from "./range-calendar-prev-button.svelte";

const GridHead = RangeCalendarPrimitive.GridHead;
const GridBody = RangeCalendarPrimitive.GridBody;

export {
	Day,
	Cell,
	Grid,
	Header,
	Months,
	GridRow,
	Heading,
	GridBody,
	GridHead,
	HeadCell,
	NextButton,
	PrevButton,
	//
	Root as RangeCalendar,
};
