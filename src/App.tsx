import { useState } from "react";
import "./App.css";

function App() {
  const [newTask, setNewTask] = useState<object>({});
  const [tasks, setTasks] = useState<Task[]>([]);

  //define task object
  interface Task {
    task: string;
    done: boolean;
  }

  const handleSubmit = (event: any) => {
    // to not refresh page
    event.preventDefault();
    // set the tasks to the current tasks + new task
    let updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    // to empty input field
    event.target.reset();
  };

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
            // set new task
            let task: Task = { task: e.target.value, done: false };
            setNewTask(task);
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
            <h3 className={task.done ? "done" : "todo"}>{task.task}</h3>
            <button
              onClick={() => {
                // set done to true
                task.done = true;
                let updatedTasks = [...tasks];
                // update the tasks by splicing in the updated task on same index
                updatedTasks.splice(i, 1, task);
                setTasks([...updatedTasks]);
              }}
              className="done-btn"
            >
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
