import React, { useDebugValue, useEffect, useState } from "react";
import Carousel from "~/components/FacultyCarousel";
import { NavBar } from "~/components/NavBar";
import AchievementSlider from "~/components/student/AchievementSlider";
import { MdOutlineEmail } from "react-icons/md";
import Scholarly from "~/components/Scholarly";
import { PiStudentBold } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import NewTodo from "~/components/student/NewTodo";
import NewAchievement from "~/components/student/NewAchievement";

function Profile() {
  const [myAchievements, setMyAchievements] = useState<
    {
      id: number;
      achievement: string;
      date: string;
      description: string;
    }[]
  >([]);

  const [todo, setTodo] = useState<
    {
      id: number;
      title: string;
      date: string;
      status: boolean;
      description: string;
    }[]
  >([]);

  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    regnum: string;
    section: string;
  } | null>(null);

  const [showAchievementPopup, setShowAchievementPopup] = useState(false);
  const [showTodoPopup, setShowTodoPopup] = useState(false);

  const handleAddClick = () => {
    setShowAchievementPopup(true);
  };

  const handleClosePopup = () => {
    setShowAchievementPopup(false);
  };

  const handleAddTodoClick = () => {
    setShowTodoPopup(true);
  };

  const handleCloseTodoPopup = () => {
    setShowTodoPopup(false);
  };

  const handleAddAchievement = async (newAchievement: {
    title: string;
    description: string;
    date: string;
  }) => {
    try {
      const response = await fetch("http://localhost:5050/api/achievement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token
        },
        body: JSON.stringify({
          title: newAchievement.title, // Match the backend field
          date: newAchievement.date, // Match the backend field
          description: newAchievement.description, // Match the backend field
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add achievement");
      }

      const data = await response.json();
      console.log("Achievement added successfully:", data);

      fetchAchievements();

      setShowAchievementPopup(false);
    } catch (error) {
      console.error("Error adding achievement:", error);
      alert("Failed to add achievement. Please try again.");
    }
  };

  const fetchAchievements = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found. Redirecting to login...");
        window.location.href = "/signin";
        return;
      }

      const response = await fetch("http://localhost:5050/api/achievement", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        console.log("Token expired. Redirecting to login...");
        localStorage.removeItem("token");
        window.location.href = "/signin";
        return;
      }

      if (!response.ok) {
        console.log("Error loading achievements!");
        return;
      }

      const achievements = await response.json();
      console.log("Achievements fetched successfully!", achievements);

      setMyAchievements(achievements.data); // Update the state with the fetched achievements
    } catch (error) {
      console.log("Cannot fetch achievements!", error);
    }
  };

  const handleAddTodo = async (newTodo: {
    title: string;
    description: string;
    date: string;
    status: boolean;
  }) => {
    try {
      const response = await fetch("http://localhost:5050/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: newTodo.title,
          description: newTodo.description,
          due_date: newTodo.date,     
          is_completed: newTodo.status
        }),        
      });

      if (!response.ok) {
        console.log("Failed to add todo");
      }

      const data = await response.json();
      console.log("Todo added successfully", data);

      handleFetchTodo();

      setShowTodoPopup(false);
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("Failed to add todo. Please try again.");
    }
  };

  const handleFetchTodo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found!");
        window.location.href = "/signin";
        return;
      }

      const response = await fetch("http://localhost:5050/api/todo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log("Error loading todos!");
        return;
      }

      const todo = await response.json();
      console.log("Todos fetched successfully!", todo);

      setTodo(todo.data);
    } catch (error) {
      console.log("Cannot fetch todo!", error);
    }
  };

  const handleFetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found!");
        window.location.href = "/signin";
        return;
      }

      const response = await fetch(
        "http://localhost:5050/api/profile/profiledetails",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("Error loading profile details!");
        return;
      }

      const profiledetails = await response.json();
      console.log("Profile details fetched successfully!", profiledetails);

      setProfile(profiledetails.data);
    } catch (error) {
      console.log("Cannot fetch profile details!", error);
    }
  };

  React.useEffect(() => {
    handleFetchTodo();
    handleFetchProfile();
    fetchAchievements();
  }, []);

  return (
    <div className="flex flex-col place-content-center p-4 w-full bg-white">
      <NavBar />
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4 w-full mt-20">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex-1 bg-[#222] rounded-xl p-3 w-full">
            <h1 className="text-3xl text-white font-semibold">
              Hello, {profile?.name}!
            </h1>
            <div className="flex items-center gap-2 text-gray-100/50">
              <PiStudentBold className="size-5" />
              <h1 className="text-lg">{profile?.regnum}</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-100/50">
              <MdOutlineEmail className="size-5" />
              <h1 className="text-lg">{profile?.email}</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-100/50">
              <SiGoogleclassroom className=" size-5" />
              <h1 className="text-lg">{profile?.section}</h1>
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
              <button onClick={handleAddTodoClick} className="text-black text-2xl">+</button>
            </div>
            <div className="flex flex-col gap-2 w-full min-h-auto max-h-[350px] overflow-x-scroll">
              {todo.map((todo, index) => (
                <TodoCard
                  key={todo.id}
                  title={todo.title}
                  status={todo.status}
                  date={todo.date}
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
                <label className="text-xl font-medium">CGPA</label>
                <AchievementSlider progress={50} />
              </div>

              <div>
                <label className="text-xl font-medium">ATS Score</label>
                <AchievementSlider progress={20} />
              </div>
              <div>
                <label className="text-xl font-medium">Progress</label>
                <AchievementSlider progress={70} />
              </div>
            </div>
          </div>
          <div className="w-full">
            <Scholarly />
          </div>
          <div className="flex flex-1 items-center justify-between h-auto w-full bg-[#222] rounded-xl p-3">
            <div className="flex-1 bg-[#222] p-2 rounded-xl lg:w-[70%]">
              <div className="flex justify-between items-center w-full">
                <h1 className="text-2xl text-white font-semibold">
                  Achievements
                </h1>
                <button
                  className="text-xl text-black px-2 py-2 bg-white rounded-lg"
                  onClick={handleAddClick}
                >
                  Add +
                </button>
              </div>
              <div className="flex flex-col gap-3 w-full mt-3 h-[15rem] overflow-y-auto">
                {myAchievements.map((myAchievements, index) => (
                  <Achievments
                    key={myAchievements.id}
                    title={myAchievements.achievement}
                    des={myAchievements.description}
                    date={myAchievements.date}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAchievementPopup && (
        <div className="fixed inset-0 bg-[#222] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
            <NewAchievement
              onAddAchievement={handleAddAchievement}
              handleClosePopup={handleClosePopup}
            />
          </div>
        </div>
      )}

      {showTodoPopup && (
        <div className="fixed inset-0 bg-[#222] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
            <NewTodo 
            onAddTodo={handleAddTodo} handleClosePopup={handleCloseTodoPopup}              
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;

const TodoCard = ({
  title,
  date,
  status,
}: {
  title: string;
  date: string;
  status: boolean;
}) => {
  return (
    <div className="text-white bg-[#222] p-2 w-full rounded-xl">
      <h1 className="text-lg font-medium">{title}</h1>
      <p className="italic">{date}</p>
      <p>{status}</p>
    </div>
  );
};

const Achievments = ({
  title,
  des,
  date,
}: {
  title: string;
  des: string;
  date: string;
}) => {
  return (
    <div className="flex-1 h-40 bg-white p-2 rounded-xl">
      <h1 className="font-semibold">{title}</h1>
      <p>{des}</p>
      <p>{date}</p>
    </div>
  );
};