import { icons } from "./assets/icons.const";

export const LANGUAGES = [{
    language: "polish",
    icon: icons.PL_FLAG,
    shortcut: "pl"
}, {
    language: "english",
    icon: icons.US_FLAG,
    shortcut: "en"
}, {
    language: "spanish",
    icon: icons.ES_FLAG,
    shortcut: "es"
}, {
    language: "german",
    icon: icons.DE_FLAG,
    shortcut: "de"
}] as const;