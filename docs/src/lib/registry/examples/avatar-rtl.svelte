<script lang="ts">
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import {
		Avatar,
		AvatarBadge,
		AvatarFallback,
		AvatarGroup,
		AvatarGroupCount,
		AvatarImage,
	} from "$lib/registry/ui/avatar/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				moreUsers: "+3",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				moreUsers: "+٣",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				moreUsers: "+3",
			},
		},
	};

	const t = useTranslation(translations, "ar");
</script>

<div class="flex flex-row flex-wrap items-center gap-6 md:gap-12" dir={t.dir}>
	<Avatar>
		<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" class="grayscale" />
		<AvatarFallback>CN</AvatarFallback>
	</Avatar>
	<Avatar>
		<AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
		<AvatarFallback>ER</AvatarFallback>
		<AvatarBadge class="bg-green-600 dark:bg-green-800" />
	</Avatar>
	<AvatarGroup class="grayscale">
		<Avatar>
			<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
		<Avatar>
			<AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
			<AvatarFallback>LR</AvatarFallback>
		</Avatar>
		<Avatar>
			<AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
			<AvatarFallback>ER</AvatarFallback>
		</Avatar>
		<AvatarGroupCount>{t.values.moreUsers}</AvatarGroupCount>
	</AvatarGroup>
</div>
