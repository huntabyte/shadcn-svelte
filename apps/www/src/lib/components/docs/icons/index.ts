import type { Icon as LucideIcon } from "lucide-svelte";
import {
	AlertTriangle,
	ArrowRight,
	Check,
	ChevronLeft,
	ChevronRight,
	ClipboardCheck,
	Copy,
	CreditCard,
	File,
	FileText,
	HelpCircle,
	Image,
	Laptop,
	Loader2,
	Moon,
	MoreVertical,
	Pizza,
	Plus,
	Settings,
	SunMedium,
	Trash,
	User,
	X
} from "lucide-svelte";
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
	paypal: PayPal
};
