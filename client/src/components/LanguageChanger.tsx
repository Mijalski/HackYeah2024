import { useContext } from "react";
import { LanguageContext } from "../Contexts/LangSelectedContextProvider";
import LanguagesDropdown from "./LanguagesDropdown";
import LanguageSwitch from "./LanguageSwitch";

const LanguageChanger = () => {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error("LanguageContext must be used within a LanguageProvider");
  }

  const { fromLanguage, setFromLanguage, toLanguage, setToLanguage } =
    languageContext;

  return (
    <div className="flex space-x-4">
      <LanguagesDropdown
        selectedLanguage={{
          language: fromLanguage?.language,
          icon: fromLanguage?.icon,
        }}
        handleOnClickDropdownItem={(data) => {
          setFromLanguage(data);
        }}
      />
      <LanguageSwitch />
      <LanguagesDropdown
        selectedLanguage={{
          language: toLanguage?.language,
          icon: toLanguage?.icon,
        }}
        handleOnClickDropdownItem={(data) => {
          setToLanguage(data);
        }}
      />
    </div>
  );
};

export default LanguageChanger;
