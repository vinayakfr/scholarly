import React, { useState } from "react";
import { NavBar } from "~/components/NavBar";
import NewAchievement from "~/components/student/NewAchievement";

function Dashboard() {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddAchievement = async (newAchievement: {
    title: string;
    des: string;
    date: string;
  }) => {
    try {
      // Send the new achievement to the backend
      const response = await fetch("http://localhost:5050/api/addachievement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          achievement: newAchievement.title,
          achievedate: newAchievement.date,
          achievedesc: newAchievement.des,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add achievement");
      }

      const data = await response.json();
      console.log("Achievement added successfully:", data);

      // Close the popup
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding achievement:", error);
      alert("Failed to add achievement. Please try again.");
    }
  };

  const [myAchievements, setMyAchievements] = useState<
    {
      id: number;
      achievement: string;
      date: string;
      description: string;
    }[]
  >([]);

  const fetchAchievements = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/myachievements", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Error loading achievements!");
        return;
      }

      const achievements = await response.json();
      console.log("Achievements fetched successfully!", achievements);

      setMyAchievements(achievements.data);
    } catch (error) {
      console.log("Cannot fetch achievements!", error);
    }
  };

  React.useEffect(() => {
    fetchAchievements();
  }, []);

  return (
    <div className="flex flex-col place-content-center p-4 w-full bg-white">
      <NavBar />
      <div className="flex items-start w-full mt-10 mb-5">
        <button
          className="text-xl text-white px-3 py-2 bg-[#222] rounded-lg"
          onClick={handleAddClick}
        >
          Add +
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 justify-between w-full">
        <div className="flex-1 bg-[#222] p-2 rounded-xl lg:w-[70%]">
          <h1 className="text-2xl text-white font-semibold">Achievements</h1>
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
        <div className="flex-1 border border-[#222] p-2 rounded-xl"></div>
      </div>

      <div className="flex flex-col gap-5 mt-5 w-full">
        <div className="lg:grid lg:grid-cols-4 lg:grid-rows-1 flex flex-col gap-5 w-full">
          <Cards topic={"ATS Score"} score={80} />
          <Cards topic={"GPA"} score={90} />
          <Cards topic={"Achievement Target"} score={70} />
          <Cards topic={"Certificate Target"} score={70} />
        </div>
      </div>

      {/* Pop-up for New Achievement */}
      {showPopup && (
        <div className="fixed inset-0 bg-[#222] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
            <NewAchievement
              onAddAchievement={handleAddAchievement}
              handleClosePopup={handleClosePopup}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

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
      <p>{new Date(date).toDateString()}</p>
    </div>
  );
};

const Cards = ({ topic, score }: { topic: string; score: number }) => {
  return (
    <div className="flex items-end justify-between bg-[#222] p-2 rounded-xl flex-1">
      <h1 className="text-white text-6xl font-bold">{score}%</h1>
      <p className="text-white text-xl font-medium">{topic}</p>
    </div>
  );
};
