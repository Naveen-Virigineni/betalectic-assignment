import { useEffect, useState, useMemo } from "react";
import Header from "./components/header";
import Stats from "./components/stats";
import TaskCard from "./components/TaskCard";
import Sidebar from "./components/sideBar";
import useTasks from "./hooks/userTasks";

function App() {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("Work");
  const [searchQuery, setSearchQuery] = useState("");
  const { tasks, completed, categoryData, addTask, toggleTask, deleteTask, editTask } = useTasks();
  const filteredTasks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return tasks;
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q)
    );
  }, [tasks, searchQuery]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-gray-100 p-6">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      <Stats total={tasks.length} completed={completed} />

      <div className="block lg:hidden mt-6">
        <Sidebar data={categoryData} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* LEFT */}
        <div className="flex-1">
          {/* INPUT */}
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="E.g., Design user onboarding flow..."
              className="flex-1 p-4 rounded-xl shadow-md outline-none bg-white"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 rounded-xl bg-white shadow-md"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
              <option value="Urgent">Urgent</option>
            </select>
            <button onClick={addTask} className="bg-teal-600 text-white px-5 py-3 rounded-xl shadow-md">
              Add task
            </button>
          </div>

          {/* TASK GRID */}
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500">
              {searchQuery ? `No tasks matching "${searchQuery}"` : "No tasks yet..."}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                  editTask={editTask}
                />
              ))}
            </div>
          )}
        </div>
        {/* RIGHT */}
        <div className="hidden lg:block lg:w-72 lg:flex-shrink-0">
          <Sidebar data={categoryData} />
        </div>
      </div>
    </div>
  );
}

export default App;