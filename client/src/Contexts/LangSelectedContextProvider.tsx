import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
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
  });
  const [toLanguage, setToLanguage] = useState<LanguageType>({
    language: LANGUAGES[1].language,
    icon: LANGUAGES[1].icon,
  });
  const [toLevel, setToLevel] = useState<LanguageLevel>({
    level: LANGUAGE_LEVELS[1].level
  });

  return (
    <LanguageContext.Provider
      value={{ fromLanguage, setFromLanguage, toLanguage, setToLanguage, toLevel, setToLevel }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
export default LanguageContextProvider;
