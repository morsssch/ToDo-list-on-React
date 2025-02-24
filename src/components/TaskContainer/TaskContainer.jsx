import "./TaskContainer.css";
import Task from "../Task/Task.jsx";

export default function TaskContainer({ title, tasks, ...taskActions }) {
    const tasksCount =
        title === "Выполненные"
            ? tasks.filter((task) => task.isDone).length
            : tasks.length - tasks.filter((task) => task.isDone).length;

    return (
        <div className="TaskContainer">
            {tasksCount > 0 && (
                <>
                    <p className="title">
                        {title} - {tasksCount}
                    </p>
                    <div className={`${title} scroll`}>
                        {tasks.map((task) => {
                            return (
                                <Task
                                    task={task}
                                    key={task.id}
                                    {...taskActions}
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
