import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // fetch tasks on mount
  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []);

  // add a new task 
  function addTask(title) {
    const newTask = {
      title,
      completed: false,
    };

    return fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((createdTask) => {
        setTasks((prev) => [...prev, createdTask]);
      })
      .catch((err) => console.error("Failed to add task:", err));
  }

  
  function toggleComplete(taskId) {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };

    fetch(`http://localhost:6001/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: updatedTask.completed }),
    })
      .then((res) => res.json())
      .then(() => {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? updatedTask : t))
        );
      })
      .catch((err) => console.error("Failed to toggle task:", err));
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
}
