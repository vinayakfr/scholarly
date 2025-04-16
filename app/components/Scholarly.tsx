import React, { useEffect } from "react";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { playSound } from "./lib/utils";

function Scholarly() {
  const handleClick = (source: string) => {
    playSound(source);
  };

  const letters = ["S", "C", "H", "O", "L", "A", "R", "L", "Y"];
  const allowedKeys = new Set(letters.map((l) => l.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (allowedKeys.has(key.toLowerCase())) {
        handleClick("/Click.mp3");
      } else if (key === "T") {
        // You can assign a key like 'T' to trigger the trophy sound
        handleClick("/Click.mp3");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="grid grid-cols-5 grid-rows-2 lg:grid-cols-10 lg:grid-rows-1 gap-3 rounded-xl border border-black p-3">
      {letters.map((letter, index) => (
        <KeyCap
          key={index}
          text={letter}
          onClick={() => handleClick("/Click.mp3")}
        />
      ))}
      <button
        onClick={() => handleClick("/Click.mp3")}
        className="flex items-center place-content-center bg-[#222] rounded-lg w-20 h-20 hover:scale-95 transition duration-200"
      >
        <MdOutlineEmojiEvents size={25} color="white"/>
      </button>
    </div>
  );
}

const KeyCap = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#222] border-2 border-black text-white rounded-lg w-20 h-20 hover:scale-95 hover:bg-white hover:text-black transition duration-200"
    >
      {text}
    </button>
  );
};

export default Scholarly;
