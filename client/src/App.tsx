import Layout from "./components/Layout";
import { LanguageContextProvider } from "./Contexts/LangSelectedContextProvider";

function App() {
  return (
    <LanguageContextProvider>
      <Layout />
    </LanguageContextProvider>
  );
}

export default App;
