import { useEffect, useState } from "react";
import { useThrottle } from "../Hooks/useThrottle";

const GoodScroll = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const throttledScrollY = useThrottle(scrollY, 300);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("Throttled Scroll Y:", throttledScrollY);
  }, [throttledScrollY]);

  return (
    <div className="h-[200vh] p-1 border">
      <h1>Scroll Y Position (Throttled)</h1>
      <p>{throttledScrollY}</p>
    </div>
  );
};

export default GoodScroll;
