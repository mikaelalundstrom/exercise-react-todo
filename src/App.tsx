import { useState } from "react";
import "./App.css";

function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);

  const handleSubmit = (event: any) => {
    // to not refresh page
    event.preventDefault();
    // set the tasks to the current tasks + new task
    setTasks((tasks) => [...tasks, newTask]);
    // to empty input field
    event.target.reset();
  };

  // change individual h3 class to done
  const updateStatus = (event: any) => {};

  // filter out clicked task for tasks list, set tasks again
  const handleRemove = (i: number) => {
    const updatedTasks = tasks.filter((task, index) => index !== i);
    setTasks(updatedTasks);
  };

  return (
    <>
      <h1>To-do List</h1>
      <h2>Write a New Task:</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          type="text"
          placeholder="Enter task..."
          required
        />
        <button>Add</button>
      </form>

      <h2>Your Tasks:</h2>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            <h3 className="todo">{task}</h3>
            <button onClick={updateStatus} className="done-btn">
              Done
            </button>
            <button
              onClick={() => {
                handleRemove(i);
              }}
              className="remove-btn"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
