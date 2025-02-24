import TaskInput from "./components/TaskInput/TaskInput.jsx";
import TaskContainer from "./components/TaskContainer/TaskContainer.jsx";
import { useEffect, useState } from "react";

export default function App() {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    const taskActions = {
        removeTask,
        makeDoneTask,
        toggleEditTask,
        updateTaskText,
    };

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function taskHandle(task) {
        setTasks((tasks) => [
            ...tasks,
            { text: task, id: Date.now(), isDone: false, isEdit: false },
        ]);
    }

    function removeTask(taskId) {
        setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
    }

    function toggleEditTask(taskId) {
        setTasks((tasks) =>
            tasks.map((task) =>
                taskId === task.id ? { ...task, isEdit: !task.isEdit } : task
            )
        );
    }

    function updateTaskText(taskId, newText) {
        setTasks((tasks) =>
            tasks.map((task) =>
                taskId === task.id ? { ...task, text: newText } : task
            )
        );
    }

    function makeDoneTask(taskId) {
        setTasks((tasks) =>
            tasks.map((task) => {
                if (taskId === task.id) {
                    return task.isEdit
                        ? { ...task, isEdit: false }
                        : { ...task, isDone: !task.isDone };
                } else {
                    return task;
                }
            })
        );
    }

    const todoTasks = tasks.filter((task) => !task.isDone);
    const doneTasks = tasks.filter((task) => task.isDone);

    return (
        <>
            <TaskInput newTask={taskHandle} />
            {tasks.length > 0 ? (
                <>
                    <TaskContainer
                        title="Активные"
                        tasks={todoTasks}
                        {...taskActions}
                    />
                    <TaskContainer
                        title="Выполненные"
                        tasks={doneTasks}
                        {...taskActions}
                    />
                </>
            ) : (
                <p className="outOfTasks">Ни одной задачи!</p>
            )}
        </>
    );
}
