import AchievementCount from "./AchievementCount";
import Balance from "./Balance";
import LanguageChanger from "./LanguageChanger";

const Header = () => {
  return (
    <header className="py-2 flex justify-between px-3">
      <AchievementCount />
      <LanguageChanger />
      <Balance />
    </header>
  );
};

export default Header;
