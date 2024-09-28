import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { LanguageType } from "../components/LanguagesDropdown";
import { LANGUAGES } from "../data.const";

interface LanguageContextType {
  fromLanguage: LanguageType;
  setFromLanguage: Dispatch<SetStateAction<LanguageType>>;
  toLanguage: LanguageType;
  setToLanguage: Dispatch<SetStateAction<LanguageType>>;
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

  return (
    <LanguageContext.Provider
      value={{ fromLanguage, setFromLanguage, toLanguage, setToLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
export default LanguageContextProvider;
