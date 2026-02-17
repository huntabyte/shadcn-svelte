# New Props and Features from shadcn/ui

This document tracks new props and features that exist in shadcn/ui but need to be added to shadcn-svelte components.

## Calendar Component

### Missing Prop: `timeZone`

**Status**: Not yet implemented
**Description**: The Calendar component in shadcn/ui accepts a `timeZone` prop to ensure dates are displayed and selected in the user's local timezone.

**Implementation Details**:

- shadcn/ui uses `react-day-picker` which supports this prop
- shadcn-svelte uses `bits-ui` Calendar component which may have different API
- Would need to check if bits-ui Calendar supports this prop

**Example Usage (from shadcn/ui)**:

```tsx
export function CalendarWithTimezone() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [timeZone, setTimeZone] = React.useState<string | undefined>(
    undefined
  );

  React.useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      timeZone={timeZone}
    />
  );
}
```

**Action Required**:

1. Check if `bits-ui` Calendar component supports `timeZone` prop
2. If supported, add to shadcn-svelte calendar.svelte component
3. Update documentation with example showing timezone usage
4. Add note about client-side timezone detection for SSR compatibility

---

## Button Component

### New Section: Cursor

**Status**: ✅ Added to documentation
**Description**: Added documentation about Tailwind v4 cursor behavior change from `cursor: pointer` to `cursor: default`.

**Content Added**:

```css
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

---

## Dialog Component

### Notes Section

**Status**: ✅ Updated
**Description**: Uncommented and converted Dialog Notes section about using Dialog within Context Menu or Dropdown Menu to Svelte.

**Action Required**: None (completed)

---

## Card Component

### New Prop: `CardAction`

**Status**: ✅ Added to documentation
**Description**: Added CardAction component to usage example in card.md

**Action Required**: None (completed)

---

## Examples Added

The following examples have been added to shadcn-svelte:

1. **Collapsible - Basic**: `collapsible-basic.svelte` - Added basic collapsible example
2. **Input OTP - Controlled**: `input-otp-controlled.svelte` - Added controlled state example
3. **Item - Dropdown**: `item-dropdown.svelte` - Added dropdown with avatars example

---

## Summary

- ✅ Button: Cursor section added
- ✅ Card: CardAction added to usage
- ✅ Collapsible: Basic example added
- ✅ Dialog: Notes section converted
- ✅ Input OTP: Controlled example added
- ✅ Item: Dropdown example added
- 🔍 Calendar: timeZone prop needs investigation
