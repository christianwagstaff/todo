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
    let container = createDomElement('div', 'navHeader')
    let homeBtn = createDomElement('button', 'homePageBtn', 'Home');
    let thisWeekBtn = createDomElement('button', 'thisWeekBtn', 'This Week');
    let pastDueBtn = createDomElement('button', 'pastDueBtn', 'Past Due');
    let completedBtn = createDomElement('button', 'completedBtn', 'Completed');
    container.appendChild(homeBtn);
    container.appendChild(thisWeekBtn);
    container.appendChild(pastDueBtn);
    container.appendChild(completedBtn);
    return container;
}

function createUserProjects(list) {
    let container = createDomElement('div', 'userProjects', 'Projects');
    for (let item of list) {
        container.appendChild(createDomElement('button', `${item}Btn`, item));
    }
    container.appendChild(createDomElement('button', 'newProjectBtn', 'Add Project'))
    return container;
}

export default createTodoNavBar;