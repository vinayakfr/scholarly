import React, { useRef } from "react";
import { ReactNode } from "react";
import { motion } from "framer-motion";

export const NavBar = () => {
  return (
    <div className="z-0">
      <SlideTabs />
    </div>
  );
};

const SlideTabs = () => {
  const [position, setPosition] = React.useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  return (
    <>
      <ul onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }} className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1">
        <Tabs setPosition={setPosition}>Route 1</Tabs>
        <Tabs setPosition={setPosition}>Route 2</Tabs>
        <Tabs setPosition={setPosition}>Route 3</Tabs>
        <Tabs setPosition={setPosition}>Route 3</Tabs>
        <Cursor position={position} />
      </ul>
    </>
  );
};

const Tabs = ({
  children,
  setPosition,
}: {
  children: ReactNode;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (ref.current) {
          const { width } = ref.current.getBoundingClientRect();
          setPosition({
            left: ref.current.offsetLeft,
            width: width,
            opacity: 1,
          });
        }
      }}
      className="relative z-10 block cursor-pointer px-3 py-1 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({
  position,
}: {
  position: { left: number; width: number; opacity: number };
}) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-12 w-36 rounded-full bg-black mg:h-12"
    />
  );
};
