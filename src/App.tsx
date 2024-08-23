import { ChangeEvent, FormEvent, useState } from "react";

// INTERFACE
interface Task {
  task: string;
  done: boolean;
}

function App() {
  const [newTask, setNewTask] = useState<Task>({ task: "", done: false });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [todoCounter, setTodoCounter] = useState<number>(0);

  // ONSUBMIT:  ADD NEWTASK TO TASKS LIST
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // set counter +1
    setTodoCounter(todoCounter + 1);
    // set the tasks to the current tasks + new task
    let updatedTasks: Task[] = [...tasks, newTask];
    setTasks(updatedTasks);
    // to empty input field
    const formElem = event.target as HTMLFormElement;
    formElem.reset();
  };

  // ONCHANGE: SAVE INPUT TO NEWTASK
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const task: Task = { task: event.target.value, done: false };
    setNewTask(task);
  };

  // ONCLICK: MARK TASK AS DONE
  const handleDone = (task: Task, i: number) => {
    // set counter -1
    setTodoCounter(todoCounter - 1);
    // set done as true
    task.done = true;
    let updatedTasks = [...tasks];
    // update the tasks by splicing in the updated task on same index
    updatedTasks.splice(i, 1, task);
    setTasks([...updatedTasks]);
  };

  // ONCLICK: REMOVE TASK
  const handleRemove = (task: Task, i: number) => {
    if (task.done === false) {
      // set counter -1
      setTodoCounter(todoCounter - 1);
    }

    let updatedTasks = [...tasks];
    // update the tasks by splicing away task to be removed
    updatedTasks.splice(i, 1);
    setTasks([...updatedTasks]);
  };

  // ONCLICK: CLEAR (REMOVE) DONE TASKS
  const handleClear = () => {
    // update tasks with only those that aren't done
    const updatedTasks = tasks.filter((task) => task.done === false);
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="h1-counter-container">
        <h1>To-do List</h1>
        {/* show different message if counter is 0 */}
        {todoCounter === 0 ? (
          <p>
            No tasks <br /> to do!
          </p>
        ) : (
          <p>
            # of tasks <br /> to do: {todoCounter}
          </p>
        )}
      </div>
      <h2>Write a New Task:</h2>
      <form onSubmit={handleSubmit}>
        <input onChange={handleInputChange} type="text" placeholder="Enter task..." required />
        <button>Add</button>
      </form>
      {/* only show heading if tasks isn't empty */}
      {tasks.length === 0 ? null : <h2>Your Tasks:</h2>}
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            <h3 className={task.done ? "done" : "todo"}>{task.task}</h3>
            <button
              onClick={() => handleDone(task, i)}
              // button appear grey if done
              className={`done-btn ${task.done ? "grey" : ""}`}
            >
              Done
            </button>
            <button onClick={() => handleRemove(task, i)} className="remove-btn">
              Remove
            </button>
          </li>
        ))}
      </ul>
      {/* only show if at least one task is marked as done */}
      {tasks.some((task) => task.done === true) ? (
        <div className="clear-container">
          <button onClick={handleClear} className="remove-btn">
            Clear Done
          </button>
        </div>
      ) : null}
    </>
  );
}

export default App;
