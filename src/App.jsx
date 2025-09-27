import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

import { useState } from "react";
import { nanoid } from "nanoid"; // generates unique IDs for each new task

export default function App(props) {
    // State variable for all tasks (initially from props)
    const [tasks, setTasks] = useState(props.tasks);

    // Function to add a new task to the list
    function addTask(name) {
        const newTask = { id: `todo-${nanoid()}`, name, completed: false };
        // Spread existing tasks and add the new one
        setTasks([...tasks, newTask]);
    }

    // Function to toggle a task’s completed status
    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map((task) => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                // use object spread to make a new object
                // whose `completed` prop has been inverted
                return { ...task, completed: !task.completed };
            }
            // Otherwise return the task unchanged
            return task;
        });
        setTasks(updatedTasks); // Update the state with the modified list
    }

    // Create an array of <Todo /> components from the task list
    const taskList = tasks?.map((task) => (
        <Todo 
            id={task.id} 
            name={task.name} 
            completed={task.completed} 
            key={task.id}
            toggleTaskCompleted={toggleTaskCompleted}
        />
    ));

    // Adjust number of tasks
    const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    return (
        <div className="todoapp stack-large">
            <h1>ToDo list</h1>
            <Form formSubmit={addTask} />

            <div className="filters btn-group stack-exception">
                <FilterButton />
                <FilterButton />
                <FilterButton />
            </div>

            <h2 id="list-heading">{headingText}</h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading">
                {taskList}
            </ul>
        </div>
    );
}