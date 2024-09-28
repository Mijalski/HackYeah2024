import { icons } from "./assets/icons.const";

export const LANGUAGES = [{
    language: "polish",
    icon: icons.PL_FLAG,
    shortcut: "polish"
}, {
    language: "english",
    icon: icons.US_FLAG,
    shortcut: "english"
}, {
    language: "spanish",
    icon: icons.ES_FLAG,
    shortcut: "spanish"
}, {
    language: "german",
    icon: icons.DE_FLAG,
    shortcut: "german"
}] as const;

export const LANGUAGE_LEVELS = [{
    level: "A1"
},{
    level: "A2"
},{
    level: "B1"
},{
    level: "B2"
},{
    level: "C1"
},] as const;