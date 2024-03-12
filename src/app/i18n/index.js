import { createInstance } from 'i18next';
import { getOptions } from './settings';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';

const initI18next = async (lng, ns) => {
	const i18nInstance = createInstance();
	await i18nInstance
		.use(initReactI18next)
		.use(
			resourcesToBackend((language, namespace) =>
				import(`./locales/${language}/${namespace}.json`)
			)
		)
		.init(getOptions(lng, ns));
	return i18nInstance;
};

export async function useTranslation(lng, ns, options = {}) {
	const currentLng = getSavedLanguage() // Функція для отримання збереженої мови
	const i18nextInstance = await initI18next(currentLng || lng, ns) // Використовуємо збережену мову, якщо вона є
	return {
		t: i18nextInstance.getFixedT(
			currentLng || lng,
			Array.isArray(ns) ? ns[0] : ns,
			options.keyPrefix
		),
		i18n: i18nextInstance,
	}
}
