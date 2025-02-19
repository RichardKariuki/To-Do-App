export class Task {
    constructor(title, dueDate, completed = false) {
        this.id = Date.now();
        this.title = title;
        this.dueDate = dueDate;
        this.completed = completed;
    }
}
