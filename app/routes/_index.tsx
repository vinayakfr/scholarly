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

  return (
    <div>
      <LampContainer>
          <>
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
              className="flex items-center gap-10 text-2xl text-white italic "
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
          </>
      </LampContainer>
    </div>
  );
}
