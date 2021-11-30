require('./style-reset.css');
require('./style.css');

import {userTodoList} from './todoList.js';
import { createDomElement, removeChildren } from './tools.js';
import Header from './header.js';
import todoProjects from './todoProjects.js';

// Add FontAwesome to head
let script = document.createElement('script');
script.src = 'https://kit.fontawesome.com/affeb91e0c.js';
script.crossOrigin = 'anonymous'
document.head.appendChild(script);

//add Header to page
document.body.appendChild(Header.createHeader());

//create main section in body to attach the main info to
let content = createDomElement("main", 'main');
document.body.appendChild(content);

//cache main
const main = document.querySelector('.main');

//get data to localStorage
let myTodos = 'Project 1';

//create Todo App
main.appendChild(todoProjects.createTodoNavBar());
main.appendChild(createDomElement('div', 'todos'));

//cache Todo App
const navBar = document.querySelector('nav');
const addProject = navBar.querySelectorAll('.newUserProject');
const userProjects = navBar.querySelectorAll('.userProject');
const todoList = document.querySelector('.todos');

//add Event Listeners
addProject.forEach(x => x.addEventListener('click', newUserProject));
userProjects.forEach(x => x.addEventListener('click', changeProject));

//render initial todolist
todoList.appendChild(userTodoList.renderTodos(myTodos));


function changeTodos(item) {
    removeChildren(main);
    let newTodo = userTodoList.addTodo(item);
    main.appendChild(newTodo);
}

function newUserProject() {
    let newProject = prompt('New Project');
    todoProjects.updateUserProjects(newProject);
}

function changeProject(e) {
    let project = e.target.textContent;
    todoList.removeChild(todoList.firstChild)
    todoList.appendChild(userTodoList.renderTodos(project))
}