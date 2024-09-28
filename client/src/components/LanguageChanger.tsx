import { useContext } from "react";
import { LanguageContext } from "../Contexts/LangSelectedContextProvider";
import LanguagesDropdown from "./LanguagesDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
      <div className="flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={faArrowLeft} className="text-[#acb5b6]" />
        <FontAwesomeIcon icon={faArrowRight} className="text-[#acb5b6]" />
      </div>
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
