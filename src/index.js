require('./style-reset.css');
require('./style.css');

import {userTodoList} from './todoList.js';
import {createListFromClass} from './todoJSON.js';
import {populateStorage, getStorage} from './localStorage.js';
import { createDomElement, removeChildren } from './tools.js';
import Header from './header.js';
import createTodoNavBar from './todoProjects.js';

//add Header to page
document.body.appendChild(Header.createHeader());

//create main section in body to attach the main info to
let content = createDomElement("main", 'main');
document.body.appendChild(content);

//cache DOM
const main = document.querySelector('.main');

//get data to localStorage
let myTodos = createListFromClass(getStorage('todos'));

function changeTodos(item) {
    removeChildren(main);
    let newTodo = userTodoList.addTodo(item);
    main.appendChild(newTodo);
}

main.appendChild(createTodoNavBar());
main.appendChild(userTodoList.renderTodos(myTodos));

let script = document.createElement('script');
script.src = 'https://kit.fontawesome.com/affeb91e0c.js';
script.crossOrigin = 'anonymous'
document.head.appendChild(script);