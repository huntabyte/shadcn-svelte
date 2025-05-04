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
	import NavigationMenuDemo from "$lib/components/navigation-menu-demo.svelte";
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
</script>

<div class="@container grid flex-1 gap-4 p-4">
	<!-- <ComponentWrapper name="chart" class="w-full">
	  <ChartDemo />
	</ComponentWrapper> -->
	<ComponentWrapper name="accordion" status="done">
		<AccordionDemo />
	</ComponentWrapper>
	<ComponentWrapper name="alert" status="done">
		<AlertDemo />
	</ComponentWrapper>
	<ComponentWrapper name="alert-dialog" status="done">
		<AlertDialogDemo />
	</ComponentWrapper>
	<ComponentWrapper name="aspect-ratio" status="done">
		<AspectRatioDemo />
	</ComponentWrapper>
	<ComponentWrapper name="avatar" status="done">
		<AvatarDemo />
	</ComponentWrapper>
	<ComponentWrapper name="badge" status="done">
		<BadgeDemo />
	</ComponentWrapper>
	<ComponentWrapper name="breadcrumb" status="done">
		<BreadcrumbDemo />
	</ComponentWrapper>
	<ComponentWrapper name="button" status="done">
		<ButtonDemo />
	</ComponentWrapper>
	<ComponentWrapper name="calendar" status="done">
		<CalendarDemo />
	</ComponentWrapper>
	<ComponentWrapper name="card" status="done">
		<CardDemo />
	</ComponentWrapper>
	<ComponentWrapper name="carousel" status="done">
		<CarouselDemo />
	</ComponentWrapper>
	<ComponentWrapper name="checkbox" status="done">
		<CheckboxDemo />
	</ComponentWrapper>
	<ComponentWrapper name="collapsible" status="done">
		<CollapsibleDemo />
	</ComponentWrapper>
	<ComponentWrapper name="combobox" status="done">
		<ComboboxDemo />
	</ComponentWrapper>
	<ComponentWrapper name="command" status="done">
		<CommandDemo />
	</ComponentWrapper>
	<ComponentWrapper name="context-menu" status="done">
		<ContextMenuDemo />
	</ComponentWrapper>
	<ComponentWrapper name="date-picker" status="done">
		<DatePickerDemo />
	</ComponentWrapper>
	<ComponentWrapper name="dialog" status="done">
		<DialogDemo />
	</ComponentWrapper>
	<ComponentWrapper name="drawer" status="not started">
		<DrawerDemo />
	</ComponentWrapper>
	<ComponentWrapper name="dropdown-menu" status="done">
		<DropdownMenuDemo />
	</ComponentWrapper>
	<ComponentWrapper name="form" status="not started">
		<FormDemo />
	</ComponentWrapper>
	<ComponentWrapper name="hover-card" status="done">
		<HoverCardDemo />
	</ComponentWrapper>
	<ComponentWrapper name="input" status="done">
		<InputDemo />
	</ComponentWrapper>
	<ComponentWrapper name="input-otp" status="done">
		<InputOTPDemo />
	</ComponentWrapper>
	<ComponentWrapper name="label" status="done">
		<LabelDemo />
	</ComponentWrapper>
	<ComponentWrapper name="menubar" status="done">
		<MenubarDemo />
	</ComponentWrapper>
	<ComponentWrapper name="navigation-menu" status="needs parity">
		<NavigationMenuDemo />
	</ComponentWrapper>
	<ComponentWrapper name="pagination" status="done">
		<PaginationDemo />
	</ComponentWrapper>
	<ComponentWrapper name="popover" status="done">
		<PopoverDemo />
	</ComponentWrapper>
	<ComponentWrapper name="progress" status="done">
		<ProgressDemo />
	</ComponentWrapper>
	<ComponentWrapper name="radio-group" status="done">
		<RadioGroupDemo />
	</ComponentWrapper>
	<ComponentWrapper name="resizable" status="done">
		<ResizableDemo />
	</ComponentWrapper>
	<ComponentWrapper name="scroll-area" status="done">
		<ScrollAreaDemo />
	</ComponentWrapper>
	<ComponentWrapper name="select" status="in progress">
		<SelectDemo />
	</ComponentWrapper>
	<ComponentWrapper name="separator" status="done">
		<SeparatorDemo />
	</ComponentWrapper>
	<ComponentWrapper name="sheet" status="done">
		<SheetDemo />
	</ComponentWrapper>
	<ComponentWrapper name="skeleton" status="done">
		<SkeletonDemo />
	</ComponentWrapper>
	<ComponentWrapper name="slider" status="done">
		<SliderDemo />
	</ComponentWrapper>
	<ComponentWrapper name="sonner" status="done">
		<SonnerDemo />
	</ComponentWrapper>
	<ComponentWrapper name="switch" status="done">
		<SwitchDemo />
	</ComponentWrapper>
	<ComponentWrapper name="table" status="done">
		<TableDemo />
	</ComponentWrapper>
	<ComponentWrapper name="tabs" status="done">
		<TabsDemo />
	</ComponentWrapper>
	<ComponentWrapper name="textarea" status="done">
		<TextareaDemo />
	</ComponentWrapper>
	<ComponentWrapper name="toggle" status="done">
		<ToggleDemo />
	</ComponentWrapper>
	<ComponentWrapper name="toggle-group" status="done">
		<ToggleGroupDemo />
	</ComponentWrapper>
	<ComponentWrapper name="tooltip" status="done">
		<TooltipDemo />
	</ComponentWrapper>
</div>
