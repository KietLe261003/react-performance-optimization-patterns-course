import { useEffect, useState } from "react";

const BadScroll = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      console.log("Scroll Y:", window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="h-[200vh] p-1 border">
        <h1>Scroll Y Position</h1>
        <p>{scrollY}</p>
    </div>
  );
};

export default BadScroll;
