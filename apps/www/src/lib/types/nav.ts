import type { Icons } from "$components/docs/icons";

type NavItemBase = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
};

type NavItemWithChildren = NavItemBase & {
  items: NavItemWithChildren[];
};

export type NavItem = NavItemBase | NavItemWithChildren;
