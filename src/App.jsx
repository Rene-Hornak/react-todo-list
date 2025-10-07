import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

import { useState, useRef, useEffect, use } from "react";
import { nanoid } from "nanoid"; // generates unique IDs for each new task
import { usePrevious } from "./utils/hooks";

// Object that stores filter names and their corresponding functions 
const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed
}

// Array of filter button names derived from FILTER_MAP keys
// The resulting array will be ["All", "Active", "Completed"]
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props) {
    // State variable for all tasks, initialized with props.tasks
    const [tasks, setTasks] = useState(props.tasks);

    // State variable for filter functionality (All, Active, Incomplete) 
    const [filter, setFilter] = useState("All");

    // Generate filter buttons based on FILTER_NAMES
    const filterList = FILTER_NAMES.map((name) => (
        <FilterButton 
            key={name} 
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    // Function to add a new task object to the list 
    function addTask(name) {
        // Create task with unique ID
        const newTask = { id: `todo-${nanoid()}`, name, completed: false };
        // Add new task to list
        setTasks([...tasks, newTask]); 
    }

    // Function to toggle task completition status
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

    // Function to edit task based on id
    // newName property is for new name of task
    function editTask(id, newName) {
        const editedTaskList = tasks.map((task) => {
            // If this task has the same ID as the edited task
            if (id === task.id) {
                // Copy the task and update its name
                return { ...task, name: newName };
            }
            // Return the original task if it's not the edited task
            return task;
        });
        setTasks(editedTaskList); // Update the state with the modified list
    }

    // Function to delete task based on id 
    // delete task from the app's state as well in the app UI
    function deleteTask(id) {
        const remainingTasks = tasks.filter((task) => id !== task.id);
        setTasks(remainingTasks);
    }

    // Generate list of task components filtered by current filter
    const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
        <Todo 
            id={task.id} 
            name={task.name} 
            completed={task.completed} 
            key={task.id}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            editTask={editTask}
        />
    ));

    // Determine singular/plural label for tasks count
    const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    // Reference to the list heading element for focus management
    const listHeadingRef = useRef(null);

    // Track previous length of tasks array
    const prevTaskLength = usePrevious(tasks.length);

    // Focus he heading if tasks are deleted
    useEffect(() => {
        if (tasks.length < prevTaskLength) {
            // move focus to heading after deletion
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);

    return (
        <div className="todoapp stack-large">
            <h1>ToDo list</h1>
            <Form formSubmit={addTask} />

            <div className="filters btn-group stack-exception">
                {filterList}
            </div>

            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
                {headingText}
            </h2>
            <ul
                role="list"
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>
        </div>
    );
}