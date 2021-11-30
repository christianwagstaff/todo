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

function createListFromClass(data) {
    let todoList = [];
    if (data) {
        for (let item of data) {
            todoList.push(createTodoFromJSON(item));
        }
    }
    return todoList;
}

export {createListFromClass};