import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { LampContainer } from "~/components/LightBulb";

export const meta: MetaFunction = () => {
  return [
    { title: "Scholarly" },
    {
      name: "Student portfolio management services",
      content: "Welcome to Scholarly",
    },
  ];
};

export default function Index() {
  const subtitle = "(adj.) [skaw-lar-lee]";
  return (
    <div>
      {/* <img src="/background.png" alt="" className="w-full absolute" />
      <div className="px-6 py-6 relative">
        <div className="flex place-content-end place-items-end w-full px-5">
          <button className="bg-black px-3 py-2 rounded-full shadow-xl hover:shadow transition duration-300">
            <span className="text-white text-lg font-medium">About Us</span>
          </button>
        </div>
        <div className="flex flex-col gap-5 place-content-start place-items-start px-10 mt-40">
          <h1 className="text-9xl">Scholarly</h1>
          <p className="text-2xl italic">{subtitle}</p>
          <p className="text-2xl flex-wrap w-[40rem]">
            You personal resume builder which keeps a track of all your
            accomplishments so that you can focus on winning
          </p>
        </div>
        <div className="flex gap-4  place-content-end w-full xl:mt-52">
          <a href="signin">
            <button className="px-4 py-2 bg-black rounded-2xl">
              <span className="text-2xl text-white">Sign In</span>
            </button>
          </a>
        </div>
      </div> */}
      <LampContainer>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: -80 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-white py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Scholarly
        </motion.div>

        <motion.div
          className="flex items-center gap-10 text-2xl text-white italic"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.45,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <button className="bg-white rounded-lg w-32 h-12">
            <a href="/">
              <span className="text-2xl text-black">About Us</span>
            </a>
          </button>
          <button className="bg-gradient-to-tr from-rose-600 via-red-600 to-orange-600 rounded-lg w-32 h-12">
            <a href="/signin">
              <span className="text-2xl text-white">Sign In</span>
            </a>
          </button>
        </motion.div>
      </LampContainer>
    </div>
  );
}
