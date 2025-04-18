import React, { useState } from "react";
import { NavBar } from "~/components/NavBar";
import NewAchievement from "~/components/student/NewAchievement";
import Threads from "~/components/Waves";

function Dashboard() {
  const [showPopup, setShowPopup] = useState(false);
  const [achievements, setAchievements] = useState<
    { title: string; des: string; date: Date }[]
  >([]);

  const handleAddClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleAddAchievement = (newAchievement: {
    title: string;
    des: string;
    date: string;
  }) => {
    setAchievements((prev) => [
      ...prev,
      {
        title: newAchievement.title,
        des: newAchievement.des,
        date: new Date(newAchievement.date),
      },
    ]);
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col place-content-center p-4 w-full bg-white">
      <NavBar />
      {/* <div className="bg-[#222] h-[350px]">
        <div
          className="bg-black rounded-2xl"
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          <Threads
            amplitude={1.5}
            distance={0.2}
            enableMouseInteraction={true}
            color={[30, 40, 40]}
          />
        </div>
      </div> */}
      <div className="flex items-start w-full mt-10 mb-5">
        <button
          className="text-xl text-white px-3 py-2 bg-black rounded-lg"
          onClick={handleAddClick}
        >
          Add +
        </button>
      </div>
      <div className="flex gap-5 justify-between w-full">
        <div className="flex-1 bg-black p-2 rounded-xl w-[70%]">
          <h1 className="text-2xl text-white font-semibold">Achievements</h1>
          <div className="flex flex-col gap-3 w-full mt-3 h-[15rem] overflow-y-auto">
            {achievements.map((achievement, index) => (
              <Achievments
                key={index}
                title={achievement.title}
                des={achievement.des}
                date={achievement.date}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 border border-black p-2 rounded-xl"></div>
      </div>

      <div className="flex justify-stretch">
        <div className="flex flex-col gap-5 mt-5 w-full">
          <div className="grid grid-cols-4 grid-rows-1 gap-5 w-full">
            <Cards topic={"ATS Score"} score={80} />
            <Cards topic={"GPA"} score={90} />
            <Cards topic={"Achievement Target"} score={70} />
            <Cards topic={"Certificate Target"} score={70} />
          </div>
        </div>
      </div>

      {/* Pop-up for New Achievement */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={handleClosePopup}
            >
              ✕
            </button>
            <NewAchievement onAddAchievement={handleAddAchievement} />
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
  date: Date;
}) => {
  return (
    <div className="flex-1 h-40 bg-white p-2 rounded-xl">
      <h1 className="font-semibold">{title}</h1>
      <p>{des}</p>
      <p>{date.toLocaleDateString()}</p>
    </div>
  );
};

const Cards = ({ topic, score }: { topic: string; score: number }) => {
  return (
    <div className="flex items-end justify-between bg-black p-2 rounded-xl flex-1">
      <h1 className="text-white text-6xl font-bold">{score}%</h1>
      <p className="text-white text-xl font-medium">{topic}</p>
    </div>
  );
};
