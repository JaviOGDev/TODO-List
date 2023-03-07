import { CheckIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
  const [updateTaskName, setUpdatedTaskName] = useState(editedTask.name);
  123;
  useEffect(() => {
    const closeModalIfEscaped = (e) => {
      e.key === "Escape" && closeEditMode();
    };
    window.addEventListener("keydown", closeModalIfEscaped);

    return () => {
      window.removeEventListener("keydown", closeModalIfEscaped);
    };
  }, [closeEditMode]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateTask({ ...editedTask, name: updateTaskName });
  };

  return (
    <div
      role="dialog"
      aria-labelledby="editTask"
      onClick={(e) => {
        e.target === e.currentTarget && closeEditMode();
      }}
    >
      <form className="todo" onSubmit={handleFormSubmit}>
        <div className="wrapper">
          <input
            type="text"
            id="editTask"
            className="input"
            value={updateTaskName}
            onInput={(e) => setUpdatedTaskName(e.target.value)}
            required
            autoFocus
            maxLength={60}
            placeholder="Update Task"
          />
          <label htmlFor="editTask" className="label">
            Enter Task
          </label>
        </div>
        <button
          className="btn"
          aria-label={`Confirm edited task to now read ${updateTaskName}`}
          type="submit"
        >
          <CheckIcon stroke={2} height={24} width={24} />
        </button>
      </form>
    </div>
  );
};

export default EditForm;
