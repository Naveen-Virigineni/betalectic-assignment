import { useState, useEffect, useMemo } from "react";

function userTasks() {
  const [tasks, setTasks] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = (input, category) => {
    if (!input.trim()) return { error: "Task title cannot be empty!" };

    // Duplicate check
    const isDuplicate = tasks.some(
      (t) => t.title.toLowerCase() === input.trim().toLowerCase()
    );
    if (isDuplicate) return { error: "A task with this title already exists!" };

    const newTask = {
      id: Date.now(),
      title: input.trim(),
      desc: "No description",
      status: "pending",
      category: category.trim(),
      time: "Just now",
    };

    setTasks((prev) => [newTask, ...prev]);
    return { error: null };
  };

  // Toggle task status
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "done" ? "pending" : "done" }
          : t
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Edit task category
  const editTask = (id, newCategory) => {
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, category: newCategory } : t)
    );
  };

  // Category data for chart
  const categoryData = useMemo(() => {
    const data = { Work: 0, Personal: 0, Study: 0, Urgent: 0 };
    tasks.forEach((task) => {
      const cat = task.category?.trim();
      if (data[cat] !== undefined) data[cat]++;
    });
    return data;
  }, [tasks]);

  const completed = tasks.filter((t) => t.status === "done").length;

  

  return {
    tasks,
    completed,
    categoryData,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
  };
}

export default userTasks;