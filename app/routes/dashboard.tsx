import React from "react";
import { NavBar } from "~/components/NavBar";

function Dashboard() {
  return (
    <div className="flex flex-col place-content-center p-4 w-full bg-white">
      <div className="flex justify-center">
        <NavBar />
      </div>
      <div className="flex gap-5 justify-between w-full mt-20">
        <div className="flex-1 bg-black p-2 rounded-xl">
          <h1 className="text-xl text-white font-semibold">Achievements</h1>
          <div className="flex flex-col gap-3 w-full mt-3 h-[15rem] overflow-y-auto">
            <Achievments
              title={"Achievement 1"}
              des={"I won a coding competition."}
              date={new Date("2005-09-12")}
            />
            <Achievments
              title={"Achievement 2"}
              des={"Participated in an internation hackathon"}
              date={new Date("2005-09-12")}
            />
            <Achievments
              title={"Achievement 3"}
              des={"I volunteered at the animal shelter"}
              date={new Date("2005-09-12")}
            />
          </div>
        </div>
        <div className="flex-1 border border-black p-2 rounded-xl"></div>
      </div>
      <div className="flex justify-stretch">
        <div className="flex flex-col gap-5 mt-5 w-full">
          <h1 className="text-3xl text-black font-semibold px-2">Scores</h1>
          <div className="grid grid-cols-2 grid-rows-2 gap-5 w-full">
            <Cards topic={"ATS Score"} score={80} />
            <Cards topic={"GPA"} score={90} />
            <Cards topic={"Achievement Target"} score={70} />
            <Cards topic={"Certificate Target"} score={70} />
          </div>
        </div>
      </div>
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
    <div className="flex-1 bg-white p-2 rounded-xl">
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
