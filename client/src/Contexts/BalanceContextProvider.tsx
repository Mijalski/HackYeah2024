import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface BalanceContextType {
  balance: number;
  setBalance: Dispatch<SetStateAction<number>>;
}

type BalanceProviderProps = {
  children: ReactNode;
};

export const BalanceContext = createContext<BalanceContextType | undefined>(
  undefined
);

export const BalanceContextProvider: FC<BalanceProviderProps> = ({
  children,
}) => {
  const [balance, setBalance] = useState<number>(0);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};
export default BalanceContextProvider;
