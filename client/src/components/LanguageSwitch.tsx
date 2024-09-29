import { useContext } from "react";
import { LanguageContext } from "../Contexts/LangSelectedContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const LanguageSwitch = () => {
  const languageContext = useContext(LanguageContext);

  if (!languageContext) {
    throw new Error("LanguageContext must be used within a LanguageProvider");
  }

  const { fromLanguage, setFromLanguage, toLanguage, setToLanguage } =
    languageContext;

  return (
    <div
      className="flex flex-col items-center justify-center cursor-pointer sm:text-[#acb5b6] sm:hover:text-[#787e7f] select-none px-4"
      onClick={() => {
        setFromLanguage(toLanguage);
        setToLanguage(fromLanguage);
      }}
    >
      <FontAwesomeIcon icon={faArrowLeft} className="text-inherit" />
      <FontAwesomeIcon icon={faArrowRight} className="text-inherit" />
    </div>
  );
};

export default LanguageSwitch;
