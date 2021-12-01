require('./style-reset.css');
require('./style.css');

import {userTodoList} from './todoList.js';
import { createDomElement, removeChildren } from './tools.js';
import Header from './header.js';
import todoProjects from './todoProjects.js';
import eventDelegation from './eventDelegation.js';
import {newTodoPopup} from './todoPopups.js';
import { parseISO } from 'date-fns';

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

//initialize data from localStorage
let myTodos = 'all';

//create Todo App
main.appendChild(todoProjects.createTodoNavBar());
main.appendChild(createDomElement('div', 'todos'));
// document.body.appendChild(newTodoPopup());

//cache Todo App
const navBar = document.querySelector('nav');
const navProject = navBar.querySelectorAll('.navProject')
const addProject = navBar.querySelectorAll('.newUserProject');
const userProjects = navBar.querySelector('.userProjects');
const todoList = document.querySelector('.todos');

//render initial todolist
todoList.appendChild(userTodoList.renderTodos(myTodos));

//add Event Listeners
addProject.forEach(x => x.addEventListener('click', newUserProject));
navProject.forEach(x => x.addEventListener('click', changeNav));
userProjects.addEventListener('click', changeProject);
todoList.addEventListener('click', newTodo);

function newUserProject() {
    let newProject = prompt('New Project');
    todoProjects.updateUserProjects(newProject);
    updateProjectList();
}

function changeProject(e) {
    if (eventDelegation(e, 'BUTTON', 'userProject')) {
        let project = e.target;
        let projectTitle = project.textContent;
        changeActive(e);
        updateTodoList(projectTitle);
    }
}

function changeNav(e) {
    changeActive(e);
    if (e.target.textContent === 'Home')
    updateTodoList('all');
}

function changeActive(e) {
    let userProject = userProjects.querySelectorAll('.userProject');
    userProject.forEach(x => x.classList.remove('active'));
    navProject.forEach(x => x.classList.remove('active'));
    e.target.classList.add('active');
}

function updateTodoList(project) {
    todoList.removeChild(todoList.firstChild)
    todoList.appendChild(userTodoList.renderTodos(project))
}

function updateProjectList() {
    let userProjectList = userProjects.querySelector('.userProjectList')
    userProjects.replaceChild(todoProjects.createUserProjectList(), userProjectList)
}

function newTodo(e) {
    if (eventDelegation(e, 'DIV', 'newTodo')) {
        let title = prompt('title');
        let desc = prompt('desc');
        let date = parseISO(new Date());
        console.log(date);
        let priority = 1;
        let project;
        if (userProjects.querySelector('.active')) {
            project = userProjects.querySelector('.active').textContent
        } else {
            project = 'default'
        }
        let array = [title, desc, date, priority]
        // console.log(userTodoList.createNewTodo(array, project));
    }
}
