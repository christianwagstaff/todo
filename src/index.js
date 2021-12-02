require('./style-reset.css');
require('./style.css');

import {userTodoList} from './todoList.js';
import { createDomElement, removeChildren } from './tools.js';
import Header from './header.js';
import todoProjects from './todoProjects.js';
import eventDelegation from './eventDelegation.js';
import {newTodoPopup} from './todoPopups.js';
import { changeProjectName, checkStorage, deleteProjectFromStorage, resetLocalStorage } from './localStorage.js';

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
const userPreferences = document.querySelector('.userPreferences');

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
const homePageBtn = navBar.querySelector('.homePageBtn');
const todayBtn = navBar.querySelector('.todayBtn');
const thisWeekBtn = navBar.querySelector('.thisWeekBtn');
const pastDueBtn = navBar.querySelector('.pastDueBtn');
const completedBtn = navBar.querySelector('.completedBtn');

//render initial todolist
todoList.appendChild(userTodoList.renderTodosByDate('all'));

//add Event Listeners
addProject.forEach(x => x.addEventListener('click', newUserProject));
navProject.forEach(x => x.addEventListener('click', changeNav));
userProjects.addEventListener('click', changeProject);
userProjects.addEventListener('click', deleteProject);
userProjects.addEventListener('dblclick', renameProject);
todoList.addEventListener('click', newTodo);
todoList.addEventListener('click', deleteTodo);
todoList.addEventListener('click', completeTodo);
todayBtn.addEventListener('click', renderNav);
thisWeekBtn.addEventListener('click', renderNav);
pastDueBtn.addEventListener('click', renderNav);
completedBtn.addEventListener('click', renderNav);
homePageBtn.addEventListener('click', renderNav);
userPreferences.addEventListener('click', showUserPreferences);

function newUserProject() {
    let newProject = prompt('New Project');
    if (newProject === '' || !newProject) {
        return;
    }
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
}

function changeActive(e) {
    let userProject = userProjects.querySelectorAll('.userProject');
    userProject.forEach(x => x.classList.remove('active'));
    navProject.forEach(x => x.classList.remove('active'));
    e.target.classList.add('active')
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
        let title = prompt('Todo Title');
        if (title === '' || !title) {
            return;
        }
        let desc = prompt('Todo Description');
        if (desc === '' || !desc) {
            return;
        }
        let date = '2021-12-04';
        let priority = 1;
        let project;
        if (userProjects.querySelector('.active')) {
            project = userProjects.querySelector('.active').textContent
        } else {
            project = 'default'
        }
        let array = [title, desc, date, priority]
        userTodoList.createNewTodo(array, project);
        let currentSelection = navBar.querySelector('.active').textContent
        console.log(currentSelection);
        if (currentSelection === 'Home') {
            updateTodoList('all');
        } else {
            updateTodoList(currentSelection);
        }
    }
}

function renderByActive(active) {
    todoList.removeChild(todoList.firstChild)
    todoList.appendChild(userTodoList.renderTodosByDate(active));
}

function renderNav(e) {
    let index = e.target.dataset.index;
    renderByActive(index)
}

function deleteProject(e) {
    if (eventDelegation(e, 'DIV', 'deleteProject')) {
        let parent = e.target.parentNode
        let projectName = parent.textContent;
        if (confirm(`Are you sure you want to delete ${projectName} and all it's uncompleted tasks?`)) {
            deleteProjectFromStorage(projectName);
            updateTodoList('all');
            updateProjectList();
            changeActive(homePageBtn)
        }
    }
}

function renameProject(e) {
    if (eventDelegation(e, 'BUTTON', 'userProject')) {
        let parent = e.target
        let projectName = parent.textContent;
        let newName = prompt(`What do you want to rename ${projectName} to?`);
        if (newName === '' || !newName) return;
        if (checkStorage(newName)) {
            alert(`Cannot Complete Request: ${newName} already exists!`)
            return;
        }
        changeProjectName(newName, projectName)
        updateTodoList(newName);
        updateProjectList();
        changeActive(e)
    }
}

function deleteTodo(e) {
    if (eventDelegation(e, 'I', 'deleteTodo')) {
        let parent = e.target.closest('.todo');
        let todo = parent.querySelector('.todoTitle').textContent;
        if (confirm(`Are you sure you want to delete ${todo}?`)) {
            let index = parent.dataset.id;
            let project = parent.dataset.project;
            userTodoList.deleteTodo(project,index);
            let active = navBar.querySelector('.active');
            if (active.classList.contains('userProject')) {
                updateTodoList(active.dataset.index)
            } else if (active.classList.contains('navProject')) {
                renderByActive(active.dataset.index);
            }
        }
    }
}

function completeTodo(e) {
    if (eventDelegation(e, 'I', 'completeTodo')) {
        let parent = e.target.closest('.todo')
        let project = parent.dataset.project
        let index = parent.dataset.id
        console.log(`Complete ${project}: ${index}`)
        userTodoList.completeTodo(project, index);
        let active = navBar.querySelector('.active');
        if (active.classList.contains('userProject')) {
            updateTodoList(active.dataset.index)
        } else if (active.classList.contains('navProject')) {
            renderByActive(active.dataset.index);
        }
    }
}

function showUserPreferences() {
    if (confirm('Do you want to reset your Todo App?')) {
        if (confirm("There is no retrieving this data.")) {
            resetLocalStorage();
            changeActive(homePageBtn);
        }
    }
}