import { Calendar as CalendarPrimitive } from "bits-ui";
import Root from "./calendar.svelte";
import Cell from "./calendar-cell.svelte";
import Day from "./calendar-day.svelte";
import Grid from "./calendar-grid.svelte";
import Header from "./calendar-header.svelte";
import Months from "./calendar-months.svelte";
import GridRow from "./calendar-grid-row.svelte";
import Heading from "./calendar-heading.svelte";
import GridBody from "./calendar-grid-body.svelte";
import GridHead from "./calendar-grid-head.svelte";
import HeadCell from "./calendar-head-cell.svelte";
import NextButton from "./calendar-next-button.svelte";
import PrevButton from "./calendar-prev-button.svelte";

const MonthSelect = CalendarPrimitive.MonthSelect;
const YearSelect = CalendarPrimitive.YearSelect;

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
	MonthSelect,
	YearSelect,
	//
	Root as Calendar,
};
