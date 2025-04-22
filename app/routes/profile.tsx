import React, { useDebugValue, useEffect } from "react";
import Carousel from "~/components/FacultyCarousel";
import { NavBar } from "~/components/NavBar";
import AchievementSlider from "~/components/student/AchievementSlider";
import { MdOutlineEmail } from "react-icons/md";
import Scholarly from "~/components/Scholarly";
import { PiStudentBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";

function Profile() {
  const [profile, setProfile] = React.useState<{
    name: string;
    regnum: string;
    email: string;
    section: string;
  }>({
    name: "",
    regnum: "",
    email: "",
    section: "",
  });

  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/profile/showprofiledetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Error loading user details");
        return;
      }

      const result = await response.json();
      console.log("Data fetched successfully", result);

      setProfile(result.data);
    } catch (error) {
      console.log("Cannot fetch user details!", error);
    }
  };

  const [todos, setTodos] = React.useState<
    {
      id: number;
      title: string;
      date: Date;
    }[]
  >([]);

  const fetchTodo = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/todo/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Error fetching to-do's");
        return;
      }

      const checklist = await response.json();
      console.log("Data fetch successfully!");

      setTodos(checklist.data);
    } catch (error) {
      console.log("Cannot fetch to-do's!", error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchTodo();
  }, []);

  return (
    <div className="flex flex-col place-content-center p-4 w-full bg-white">
      <NavBar />
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4 w-full mt-20">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex-1 bg-[#222] rounded-xl p-3 w-full">
            <h1 className="text-3xl text-white font-semibold">
              Hello, {profile.name || "Loading..."}!
            </h1>
            <div className="flex items-center gap-2 text-gray-100/50">
              <PiStudentBold className="size-5" />
              <h1 className="text-lg">{profile.regnum || "Loading..."}</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-100/50">
              <MdOutlineEmail className="size-5" />
              <h1 className="text-lg">{profile.email || "Loading..."}</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-100/50">
              <SiGoogleclassroom className=" size-5" />
              <h1 className="text-lg">{profile.section || "Loading..."}</h1>
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
              {todos.map((todo) => (
                <TodoCard
                  key={todo.id}
                  title={todo.title}
                  date={new Date(todo.date)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-start w-full">
          <div className="flex flex-col lg:flex-row gap-5 w-full">
            <Carousel />
            <div className="flex flex-col flex-1 gap-5 border border-black rounded-xl w-full p-3">
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
          <div className="flex flex-1 items-center justify-between h-auto w-full bg-[#222] rounded-xl p-3">
            <div className="grid grid-cols-1 gap-3 items-center justify-between w-full">
              <ParameterCard title={"Achievements"} link={""} />
              <ParameterCard title={"Courses"} link={""} />
              <ParameterCard title={"Certifications"} link={""} />
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

const ParameterCard = ({ title, link }: { title: string; link: string }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-between bg-white rounded-xl p-4 w-full">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="flex justify-end w-full">
          <a href={link}>
            <button className="text-white bg-[#222] rounded px-3 py-2 hover:scale-95 transition duration-200">
              View
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
