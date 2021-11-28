import Todo from './todoClass.js';
import testData from './testTodo.json';
import { createDomElement } from './template.js';

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

function createContentFromClass(item) {
    let container = createDomElement('div', 'todo');
    container.appendChild(createDomElement('h2', 'todoTitle', item.title));
    container.appendChild(createDomElement('p', 'todoDesc', item.description));
    container.appendChild(createDomElement('p', 'todoDueDate', item.dueDate));
    return container;
}

function createTodoElements(list) {
    let container = createDomElement('div', 'todoList');
    for (let item of list) {
        container.appendChild(createContentFromClass(item));
    }
    return container;
}
let todoList = createTodoElements(createListFromClass(testData.todos));

export default todoList;