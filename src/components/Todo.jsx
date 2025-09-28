import { useState } from "react";

export default function Todo(props) {
    // Variable to edit task to new name
    const [isEditing, setEditing] = useState(false);
    // Variable to checking on new name for task and save it for udpate
    const [newName, setNewName] = useState("");

    // Function to set new name
    function handleChange(event) {
      // event.target.value - checks for input from keyboard (user typing)
      setNewName(event.target.value); 
    }

    // Function runs when the form is submitted
    function handleSubmit(event) {
      event.preventDefault(); // Prevent page reload
      props.editTask(props.id,newName); // Callback prop needs the ID of the task we're editing as well as its new name
      setNewName(""); // Clear the input field
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

    return <li className="todo">{ isEditing ? editingTemplate : viewTemplate }</li>;
} 