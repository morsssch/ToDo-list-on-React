import { useState } from "react";
import "./Task.css";

export default function Task({ task, ...taskActions }) {
    const [text, setText] = useState(task.text);
    const { removeTask, makeDoneTask, toggleEditTask, updateTaskText } = taskActions;

    function handleChange(event) {
        setText(event.target.value);
        updateTaskText(task.id, event.target.value)
    }

    return (
        <div className={task.isDone ? "Task isDone" : "Task"}>
            {task.isEdit ? (
                <div>
                    <input
                        type="text"
                        value={text}
                        onChange={handleChange}
                    />
                    <button onClick={() => toggleEditTask(task.id)}>Сохранить</button>
                </div>
            ) : (
                <p>{text}</p>
            )}
            
            <div className="TaskButtons">
                <button onClick={() => makeDoneTask(task.id)}>✔️</button>
                <button onClick={() => toggleEditTask(task.id)}>✏️</button>
                <button onClick={() => removeTask(task.id)}>🗑️</button>
            </div>
        </div>
    );
}
