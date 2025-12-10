// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
export default defineNuxtConfig({
    postcss: {
        plugins: {
            '@tailwindcss/postcss':  {},
            autoprefixer: {},
        }
    },

    echarts: {
        renderer: ["svg", "canvas"],
        charts: ["BarChart", "LineChart", "PieChart"],
        components: ["DatasetComponent", "GridComponent", "TooltipComponent"],
        features: ["LabelLayout", "UniversalTransition"]
    },

    css: [
        '~/assets/styles/main.css',
        '~/assets/styles/fonts.css'
    ],

    runtimeConfig: {
        public: {
            NUXT_PUBLIC_API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL,
        },
    },

    ssr: false,

    devServer: {
      host: '*',
      port: 7075,
    },

    components: [
        { path: '~/components', pathPrefix: false},
        { path: "~/components/ui", pathPrefix: false },
        { path: "~/components/layout", pathPrefix: false }
    ],

    i18n: {
        strategy: "no_prefix",
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "i18n_redirected",
            redirectOn: "root",
            fallbackLocale: "uz",
            alwaysRedirect: true
        },
        locales: [
            {
                code: "uz",
                file: "uz-Latn-UZ/uz-Latn-UZ.json",
                language: "uz-Latn-UZ"
            },
            {
                code: "kril",
                file: "uz-Cyrl-UZ/uz-Cyrl-UZ.json",
                language: "uz-Cyrl-UZ"
            },
            { code: "ru", file: "ru-RU/ru-RU.json", language: "ru-RU" },
            { code: "en", file: "en/en.json", language: "en" }
        ],
        defaultLocale: "uz",
        langDir: "locales/"
    },

    plugins: [],

    vite: {
        plugins: [
            AutoImport({
                imports: [
                    "vue",
                    {
                        "naive-ui": [
                            "useDialog",
                            "useMessage",
                            "useNotification",
                            "useLoadingBar",
                        ],
                    },
                ],
                dts: "auto-imports.d.ts",
            }),
            Components({
                resolvers: [
                    NaiveUiResolver(),
                ],
                dts: "components.d.ts",
            }),
        ],
    },

    svgo: {
        componentPrefix: "icon",
        autoImportPath: "./assets/icons/",
        defaultImport: "component",
        svgoConfig: {
            multipass: false, // Отключаем многоходовую оптимизацию
            plugins: [
                {
                    name: "preset-default",
                    params: {
                        overrides: {
                            // Отключаем ВСЕ плагины оптимизации
                            removeDoctype: false,
                            removeXMLProcInst: false,
                            removeComments: false,
                            removeMetadata: false,
                            removeEditorsNSData: false,
                            cleanupIds: false,
                            convertColors: false,
                            convertPathData: false,
                            convertTransform: false,
                            removeUnknownsAndDefaults: false,
                            removeNonInheritableGroupAttrs: false,
                            removeUselessStrokeAndFill: false,
                            removeUnusedNS: false,
                            cleanupNumericValues: false,
                            moveElemsAttrsToGroup: false,
                            moveGroupAttrsToElems: false,
                            collapseGroups: false,
                            mergePaths: false,
                            convertShapeToPath: false,
                            sortAttrs: false,
                            removeTitle: false,
                            removeDesc: false,
                            removeEmptyContainers: false,
                            removeViewBox: false,
                            cleanupEnableBackground: false,
                            removeHiddenElems: false,
                            removeEmptyText: false,
                            inlineStyles: false,
                            minifyStyles: false
                        }
                    }
                }
            ]
        }
    },

    typescript: {
        tsConfig: {
            compilerOptions: {
                paths: {
                    "@/*": ["../*"],
                    "@themeConfig": ["../themeConfig.ts"],
                    "@layouts/*": ["../@layouts/*"],
                    "@layouts": ["../@layouts"],
                    "@core/*": ["../@core/*"],
                    "@core": ["../@core"],
                    "@images/*": ["../assets/images/*"],
                    "@styles/*": ["../assets/styles/*"],
                    "@validators": ["../@core/utils/validators"],
                    "@db/*": ["../server/fake-db/*"],
                    "@api-utils/*": ["../server/utils/*"]
                }
            }
        }
    },

  imports: {
      autoImport: true
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', 'nuxt-svgo', '@pinia/nuxt', 'nuxt-echarts']
})