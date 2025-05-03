import React, { useState } from "react";

interface NewAchievementProps {
  onAddAchievement: (achievement: { title: string; description: string; date: string }) => void;
  handleClosePopup: () => void;
}

function NewAchievement({ onAddAchievement, handleClosePopup }: NewAchievementProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (title && date && description) {
      onAddAchievement({ title, description, date });
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md bg-black p-4 shadow-lg rounded-xl">
      <div className="flex flex-col">
        <label htmlFor="title" className="text-white text-xl">
          Achievement Name
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-xl text-xl p-2"
          placeholder="Achievement Name"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="date" className="text-white text-xl">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-xl text-xl p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="details" className="text-white text-xl">
          Details
        </label>
        <textarea
          id="details"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={100}
          className="rounded-xl text-xl p-2"
          placeholder="Enter Details"
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <button
          className="text-xl text-white font-medium bg-gray-400 hover:bg-gray-600 transition-all duration-300 h-12 w-40 rounded-lg"
          onClick={handleClosePopup}
        >
          Discard
        </button>
        <button
          className="text-xl text-white font-medium bg-blue-500 hover:bg-blue-600 transition-all duration-300 h-12 w-40 rounded-lg"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default NewAchievement;
