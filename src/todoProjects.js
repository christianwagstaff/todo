import { addNewProject, getProjects } from "./localStorage";
import { createDomElement } from "./tools";
import {getIcon} from './todoIcons.js'

let todoProjects = (function() {
    function updateUserProjects(newProject) {
        //if the user cancels or inputs a blank name, return nothing.
        if (!/\S/.test(newProject)|| !newProject) return;
        newProject = newProject.trim()
        addNewProject(newProject);
    }

    function createTodoNavBar() {
        let container = createDomElement('nav', 'nav')
        container.appendChild(createNavHeader());
        container.appendChild(createUserProjects());
        return container
    }

    function createNavHeader() {
        let container = createDomElement('div', 'navHeader projectList')
        let homeBtn = createDomElement('button', 'project homePageBtn active navProject', 'Home');
        let thisWeekBtn = createDomElement('button', 'project thisWeekBtn navProject', 'This Week');
        let pastDueBtn = createDomElement('button', 'project pastDueBtn navProject', 'Past Due');
        let completedBtn = createDomElement('button', 'project completedBtn navProject', 'Completed');
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

    function createUserProjects() {
        let container = createDomElement('div', 'userProjects projectList');
        container.appendChild(createUserProjectHeader());
        container.appendChild(createUserProjectList());
        container.appendChild(createNewProjectButton());
        return container;
    }

    function createUserProjectList() {
        let content = createDomElement('div', 'userProjectList')
        let list = getProjects()
        if (list) {
            for (let item of list) {
                let project = createDomElement('button', `project userProject`, item);
                let deleteDiv = createDomElement('div', 'deleteProject');
                let deleteIcon = getIcon('trash')
                deleteDiv.appendChild(deleteIcon);
                project.appendChild(deleteDiv)
                content.appendChild(project)
            }
        }
        return content        
    }

    return {
        createTodoNavBar: createTodoNavBar,
        updateUserProjects: updateUserProjects,
        createUserProjectList: createUserProjectList,
    }
})();

export default todoProjects;