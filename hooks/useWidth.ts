import { useEffect, useState } from "react";

export default function UseWidth() {
  const [windowWidth, setWindowWitdh] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWitdh(window.innerWidth);
      const handleResize = () => setWindowWitdh(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return windowWidth;
}
