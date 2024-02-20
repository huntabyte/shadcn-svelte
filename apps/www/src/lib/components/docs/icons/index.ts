import AlertTriangle from "lucide-svelte/icons/alert-triangle";
import ArrowRight from "lucide-svelte/icons/arrow-right";
import Check from "lucide-svelte/icons/check";
import ChevronLeft from "lucide-svelte/icons/chevron-left";
import ChevronRight from "lucide-svelte/icons/chevron-right";
import ClipboardCheck from "lucide-svelte/icons/clipboard-check";
import Copy from "lucide-svelte/icons/copy";
import CreditCard from "lucide-svelte/icons/credit-card";
import File from "lucide-svelte/icons/file";
import FileText from "lucide-svelte/icons/file-text";
import HelpCircle from "lucide-svelte/icons/help-circle";
import Image from "lucide-svelte/icons/image";
import Laptop from "lucide-svelte/icons/laptop";
import Loader2 from "lucide-svelte/icons/loader-2";
import Moon from "lucide-svelte/icons/moon";
import MoreVertical from "lucide-svelte/icons/more-vertical";
import Pizza from "lucide-svelte/icons/pizza";
import Plus from "lucide-svelte/icons/plus";
import Settings from "lucide-svelte/icons/settings";
import SunMedium from "lucide-svelte/icons/sun-medium";
import Trash from "lucide-svelte/icons/trash";
import User from "lucide-svelte/icons/user";
import X from "lucide-svelte/icons/x";
import type { Icon as LucideIcon } from "lucide-svelte";

import Apple from "./apple.svelte";
import Aria from "./aria.svelte";
import GitHub from "./github.svelte";
import Google from "./google.svelte";
import Logo from "./logo.svelte";
import Npm from "./npm.svelte";
import PayPal from "./paypal.svelte";
import Pnpm from "./pnpm.svelte";
import RadixSvelte from "./radix-svelte.svelte";
import Tailwind from "./tailwind.svelte";
import Yarn from "./yarn.svelte";
import Twitter from "./twitter.svelte";
import Hamburger from "./hamburger.svelte";

export type Icon = LucideIcon;

export const Icons = {
	logo: Logo,
	close: X,
	spinner: Loader2,
	chevronLeft: ChevronLeft,
	chevronRight: ChevronRight,
	trash: Trash,
	post: FileText,
	page: File,
	media: Image,
	settings: Settings,
	billing: CreditCard,
	ellipsis: MoreVertical,
	add: Plus,
	warning: AlertTriangle,
	user: User,
	arrowRight: ArrowRight,
	help: HelpCircle,
	pizza: Pizza,
	twitter: Twitter,
	check: Check,
	copy: Copy,
	copyDone: ClipboardCheck,
	sun: SunMedium,
	moon: Moon,
	laptop: Laptop,
	gitHub: GitHub,
	radix: RadixSvelte,
	"Radix Svelte": RadixSvelte,
	aria: Aria,
	npm: Npm,
	yarn: Yarn,
	pnpm: Pnpm,
	tailwind: Tailwind,
	google: Google,
	apple: Apple,
	paypal: PayPal,
	Hamburger: Hamburger,
};
