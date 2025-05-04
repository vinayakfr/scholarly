import React, { useState } from "react";

interface NewTodoProps {
  onAddTodo: (todo: {
    title: string;
    description: string;
    date: string;
    status: boolean;
  }) => void;
  handleClosePopup: () => void;
}

function NewTodo({ onAddTodo, handleClosePopup }: NewTodoProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(false); // Default status is false (not completed)

  const handleSave = () => {
    if (title && description && date) {
      onAddTodo({ title, description, date, status });
      setTitle(""); // Clear the title field
      setDescription(""); // Clear the description field
      setDate(""); // Clear the date field
      setStatus(false); // Reset the status field
      handleClosePopup(); // Close the popup
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md bg-black p-4 shadow-lg rounded-xl">
      <div className="flex flex-col">
        <label htmlFor="title" className="text-white text-xl">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-xl text-xl p-2"
          placeholder="Enter task title"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="text-white text-xl">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-xl text-xl p-2"
          placeholder="Enter task description"
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
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="status"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
          className="h-5 w-5"
        />
        <label htmlFor="status" className="text-white text-lg">
          Mark as Completed
        </label>
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

export default NewTodo;
