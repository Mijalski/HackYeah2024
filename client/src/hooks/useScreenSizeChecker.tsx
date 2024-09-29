import { useEffect, useState } from "react";

export const useScreenSizeChecker = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 639);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 639);
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isSmallScreen };
};
