import Todo from './todoClass.js';

function createTodoFromJSON(jsonData) {
    let todo = new Todo(
        jsonData.title, 
        jsonData.description, 
        jsonData.dueDate, 
        jsonData.priority);
    todo.project = jsonData.project;
    todo.completed = checkCompleted(jsonData.completed);
    todo.index = jsonData.index;
    return todo;
}

function checkCompleted(data) {
    if (typeof data === 'string' || data instanceof String) {
        return data === 'true';
    } return data
}

function createTodoFromDOM(array, project) {
    let todo = new Todo(
        array[0], //title
        array[1], //descrition
        array[2], //dueDate
        array[3]); //priority
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