import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
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
  const [balance, setBalance] = useState<number>(() => {
    const balanceCache = localStorage.getItem("balance");
    return balanceCache ? parseInt(balanceCache) : 0;
  });

  useEffect(() => {
    localStorage.setItem("balance", balance.toString());
  }, [balance]);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export default BalanceContextProvider;
