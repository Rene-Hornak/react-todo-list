# 📝 React To-Do List App

A modular and responsive **To-Do List** application built with **React.js**.  
The app demonstrates structured component-based design and state management using React hooks.  
Users can efficiently **add**, **edit**, **delete**, and **filter** tasks (All, Active, Completed) through an intuitive interface.

This project emphasizes clean React architecture, reusability, and maintainability, making it a solid example of a scalable front-end application.

---

## 🚀 Features

✅ Add new tasks  
✅ Edit existing tasks  
✅ Delete tasks  
✅ Mark tasks as completed  
✅ Filter tasks by **All**, **Active**, or **Completed**  
✅ Dynamic task count display  
✅ Fully responsive layout  

---

## 🧩 Component Overview

### **App.jsx**
- The central component managing the app’s state.
- Stores the list of tasks and handles:
  - Adding a new task  
  - Editing a task  
  - Deleting a task  
  - Toggling task completion  
  - Filtering tasks  

### **Form.jsx**
- Handles user input for creating new tasks.
- Validates that input is not empty before adding a task.

### **Todo.jsx**
- Represents a single task item.
- Supports:
  - Marking as complete/incomplete
  - Editing task names
  - Deleting tasks

### **FilterButton.jsx**
- Renders filter buttons to toggle between **All**, **Active**, and **Completed** tasks.
