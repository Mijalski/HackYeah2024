import { useContext } from "react";
import { LanguageContext } from "../Contexts/LangSelectedContextProvider";
import LanguagesDropdown from "./LanguagesDropdown";
import LanguageSwitch from "./LanguageSwitch";
import LanguageLevelsDropdown from "./LanguageLevelsDropdown";

const LanguageChanger = () => {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error("LanguageContext must be used within a LanguageProvider");
  }

  const {
    fromLanguage,
    setFromLanguage,
    toLanguage,
    setToLanguage,
    toLevel,
    setToLevel,
  } = languageContext;

  return (
    <div className="flex sm:space-x-4 flex-wrap justify-center">
      <LanguagesDropdown
        selectedLanguage={{
          language: fromLanguage?.language,
          icon: fromLanguage?.icon,
          shortcut: fromLanguage.shortcut,
        }}
        handleOnClickDropdownItem={(data) => {
          if (data.language === toLanguage.language) {
            setFromLanguage(toLanguage);
            setToLanguage(fromLanguage);
          } else {
            setFromLanguage(data);
          }
        }}
      />
      <LanguageSwitch />
      <LanguagesDropdown
        selectedLanguage={{
          language: toLanguage?.language,
          icon: toLanguage?.icon,
          shortcut: toLanguage.shortcut,
        }}
        handleOnClickDropdownItem={(data) => {
          if (data.language === fromLanguage.language) {
            setFromLanguage(toLanguage);
            setToLanguage(fromLanguage);
          } else {
            setToLanguage(data);
          }
        }}
      />
      <LanguageLevelsDropdown
        selectedLevel={{
          level: toLevel?.level,
        }}
        handleOnClickDropdownItem={(data) => {
          setToLevel(data);
        }}
      />
    </div>
  );
};

export default LanguageChanger;
