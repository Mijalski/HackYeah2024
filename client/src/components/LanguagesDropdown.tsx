import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export type LanguageType = { language: string; icon: any };

type LanguageDropdownProps = {
  selectedLanguage: LanguageType;
  languages: LanguageType[];
};

const LanguagesDropdown = ({
  selectedLanguage,
  languages,
}: LanguageDropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex bg-[#E7F1F2] space-x-4 py-1 pl-3 pr-14 justify-center items-center rounded-lg font-light select-none">
          <img src={selectedLanguage.icon} className="w-8 h-9" />
          <p className="text-xl">{selectedLanguage.language}</p>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          {languages.map((el) => {
            return (
              <DropdownMenu.Item className="DropdownMenuItem">
                {el.icon}
                {el.language}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default LanguagesDropdown;
