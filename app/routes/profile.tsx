import React from "react";
import Carousel from "~/components/FacultyCarousel";
import { NavBar } from "~/components/NavBar";
import AchievementSlider from "~/components/student/AchievementSlider";
import { MdOutlineEmail } from "react-icons/md";
import Scholarly from "~/components/Scholarly";
import { PiStudentBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import Wow from "~/components/Wow";

function Profile() {
  return (
    <div className="flex flex-col place-content-center p-4 w-full bg-white">
      <NavBar />
      <div className="flex flex-1 items-start justify-between gap-4 w-full mt-20">
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex-1 bg-[#222] rounded-xl p-3">
            <h1 className="text-3xl text-white font-semibold">
              Hello, Vinayak!
            </h1>
            <div className="flex items-center gap-2 text-gray-100/50">
              <PiStudentBold className="size-5" />
              <h1 className="text-lg">RA2311026010761</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-100/50">
              <MdOutlineEmail className="size-5" />
              <h1 className="text-lg">vs2052@srmist.edu.in</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-100/50">
              <SiGoogleclassroom className=" size-5" />
              <h1 className="text-lg">AC2</h1>
            </div>
          </div>
          <div className="bg-[#222] flex items-center place-content-center rounded-xl w-full p-4">
            <button className="text-black bg-white text-md px-2 py-2 font-medium rounded hover:bg-orange-500 hover:text-white transition duration-300">
              View Resume
            </button>
          </div>
          <div
            className=" bg-white border-2 border-black flex flex-col items-center place-content-start 
            rounded-xl w-full p-4
          "
          >
            <div className="flex items-center justify-between w-full">
              <h1 className="text-black text-xl font-semibold">To-Do's</h1>
              <button className="text-black text-2xl">+</button>
            </div>
            <div className="flex flex-col gap-2 w-full min-h-auto max-h-[350px] overflow-x-scroll">
              <TodoCard title="Get good grades" date={new Date()} />
              <TodoCard title="Complete Course" date={new Date()} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-start">
          <div className="flex gap-5">
            <Carousel />
            <div className="flex flex-col gap-5 border border-black rounded-xl p-3">
              <div>
                <label className="text-xl font-medium">Parameter 1</label>
                <AchievementSlider progress={50} />
              </div>

              <div>
                <label className="text-xl font-medium">Parameter 2</label>
                <AchievementSlider progress={20} />
              </div>
              <div>
                <label className="text-xl font-medium">Parameter 3</label>
                <AchievementSlider progress={70} />
              </div>
            </div>
          </div>
          <div className="w-full">
            <Scholarly />
          </div>
          <div className="flex flex-1 items-center justify-between w-full bg-[#222] rounded-xl p-3">
            <div>
              <Wow />
            </div>
            <div className="flex flex-col gap-3 items-center justify-between w-full">
              <div className="flex items-center justify-between bg-white w-full rounded-xl p-2">
                <h1 className="text-xl font-semibold">Parameter 1</h1>
                <button className="text-white bg-[#222] rounded px-3 py-2 hover:scale-95 transition duration-200">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between bg-white w-full rounded-xl p-2">
                <h1 className="text-xl font-semibold">Parameter 2</h1>
                <button className="text-white bg-[#222] rounded px-3 py-2 hover:scale-95 transition duration-200">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between bg-white w-full rounded-xl p-2">
                <h1 className="text-xl font-semibold">Parameter 3</h1>
                <button className="text-white bg-[#222] rounded px-3 py-2 hover:scale-95 transition duration-200">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

const TodoCard = ({ title, date }: { title: string; date: Date }) => {
  return (
    <div className="text-white bg-[#222] p-2 w-full rounded-xl">
      <h1 className="text-lg font-medium">{title}</h1>
      <p className="italic">{date.toDateString()}</p>
    </div>
  );
};
