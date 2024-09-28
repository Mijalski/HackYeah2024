import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface AchievementCountContextType {
  achievementCount: number;
  setAchievementCount: Dispatch<SetStateAction<number>>;
}

type AchievementCountProviderProps = {
  children: ReactNode;
};

export const AchievementCountContext = createContext<
  AchievementCountContextType | undefined
>(undefined);

export const AchievementCountContextProvider: FC<
  AchievementCountProviderProps
> = ({ children }) => {
  const [achievementCount, setAchievementCount] = useState<number>(0);

  return (
    <AchievementCountContext.Provider
      value={{ achievementCount, setAchievementCount }}
    >
      {children}
    </AchievementCountContext.Provider>
  );
};
export default AchievementCountContextProvider;
