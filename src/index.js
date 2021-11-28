import data from './testTodo.json';
import {userTodoList} from './todoList.js';
import {createListFromClass} from './todoJSON.js';
import {populateStorage, getStorage} from './localStorage.js';
import { createDomElement } from './template';

//send data to localStorage
populateStorage(data.todos);
let myTodos = createListFromClass(getStorage());


let content = createDomElement("div", 'main');
content.appendChild(userTodoList.renderTodos(myTodos));

document.body.appendChild(content);

//cache DOM
const main = document.querySelector('.main');

let userTodo = prompt('What do you want?');
changeTodos(userTodo)

function changeTodos(item) {
    removeChildren(main);
    let newTodo = userTodoList.addTodo(item);
    main.appendChild(newTodo);
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}