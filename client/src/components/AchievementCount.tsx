import { useContext } from "react";
import { icons } from "../assets/icons.const";
import { AchievementCountContext } from "../Contexts/AchievementCountProvider";

const AchievementCount = () => {
  const achievementCountContext = useContext(AchievementCountContext);

  if (!achievementCountContext) {
    throw new Error(
      "AchievementCountContext must be used within a AchievementCountProvider"
    );
  }

  const { achievementCount } = achievementCountContext;
  return (
    <div className="text-[#273237] flex px-4 py-2 rounded-md justify-center items-center space-x-4 text-2xl bg-bgPrimary select-none">
      <img src={icons.GOLD_CUP} className="w-7" />
      <span>{achievementCount}</span>
    </div>
  );
};

export default AchievementCount;
