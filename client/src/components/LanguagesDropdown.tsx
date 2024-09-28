import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LANGUAGES } from "../data.const";

export type LanguageType = { language: string; icon: any };

type LanguageDropdownProps = {
  selectedLanguage: LanguageType;
  handleOnClickDropdownItem: (arg0: LanguageType) => void;
};

const LanguagesDropdown = ({
  selectedLanguage,
  handleOnClickDropdownItem,
}: LanguageDropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="text-[#273237] flex bg-bgPrimary space-x-4 py-2 px-4 justify-center items-center rounded-lg font-light select-none transition-colors duration-200 hover:bg-[#D0E6E8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A1CBD1] w-[150px]">
          <img
            src={selectedLanguage.icon}
            className="w-8 h-9"
            alt={`${selectedLanguage.language} icon`}
          />
          <p className="text-xl">{selectedLanguage.language}</p>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="bg-white rounded-lg shadow-lg py-2 w-48 border border-gray-200 z-50"
        >
          {LANGUAGES.map((el) => (
            <DropdownMenu.Item
              key={el.language}
              className="text-[#273237] flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer transition-colors duration-200"
              onClick={() => handleOnClickDropdownItem(el)}
            >
              <img
                src={el.icon}
                className="w-5 h-5"
                alt={`${el.language} icon`}
              />
              <span>{el.language}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default LanguagesDropdown;
