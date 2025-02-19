import { Storage } from "./storage.js";

export class UI {
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
}
