import {useRef, useEffect} from "react";

// Custom hook to keep track of previous value
export function usePrevious(value) {
    // creates a mutable ref object that persists across renders
    const ref = useRef(); 
    useEffect(() => {
        // updates the ref with the latest value after every render
        ref.current = value;
    });
    // returns the previous value from the last render
    return ref.current;
}