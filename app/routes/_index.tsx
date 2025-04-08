import type { MetaFunction } from "@remix-run/node";
import { title } from "node:process";

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
      <img src="/background.png" alt="" className="w-full absolute" />
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
          <button className="px-4 py-2 bg-black rounded-2xl">
            <span className="text-2xl text-white">Create Account</span>
          </button>
          <button className="px-4 py-2 bg-black rounded-2xl">
            <span className="text-2xl text-white">Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
}
