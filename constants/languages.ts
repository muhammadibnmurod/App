type Language = {
    label: string;
    value: 'uz' | 'kril' | 'ru' | 'en';
    short: string;
};

export const languages: Language[] = [
    {
        label: "O'zbekcha",
        value: 'uz',
        short: "O'z",
    },
    {
        label: 'Ўзбекча',
        value: 'kril',
        short: 'Ўз',
    },
    {
        label: 'Русский',
        value: 'ru',
        short: 'Рус',
    },
    {
        label: 'English',
        value: 'en',
        short: 'Eng',
    },
];
