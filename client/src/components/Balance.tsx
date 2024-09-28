import { useContext } from "react";
import { icons } from "../assets/icons.const";
import { BalanceContext } from "../Contexts/BalanceContextProvider";

const Balance = () => {
  const balanceContext = useContext(BalanceContext);

  if (!balanceContext) {
    throw new Error("BalanceContext must be used within a BalanceProvider");
  }

  const { balance } = balanceContext;
  return (
    <div className="text-[#273237] flex px-4 py-2 rounded-md justify-center items-center space-x-4 text-2xl bg-bgPrimary select-none">
      <img src={icons.COIN} className="w-7" />
      <span>{balance}</span>
    </div>
  );
};

export default Balance;
