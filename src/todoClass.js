import {parseISO} from 'date-fns';

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title,
        this.description = description, 
        this.dueDate = parseISO(dueDate) ? parseISO(dueDate) : dueDate,
        this.priority = priority
        this.project = 'default';
        this.completed = false;
    }

    changeTitle(newTitle) {
        this.title = newTitle;
    }

    changeDesciption(newDescription) {
        this.description = newDescription;
    }

    changeDueDate(newDate) {
        this.dueDate = newDate;
    }

    changePriority(newPriority) {
        this.priority = newPriority;
    }

    changeProject(newProject) {
        this.project = newProject;
    }

    completedTodo(date) {
        this.completed = true;
        this.completedDate = date;
    }
}

export default Todo;