import React, { useRef } from "react";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "@remix-run/react";
import { CgDarkMode } from "react-icons/cg";
import { PiHamburgerFill } from "react-icons/pi";

export const NavBar = () => {
  return (
    <div className="flex items-center justify-between lg:justify-evenly z-0 w-full">
      <h1 className="text-4xl font-black">Scholarly</h1>
      <SlideTabs />
      <div className="flex gap-4 items-center">
        <button className="flex items-center place-content-center rounded-full">
          <CgDarkMode className="size-7"/>
        </button>
        <button>
          <PiHamburgerFill className="lg:hidden size-7"/>
        </button>
        <a href="/">
          <button className="hidden lg:flex px-2 py-1 bg-black rounded-lg">
            <span className="text-lg text-white">Log Out</span>
          </button>
        </a>
      </div>
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
      <ul
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }));
        }}
        className="hidden lg:flex relative mx-auto w-fit rounded-full border-2 border-black bg-white p-1"
      >
        <Tabs setPosition={setPosition} route={"/dashboard"}>Home</Tabs>
        <Tabs setPosition={setPosition} route={""}>Route 2</Tabs>
        <Tabs setPosition={setPosition} route={""}>Route 3</Tabs>
        <Tabs setPosition={setPosition} route={""}>Route 3</Tabs>
        <Cursor position={position} />
      </ul>
    </>
  );
};

const Tabs = ({
  route,
  children,
  setPosition,
}: {
  children: ReactNode;
  setPosition: React.Dispatch<
    React.SetStateAction<{ left: number; width: number; opacity: number }>
  >;
  route: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <Link to={route}>
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
    </Link>
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
