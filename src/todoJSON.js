import Todo from './todoClass.js';

function createTodoFromJSON(jsonData) {
    let title = jsonData.title;
    let dueDate = jsonData.dueDate;
    let description = jsonData.description;
    let priority = jsonData.priority;
    let completed = (jsonData.completed === 'true');
    let todo =  new Todo(title, description, dueDate, priority);
    todo.completed = completed;
    return todo;
}

function createListFromClass(data) {
    let todoList = []

    for (let item of data) {
        todoList.push(createTodoFromJSON(item));
    }

    return todoList;
}

export {createListFromClass};