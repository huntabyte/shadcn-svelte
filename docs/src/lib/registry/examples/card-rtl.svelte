<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { type Direction } from "$lib/registry/ui/direction/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { useRtlPreviewLanguage } from "$lib/components/rtl-preview-language.svelte.js";

	type Language = "en" | "ar" | "he";

	type Translation = {
		dir: Direction;
		values: {
			title: string;
			description: string;
			signUp: string;
			email: string;
			emailPlaceholder: string;
			password: string;
			forgotPassword: string;
			login: string;
			loginWithGoogle: string;
		};
	};

	const translations: Record<Language, Translation> = {
		en: {
			dir: "ltr",
			values: {
				title: "Login to your account",
				description: "Enter your email below to login to your account",
				signUp: "Sign Up",
				email: "Email",
				emailPlaceholder: "m@example.com",
				password: "Password",
				forgotPassword: "Forgot your password?",
				login: "Login",
				loginWithGoogle: "Login with Google",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				title: "تسجيل الدخول إلى حسابك",
				description: "أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك",
				signUp: "إنشاء حساب",
				email: "البريد الإلكتروني",
				emailPlaceholder: "m@example.com",
				password: "كلمة المرور",
				forgotPassword: "نسيت كلمة المرور؟",
				login: "تسجيل الدخول",
				loginWithGoogle: "تسجيل الدخول باستخدام Google",
			},
		},
		he: {
			dir: "rtl",
			values: {
				title: "התחבר לחשבון שלך",
				description: "הזן את האימייל שלך למטה כדי להתחבר לחשבון שלך",
				signUp: "הירשם",
				email: "אימייל",
				emailPlaceholder: "m@example.com",
				password: "סיסמה",
				forgotPassword: "שכחת את הסיסמה?",
				login: "התחבר",
				loginWithGoogle: "התחבר עם Google",
			},
		},
	};

	const language = useRtlPreviewLanguage();

	const current = $derived(translations[language.current as Language]);
	const t = $derived(current.values);
</script>

<Card.Root class="w-full max-w-sm" dir={current.dir}>
	<Card.Header>
		<Card.Title>{t.title}</Card.Title>
		<Card.Description>{t.description}</Card.Description>
		<Card.Action>
			<Button variant="link">{t.signUp}</Button>
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<form>
			<div class="flex flex-col gap-6">
				<div class="grid gap-2">
					<Label for="email-rtl">{t.email}</Label>
					<Input id="email-rtl" type="email" placeholder={t.emailPlaceholder} required />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password-rtl">{t.password}</Label>
						<a
							href="/login"
							class="ms-auto inline-block text-sm underline-offset-4 hover:underline"
						>
							{t.forgotPassword}
						</a>
					</div>
					<Input id="password-rtl" type="password" required />
				</div>
			</div>
		</form>
	</Card.Content>
	<Card.Footer class="flex-col gap-2">
		<Button type="submit" class="w-full">
			{t.login}
		</Button>
		<Button variant="outline" class="w-full">
			{t.loginWithGoogle}
		</Button>
	</Card.Footer>
</Card.Root>
