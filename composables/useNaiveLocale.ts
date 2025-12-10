// composables/useNaiveLocale.ts
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { enUS, ruRU, uzUZ, dateEnUS, dateRuRU, dateUzUZ } from 'naive-ui'
import type { NLocale, NDateLocale } from 'naive-ui'
import { krilLocale, krilDateLocale } from '@/i18n/locales/elements/naive-ui-kril'

const naiveLocales: Record<string, { locale: NLocale; dateLocale: NDateLocale }> = {
    en: {
        locale: enUS,
        dateLocale: dateEnUS,
    },
    ru: {
        locale: ruRU,
        dateLocale: dateRuRU,
    },
    uz: {
        locale: uzUZ,
        dateLocale: dateUzUZ,
    },
    kril: {
        locale: krilLocale,
        dateLocale: krilDateLocale,
    },
}

export function useNaiveLocale() {
    const { locale } = useI18n()

    const naiveLocale = computed<NLocale>(() => {
        return naiveLocales[locale.value]?.locale || enUS
    })

    const naiveDateLocale = computed<NDateLocale>(() => {
        return naiveLocales[locale.value]?.dateLocale || dateEnUS
    })

    return { naiveLocale, naiveDateLocale }
}
