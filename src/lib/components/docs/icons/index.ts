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
  Twitter,
  User,
  X,
  type Icon as LucideIcon
} from "lucide-svelte";
import Logo from "./Logo.svelte";
import GitHub from "./GitHub.svelte";
import Radix from "./Radix.svelte";
import Aria from "./Aria.svelte";
import Npm from "./Npm.svelte";
import Yarn from "./Yarn.svelte";
import Pnpm from "./Pnpm.svelte";
import Tailwind from "./Tailwind.svelte";
import Google from "./Google.svelte";
import Apple from "./Apple.svelte";
import PayPal from "./PayPal.svelte";
import RadixSvelte from "./RadixSvelte.svelte";

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
  aria: Aria,
  npm: Npm,
  yarn: Yarn,
  pnpm: Pnpm,
  tailwind: Tailwind,
  google: Google,
  apple: Apple,
  paypal: PayPal
};
