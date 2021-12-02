import Todo from './todoClass.js';

function createTodoFromJSON(jsonData) {
    let todo = new Todo(
        jsonData.title, 
        jsonData.description, 
        jsonData.dueDate, 
        jsonData.priority);
    todo.project = jsonData.project;
    todo.completed = jsonData.completed;
    todo.index = jsonData.index;
    return todo;
}

function createTodoFromDOM(array, project) {
    let todo = new Todo(
        array[0],
        array[1],
        array[2],
        array[3]);
    todo.project = project;
    todo.completed = false;
    return todo;
}

function createListFromJSON(data) {
    let todoList = [];
    if (data) {
        for (let item of data) {
            todoList.push(createTodoFromJSON(item));
        }
    }
    return todoList;
}

export {createListFromJSON, createTodoFromDOM};