import { getStorage } from "./localStorage";
import { createDomElement } from "./tools";

function createTodoNavBar() {
    let myProjects = getStorage('projects');
    let container = createDomElement('nav', 'nav')
    container.appendChild(createNavHeader());
    container.appendChild(createUserProjects(myProjects));
    return container
}

function createNavHeader() {
    let container = createDomElement('div', 'navHeader projectList')
    let homeBtn = createDomElement('button', 'project homePageBtn', 'Home');
    let thisWeekBtn = createDomElement('button', 'project thisWeekBtn', 'This Week');
    let pastDueBtn = createDomElement('button', 'project pastDueBtn', 'Past Due');
    let completedBtn = createDomElement('button', 'project completedBtn', 'Completed');
    container.appendChild(homeBtn);
    container.appendChild(thisWeekBtn);
    container.appendChild(pastDueBtn);
    container.appendChild(completedBtn);
    return container;
}

function createUserProjectHeader() {
    let container = createDomElement('div', 'userProjectHeader')
    let title = document.createElement('h2')
    title.textContent = 'Projects';
    let addBtn = createDomElement('button', 'newUserProject', '+');
    container.appendChild(title);
    container.appendChild(addBtn);
    return container;
}

function createNewProjectButton() {
    let container = createDomElement('button', 'newUserProject project')
    container.textContent = '+ Add Project'
    return container;
}

function createUserProjects(list) {
    let container = createDomElement('div', 'userProjectList projectList');
    container.appendChild(createUserProjectHeader());
    for (let item of list) {
        container.appendChild(createDomElement('button', `project userProject`, item));
    }
    container.appendChild(createNewProjectButton());
    return container;
}

export default createTodoNavBar;