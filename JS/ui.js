import { Storage } from "./storage.js";

/*export class UI {
    static displayTasks() {
        const tasks = Storage.getTasks();
        const taskList = document.getElementById("task-list");
        taskList.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task.title} (Due: ${task.dueDate})</span>
                <input type="checkbox" ${task.completed ? "checked" : ""} data-id="${task.id}">
                <button class="delete" data-id="${task.id}">X</button>
            `;
            taskList.appendChild(li);
        });
    }
}*/
export class UI {
    static displayTasks() {
        const taskList = document.getElementById("task-list");
        if (!taskList) {
            console.error("Element with ID 'task-list' not found!");
            return;
        }
        
        const tasks = Storage.getTasks();
        taskList.innerHTML = ""; // Clear list before adding new tasks

        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = `${task.title} (Due: ${task.dueDate})`;
            taskList.appendChild(li);
        });
    }
}

