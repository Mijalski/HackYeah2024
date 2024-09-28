import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { LanguageType } from "../components/LanguagesDropdown";
import { LANGUAGE_LEVELS, LANGUAGES } from "../data.const";
import { LanguageLevel } from "../components/LanguageLevelsDropdown";

interface LanguageContextType {
  fromLanguage: LanguageType;
  setFromLanguage: Dispatch<SetStateAction<LanguageType>>;
  toLanguage: LanguageType;
  setToLanguage: Dispatch<SetStateAction<LanguageType>>;
  toLevel: LanguageLevel;
  setToLevel: Dispatch<SetStateAction<LanguageLevel>>;
}

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageContextProvider: FC<LanguageProviderProps> = ({
  children,
}) => {
  const [fromLanguage, setFromLanguage] = useState<LanguageType>({
    language: LANGUAGES[0].language,
    icon: LANGUAGES[0].icon,
    shortcut: LANGUAGES[0].shortcut,
  });
  const [toLanguage, setToLanguage] = useState<LanguageType>({
    language: LANGUAGES[1].language,
    icon: LANGUAGES[1].icon,
    shortcut: LANGUAGES[1].shortcut,
  });
  const [toLevel, setToLevel] = useState<LanguageLevel>({
    level: LANGUAGE_LEVELS[1].level,
  });

  // Read Cached Data
  useEffect(() => {
    const fromLangCache = localStorage.getItem("fromLanguage");
    const toLangCache = localStorage.getItem("toLanguage");
    const levelCache = localStorage.getItem("level");
    console.log("toLangCache=>", toLangCache);
    setFromLanguage(() => {
      const foundLang = LANGUAGES.find((el) => el.language === fromLangCache);

      if (foundLang?.language && foundLang?.shortcut && foundLang?.icon) {
        return {
          language: foundLang.language,
          shortcut: foundLang.shortcut,
          icon: foundLang?.icon,
        };
      } else {
        return {
          language: LANGUAGES[0].language,
          icon: LANGUAGES[0].icon,
          shortcut: LANGUAGES[0].shortcut,
        };
      }
    });

    if (toLangCache) {
      setToLanguage(() => {
        const foundLang = LANGUAGES.find((el) => el.language === toLangCache);
        console.log("found to lang => ", foundLang);
        if (foundLang?.language && foundLang?.shortcut && foundLang?.icon) {
          return {
            language: foundLang.language,
            shortcut: foundLang.shortcut,
            icon: foundLang?.icon,
          };
        } else {
          return {
            language: LANGUAGES[1].language,
            icon: LANGUAGES[1].icon,
            shortcut: LANGUAGES[1].shortcut,
          };
        }
      });
    }
    if (levelCache) {
      setToLevel({ level: levelCache ? levelCache : "A1" });
    }
  }, []);

  // Update Cached Data
  useEffect(() => {
    if (
      !(
        fromLanguage.language === LANGUAGES[0].language &&
        toLanguage.language === LANGUAGES[1].language &&
        toLevel.level === LANGUAGE_LEVELS[1].level
      )
    ) {
      localStorage.setItem("fromLanguage", fromLanguage.language);
      localStorage.setItem("toLanguage", toLanguage.language);
      localStorage.setItem("level", toLevel.level);
    }
  }, [fromLanguage, toLanguage, toLevel.level]);

  return (
    <LanguageContext.Provider
      value={{
        fromLanguage,
        setFromLanguage,
        toLanguage,
        setToLanguage,
        toLevel,
        setToLevel,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
export default LanguageContextProvider;
