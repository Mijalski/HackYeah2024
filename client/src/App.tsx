import { useEffect } from "react";
import { gcdService } from "./api/services/gcdService";

function App() {
  // useEffect(() => {
  //   gcdService.getHelloWorld().then((data) => {
  //     console.log("response => ", data);
  //   });
  // }, []);
  return <h1 className="text-3xl">Stronka dziala</h1>;
}

export default App;
