import Layout from "./components/Layout";
import AchievementCountContextProvider from "./Contexts/AchievementCountProvider";
import BalanceContextProvider from "./Contexts/BalanceContextProvider";
import { LanguageContextProvider } from "./Contexts/LangSelectedContextProvider";

function App() {
  return (
    <AchievementCountContextProvider>
      <LanguageContextProvider>
        <BalanceContextProvider>
          <Layout />
        </BalanceContextProvider>
      </LanguageContextProvider>
    </AchievementCountContextProvider>
  );
}

export default App;
