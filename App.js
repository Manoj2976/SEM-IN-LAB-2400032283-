import React, { useState, useEffect } from "react";

function TodoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    // Load saved tasks from local storage on first render
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1>📝 Advanced To-Do List</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid gray",
            marginRight: "10px",
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          width: "350px",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        {tasks.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              margin: "8px 0",
              borderRadius: "8px",
              backgroundColor: item.completed ? "#d4edda" : "#f8f9fa",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <span
              onClick={() => toggleComplete(index)}
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                color: item.completed ? "gray" : "black",
                cursor: "pointer",
              }}
            >
              {item.text}
            </span>
            <button
              onClick={() => deleteTask(index)}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && <p>No tasks yet — add one above!</p>}
    </div>
  );
}

export default TodoList;