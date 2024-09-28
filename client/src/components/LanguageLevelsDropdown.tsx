import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LANGUAGE_LEVELS } from "../data.const";

export type LanguageLevel = { level: string };

type LanguageLevelsDropdownProps = {
  selectedLevel: LanguageLevel;
  handleOnClickDropdownItem: (arg0: LanguageLevel) => void;
};

const LanguageLevelsDropdown = ({
  selectedLevel,
  handleOnClickDropdownItem,
}: LanguageLevelsDropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex bg-bgPrimary space-x-4 py-2 px-4 justify-center items-center rounded-lg font-light select-none transition-colors duration-200 hover:bg-[#D0E6E8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A1CBD1] w-[150px]">
          <p className="text-xl">{selectedLevel.level}</p>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          className="bg-white rounded-lg shadow-lg py-2 w-48 border border-gray-200 z-50"
        >
          {LANGUAGE_LEVELS.map((el) => (
            <DropdownMenu.Item
              key={el.level}
              className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer transition-colors duration-200"
              onClick={() => handleOnClickDropdownItem(el)}
            >
              <span className="text-gray-700">{el.level}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default LanguageLevelsDropdown;
