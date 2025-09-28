import { useState } from "react";

export default function Form(props) {
    // State variable to store the text entered by the user
    const [name, setName] = useState("");

    // Function runs when the form is submitted
    function handleSubmit(event) {
        event.preventDefault(); // Prevent page reload

        // Only add the task if input is not empty
        if (name !== "") {
            // Call the function from App (passed as a prop)
            props.formSubmit(name);
            // Clear the input field
            setName("");
        }
    }

    // Function runs every time the user types in the input
    function handleChange(event) {
        // event.target.value - checks for input from keyboard (user typing)
        setName(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit} >
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>

            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}