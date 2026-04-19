import { useEffect, useRef } from "react";

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      return undefined;
    }

    const handleMouseMove = (event) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.left = `${event.clientX - 14}px`;
      cursorRef.current.style.top = `${event.clientY - 14}px`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <img
      ref={cursorRef}
      src="https://pngfre.com/wp-content/uploads/Cricket-1-1-1024x1024.png"
      alt="cursor"
      className="pointer-events-none fixed z-50 hidden h-7 w-7 opacity-70 lg:block"
    />
  );
};

export default Cursor;
