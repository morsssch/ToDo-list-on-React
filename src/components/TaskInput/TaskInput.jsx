import { useState } from "react";
import "./TaskInput.css";

export default function TaskInput({ newTask }) {
    const [taskText, setTaskText] = useState();

    function inputUpdate(event) {
        setTaskText(event.target.value);
    }

    function submitHandle(event) {
        event.preventDefault();
        if (!taskText.trim()) return;
        newTask(taskText);
        setTaskText("");
    }

    return (
        <form className="TaskInput" onSubmit={submitHandle}>
            <input
                type="text"
                name="newTask"
                id="taskInput"
                placeholder="Добавить задачу"
                value={taskText}
                onChange={inputUpdate}
            />
            <button>+</button>
        </form>
    );
}
