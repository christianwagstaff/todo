import Todo from './todoClass.js';

function createTodoFromJSON(jsonData) {
    let todo = new Todo(
        jsonData.title, 
        jsonData.description, 
        jsonData.dueDate, 
        jsonData.priority);
    todo.completed = (jsonData.completed === 'true');
    return todo;
}

function createTodoFromDOM(array, project) {
    let todo = new Todo(
        array[0],
        array[1],
        array[2],
        array[3]);
    todo.project = project;
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