<script lang="ts">
	import AccordionDemo from "$lib/components/accordion-demo.svelte";
	import AlertDemo from "$lib/components/alert-demo.svelte";
	import AlertDialogDemo from "$lib/components/alert-dialog-demo.svelte";
	import AspectRatioDemo from "$lib/components/aspect-ratio-demo.svelte";
	import AvatarDemo from "$lib/components/avatar-demo.svelte";
	import BadgeDemo from "$lib/components/badge-demo.svelte";
	import BreadcrumbDemo from "$lib/components/breadcrumb-demo.svelte";
	import ButtonDemo from "$lib/components/button-demo.svelte";
	import CalendarDemo from "$lib/components/calendar-demo.svelte";
	import CardDemo from "$lib/components/card-demo.svelte";
	import CarouselDemo from "$lib/components/carousel-demo.svelte";
	import CheckboxDemo from "$lib/components/checkbox-demo.svelte";
	import CollapsibleDemo from "$lib/components/collapsible-demo.svelte";
	import ComponentWrapper from "$lib/components/component-wrapper.svelte";
	import ComboboxDemo from "$lib/components/combobox-demo.svelte";
	import CommandDemo from "$lib/components/command-demo.svelte";
	import ContextMenuDemo from "$lib/components/context-menu-demo.svelte";
	import DatePickerDemo from "$lib/components/date-picker-demo.svelte";
	import DialogDemo from "$lib/components/dialog-demo.svelte";
	import DrawerDemo from "$lib/components/drawer-demo.svelte";
	import DropdownMenuDemo from "$lib/components/dropdown-menu-demo.svelte";
	import FormDemo from "$lib/components/form-demo.svelte";
	import HoverCardDemo from "$lib/components/hover-card-demo.svelte";
	import InputDemo from "$lib/components/input-demo.svelte";
	import InputOTPDemo from "$lib/components/input-otp-demo.svelte";
	import LabelDemo from "$lib/components/label-demo.svelte";
	import MenubarDemo from "$lib/components/menubar-demo.svelte";
	// import NavigationMenuDemo from "$lib/components/navigation-menu-demo.svelte";
	import PaginationDemo from "$lib/components/pagination-demo.svelte";
	import PopoverDemo from "$lib/components/popover-demo.svelte";
	import ProgressDemo from "$lib/components/progress-demo.svelte";
	import RadioGroupDemo from "$lib/components/radio-group-demo.svelte";
	import ResizableDemo from "$lib/components/resizable-demo.svelte";
	import ScrollAreaDemo from "$lib/components/scroll-area-demo.svelte";
	import SelectDemo from "$lib/components/select-demo.svelte";
	import SeparatorDemo from "$lib/components/separator-demo.svelte";
	import SheetDemo from "$lib/components/sheet-demo.svelte";
	import SkeletonDemo from "$lib/components/skeleton-demo.svelte";
	import SliderDemo from "$lib/components/slider-demo.svelte";
	import SonnerDemo from "$lib/components/sonner-demo.svelte";
	import SwitchDemo from "$lib/components/switch-demo.svelte";
	import TableDemo from "$lib/components/table-demo.svelte";
	import TabsDemo from "$lib/components/tabs-demo.svelte";
	import TextareaDemo from "$lib/components/textarea-demo.svelte";
	import ToggleDemo from "$lib/components/toggle-demo.svelte";
	import ToggleGroupDemo from "$lib/components/toggle-group-demo.svelte";
	import TooltipDemo from "$lib/components/tooltip-demo.svelte";
	import RangeCalendarDemo from "$lib/components/range-calendar-demo.svelte";
	import ChartDemo from "$lib/components/chart-demo.svelte";
</script>

<div class="@container grid flex-1 gap-4 p-4">
	<ComponentWrapper name="chart" class="w-full">
		<ChartDemo />
	</ComponentWrapper>
	<ComponentWrapper name="accordion">
		<AccordionDemo />
	</ComponentWrapper>
	<ComponentWrapper name="alert">
		<AlertDemo />
	</ComponentWrapper>
	<ComponentWrapper name="alert-dialog">
		<AlertDialogDemo />
	</ComponentWrapper>
	<ComponentWrapper name="aspect-ratio">
		<AspectRatioDemo />
	</ComponentWrapper>
	<ComponentWrapper name="avatar">
		<AvatarDemo />
	</ComponentWrapper>
	<ComponentWrapper name="badge">
		<BadgeDemo />
	</ComponentWrapper>
	<ComponentWrapper name="breadcrumb">
		<BreadcrumbDemo />
	</ComponentWrapper>
	<ComponentWrapper name="button">
		<ButtonDemo />
	</ComponentWrapper>
	<ComponentWrapper name="calendar">
		<CalendarDemo />
	</ComponentWrapper>
	<ComponentWrapper name="card">
		<CardDemo />
	</ComponentWrapper>
	<ComponentWrapper name="carousel">
		<CarouselDemo />
	</ComponentWrapper>
	<ComponentWrapper name="checkbox">
		<CheckboxDemo />
	</ComponentWrapper>
	<ComponentWrapper name="collapsible">
		<CollapsibleDemo />
	</ComponentWrapper>
	<ComponentWrapper name="combobox">
		<ComboboxDemo />
	</ComponentWrapper>
	<ComponentWrapper name="command">
		<CommandDemo />
	</ComponentWrapper>
	<ComponentWrapper name="context-menu">
		<ContextMenuDemo />
	</ComponentWrapper>
	<ComponentWrapper name="date-picker">
		<DatePickerDemo />
	</ComponentWrapper>
	<ComponentWrapper name="dialog">
		<DialogDemo />
	</ComponentWrapper>
	<ComponentWrapper name="drawer">
		<DrawerDemo />
	</ComponentWrapper>
	<ComponentWrapper name="dropdown-menu">
		<DropdownMenuDemo />
	</ComponentWrapper>
	<ComponentWrapper name="form">
		<FormDemo />
	</ComponentWrapper>
	<ComponentWrapper name="hover-card">
		<HoverCardDemo />
	</ComponentWrapper>
	<ComponentWrapper name="input">
		<InputDemo />
	</ComponentWrapper>
	<ComponentWrapper name="input-otp">
		<InputOTPDemo />
	</ComponentWrapper>
	<ComponentWrapper name="label">
		<LabelDemo />
	</ComponentWrapper>
	<ComponentWrapper name="menubar">
		<MenubarDemo />
	</ComponentWrapper>
	<!-- <ComponentWrapper name="navigation-menu">
		<NavigationMenuDemo />
	</ComponentWrapper> -->
	<ComponentWrapper name="pagination">
		<PaginationDemo />
	</ComponentWrapper>
	<ComponentWrapper name="popover">
		<PopoverDemo />
	</ComponentWrapper>
	<ComponentWrapper name="progress">
		<ProgressDemo />
	</ComponentWrapper>
	<ComponentWrapper name="radio-group">
		<RadioGroupDemo />
	</ComponentWrapper>
	<ComponentWrapper name="range-calendar">
		<RangeCalendarDemo />
	</ComponentWrapper>
	<ComponentWrapper name="resizable">
		<ResizableDemo />
	</ComponentWrapper>
	<ComponentWrapper name="scroll-area">
		<ScrollAreaDemo />
	</ComponentWrapper>
	<ComponentWrapper name="select">
		<SelectDemo />
	</ComponentWrapper>
	<ComponentWrapper name="separator">
		<SeparatorDemo />
	</ComponentWrapper>
	<ComponentWrapper name="sheet">
		<SheetDemo />
	</ComponentWrapper>
	<ComponentWrapper name="skeleton">
		<SkeletonDemo />
	</ComponentWrapper>
	<ComponentWrapper name="slider">
		<SliderDemo />
	</ComponentWrapper>
	<ComponentWrapper name="sonner">
		<SonnerDemo />
	</ComponentWrapper>
	<ComponentWrapper name="switch">
		<SwitchDemo />
	</ComponentWrapper>
	<ComponentWrapper name="table">
		<TableDemo />
	</ComponentWrapper>
	<ComponentWrapper name="tabs">
		<TabsDemo />
	</ComponentWrapper>
	<ComponentWrapper name="textarea">
		<TextareaDemo />
	</ComponentWrapper>
	<ComponentWrapper name="toggle">
		<ToggleDemo />
	</ComponentWrapper>
	<ComponentWrapper name="toggle-group">
		<ToggleGroupDemo />
	</ComponentWrapper>
	<ComponentWrapper name="tooltip">
		<TooltipDemo />
	</ComponentWrapper>
</div>
