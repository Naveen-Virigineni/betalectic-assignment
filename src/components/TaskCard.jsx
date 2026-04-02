import { Trash2, Pencil, Check, X } from "lucide-react";
import { useState } from "react";

const CATEGORIES = ["Work", "Personal", "Study", "Urgent"];

function TaskCard({ task, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(task.category);

  const handleSave = () => {
    editTask(task.id, selectedCategory);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setSelectedCategory(task.category); // reset to original
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition relative">

      {/* TOP-RIGHT ICONS — Edit + Delete */}
      <div className="absolute top-3 right-3 flex gap-1">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-1 rounded-full hover:bg-purple-100 text-gray-400 hover:text-purple-500 transition"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-1 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500 transition"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <p className="text-sm text-gray-400 mb-2">{task.time}</p>

      <h2
        className={`font-semibold text-lg mb-1 ${
          task.status === "done" ? "line-through text-gray-400" : ""
        }`}
      >
        {task.title}
      </h2>

      <p className="text-gray-500 text-sm mb-2">{task.desc}</p>

      {/* CATEGORY — view or edit mode */}
      {isEditing ? (
        <div className="flex items-center gap-2 mb-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 text-sm p-1.5 rounded-lg border border-gray-200 outline-none focus:border-purple-400"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={handleSave}
            className="p-1.5 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition"
          >
            <Check size={14} />
          </button>
          <button
            onClick={handleCancel}
            className="p-1.5 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <p className="text-xs mb-3 text-purple-500 font-medium">
          {task.category}
        </p>
      )}

      <button
        onClick={() => toggleTask(task.id)}
        className={`w-full py-2 rounded-lg ${
          task.status === "done"
            ? "bg-green-500 text-white"
            : "bg-gray-200"
        }`}
      >
        {task.status === "done" ? "✔ Completed" : "○ Mark as Done"}
      </button>
    </div>
  );
}

export default TaskCard;