export function pascalToKebab(str: string): string {
	let newStr = "";

	for (let i = 0; i < str.length; i++) {
		// is uppercase letter / number (ignoring the first)
		if (i > 0 && (!isLetter(str[i]) || (isLetter(str[i]) && str[i].toUpperCase() === str[i]))) {
			let l = i;

			while (
				l < str.length &&
				(!isLetter(str[l]) || (isLetter(str[l]) && str[l].toUpperCase() === str[l]))
			) {
				l++;
			}

			newStr += `${str.slice(i, l - 1).toLocaleLowerCase()}-${str[l - 1].toLocaleLowerCase()}`;

			i = l - 1;

			continue;
		}

		newStr += str[i].toLocaleLowerCase();
	}

	return newStr;
}

const LETTER_REGEX = new RegExp(/[a-zA-Z]/);

export function isLetter(char: string): boolean {
	if (char.length > 1) {
		throw new Error(
			`You probably only meant to pass a character to this function. Instead you gave ${char}`
		);
	}

	return LETTER_REGEX.test(char);
}
