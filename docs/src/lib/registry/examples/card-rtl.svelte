<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";

	const translations = {
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
	} as const;
	const t = useTranslation(translations, "ar");
</script>

<Card.Root class="w-full max-w-sm" dir={t.dir}>
	<Card.Header>
		<Card.Title>{t.values.title}</Card.Title>
		<Card.Description>{t.values.description}</Card.Description>
		<Card.Action>
			<Button variant="link">{t.values.signUp}</Button>
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<form>
			<div class="flex flex-col gap-6">
				<div class="grid gap-2">
					<Label for="email-rtl">{t.values.email}</Label>
					<Input id="email-rtl" type="email" placeholder={t.values.emailPlaceholder} required />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password-rtl">{t.values.password}</Label>
						<a href="##" class="ms-auto inline-block text-sm underline-offset-4 hover:underline">
							{t.values.forgotPassword}
						</a>
					</div>
					<Input id="password-rtl" type="password" required />
				</div>
			</div>
		</form>
	</Card.Content>
	<Card.Footer class="flex-col gap-2">
		<Button type="submit" class="w-full">{t.values.login}</Button>
		<Button variant="outline" class="w-full">{t.values.loginWithGoogle}</Button>
	</Card.Footer>
</Card.Root>
