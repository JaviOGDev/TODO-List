import CustomForm from "./components/CustomForm";
import TaskList from "./components/TaskList";
import EditForm from "./components/EditForm";
import ThemeSwitcher from "./components/ThemeSwitcher";

import useLocalStorage from "./hooks/useLocalStorage";

import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useLocalStorage("todo-tasks", []);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  const deleteTask = (id) => {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const updateTask = (task) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
    );
    closeEditMode();
  };

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  };
  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  };

  const btnActivePressed = () => {
    setFilteredTasks(tasks);

    setFilteredTasks((tasks) =>
      tasks.filter((filteredTasks) => filteredTasks.checked === false)
    );
  };
  const btnDonePressed = () => {
    setFilteredTasks(tasks);
    setFilteredTasks((tasks) =>
      tasks.filter((filteredTasks) => filteredTasks.checked === true)
    );
  };

  const btnAllPressed = () => {
    setFilteredTasks(tasks);
  };

  return (
    <div className="container">
      <header>
        <h1>My TODO List</h1>
      </header>
      {isEditing && (
        <EditForm
          editedTask={editedTask}
          updateTask={updateTask}
          closeEditMode={closeEditMode}
        />
      )}
      <CustomForm addTask={addTask} />

      {filteredTasks && (
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}

      {tasks.length !== 0 && (
        <div className="btn_options_grid">
          <button className="btn" onClick={btnAllPressed}>
            All
          </button>
          <button className="btn" onClick={btnActivePressed}>
            Todo
          </button>
          <button className="btn" onClick={btnDonePressed}>
            Done
          </button>
        </div>
      )}

      <ThemeSwitcher />
    </div>
  );
}

export default App;
