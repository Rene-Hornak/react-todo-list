import { useEffect, useRef, useState } from "react";
import { usePrevious } from "../utils/hooks";

export default function Todo(props) {
    // State to determine if the task is in editing mode
    const [isEditing, setEditing] = useState(false);
    // State to hold the new name when editing a task
    const [newName, setNewName] = useState("");

    // Ref to the inpu field used when editing, so we can programmatically focus on it
    const editFieldRef = useRef(null);
    // Ref to the "Edit" button in view mode, so we can focus back to it after editing
    const editButtonRef = useRef(null);
    // Store the previous value of isEditing to detect changes
    const wasEditing = usePrevious(isEditing);

    // Handle input change for new task name
    function handleChange(event) {
      // event.target.value - checks for input from keyboard (user typing)
      setNewName(event.target.value); 
    }

    // Handle form submission when saving edits
    function handleSubmit(event) {
      event.preventDefault(); // Prevent page reload
      props.editTask(props.id, newName); // Callback prop needs the ID of the task we're editing as well as its new name
      setNewName(""); // Clear the input field afterwards
      setEditing(false); // Go back to viewTemplate - default
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit} >
          <div className="form-group">
            <label className="todo-label" htmlFor={props.id}>
              New name for {props.name}
            </label>
            <input 
                id={props.id} 
                className="todo-text" 
                type="text"
                value={newName}
                onChange={handleChange} 
                ref={editFieldRef} // Reference for programmatic focus
            />
          </div>
          <div className="btn-group">
            <button type="button" 
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}
            >
              Cancel
              <span className="visually-hidden">renaming {props.name}</span>
            </button>
            <button type="submit" className="btn btn__primary todo-edit">
              Save
              <span className="visually-hidden">new name for {props.name}</span>
            </button>
          </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small">
          <div className="c-cb">
            <input
              id={props.id}
              type="checkbox"
              defaultChecked={props.completed}
              onChange={() => props.toggleTaskCompleted(props.id)}
            />
            <label className="todo-label" htmlFor={props.id}>
              {props.name}
            </label>
          </div>
          <div className="btn-group">
            <button type="button" 
                    className="btn"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef} // Focus will be set here when switching back from edit mode
            >
              Edit <span className="visually-hidden">{props.name}</span>
            </button>
            <button
              type="button"
              className="btn btn__danger"
              onClick={() => props.deleteTask(props.id)}>
              Delete <span className="visually-hidden">{props.name}</span>
            </button>
          </div>
        </div>
    );

    // Code runs after the component renders
    // Effect that manages focus based on editing state transitions
    // Run this effect whenever isEditing state changes
    useEffect(() => {
      if (!wasEditing && isEditing) {
        // When entering editing mode, focus on input field
        editFieldRef.current.focus();
      } else if (wasEditing && !isEditing) {
        // When leaving editing mode, focus back on the edit button
        editButtonRef.current.focus();
      }
    }, [wasEditing, isEditing]); 

    return <li className="todo">{ isEditing ? editingTemplate : viewTemplate }</li>;
} 