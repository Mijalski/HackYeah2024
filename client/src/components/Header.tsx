import AchievementCount from "./AchievementCount";
import Balance from "./Balance";
import LanguageChanger from "./LanguageChanger";

const Header = () => {
  return (
    <header className="sm:py-2 sm:flex sm:justify-between sm:flex-row sm:px-3 flex-col justify-center items-center flex flex-wrap space-y-4 bg-[#50C9FE] sm:bg-white py-3">
      <AchievementCount />
      <LanguageChanger />
      <Balance />
    </header>
  );
};

export default Header;
