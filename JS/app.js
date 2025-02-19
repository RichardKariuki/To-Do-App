import { Task } from "./tasks.js";
import { Storage } from "./storage.js";
import { UI } from "./ui.js";

document.addEventListener("DOMContentLoaded", UI.displayTasks);

document.getElementById("add-task-btn").addEventListener("click", () => {
    const title = document.getElementById("task-title").value;
    const dueDate = document.getElementById("task-date").value;

    if (title === "" || dueDate === "") return alert("Please enter task details!");

    const task = new Task(title, dueDate);
    const tasks = Storage.getTasks();
    tasks.push(task);
    Storage.saveTasks(tasks);

    UI.displayTasks();
});

document.getElementById("task-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        let tasks = Storage.getTasks();
        tasks = tasks.filter(task => task.id != e.target.dataset.id);
        Storage.saveTasks(tasks);
        UI.displayTasks();
    }
});
// Selecting elements
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");

// Tasks Array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render tasks
const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}">
            <span class="${task.completed ? "completed" : ""}" data-index="${index}">${task.text}</span>
            <button class="edit-btn" data-index="${index}">✏️</button>
            <button class="delete-btn" data-index="${index}">🗑</button>
        `;
        taskList.appendChild(li);
    });
};

// Function to add a task
const addTask = () => {
    const taskText = prompt("Enter task:");
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        saveAndRender();
    }
};

// Function to toggle task completion
const toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
};

// Function to edit a task
const editTask = (index) => {
    const newTaskText = prompt("Edit task:", tasks[index].text);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        tasks[index].text = newTaskText;
        saveAndRender();
    }
};

// Function to delete a task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    saveAndRender();
};

// Function to save tasks to localStorage and render
const saveAndRender = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
};

// Event Listeners
addTaskBtn.addEventListener("click", addTask);

taskList.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.tagName === "INPUT") {
        toggleTask(index);
    } else if (e.target.classList.contains("edit-btn")) {
        editTask(index);
    } else if (e.target.classList.contains("delete-btn")) {
        deleteTask(index);
    }
});

// Initial render
renderTasks();