import { populateStorage, getStorage } from './localStorage.js';
import { createDomElement } from './tools.js';
import { createListFromJSON, createTodoFromDOM } from './todoJSON.js';
import { getIcon } from './todoIcons.js';
import { format } from 'date-fns';

const userTodoList = (function() {
    function createTodoItem(item) {
        let icon = getIcon('circle');
        let container = createDomElement('div', 'todo rounded');
        let content = createDomElement('div', 'todoContent')
        let top = createDomElement('div', 'todoTop');
        let bottom = createDomElement('div', 'todoBottom');
        top.appendChild(createDomElement('h2', 'todoTitle', item.title));
        top.appendChild(createDomElement('p', 'todoDueDate', format(item.dueDate, 'P')));
        bottom.appendChild(createDomElement('p', 'todoDesc', item.description));
        content.appendChild(top);
        content.appendChild(bottom);
        container.appendChild(icon);
        container.appendChild(content);
        return container;
    }

    function newTodoButton() {
        let icon = getIcon('plus');
        let content = createDomElement('div', '', 'Add Task')
        let container = createDomElement('div', 'todo newTodo rounded')
        container.appendChild(icon);
        container.appendChild(content);
        return container;
    }
    
    function renderTodos(project) {
        let list = createListFromJSON(getStorage(project));
        let container = createDomElement('div', 'todoList');
        if (list) {
            for (let item of list) {
                container.appendChild(createTodoItem(item));
            }
        }
        container.appendChild(newTodoButton());
        return container;
    }
    
    function createNewTodo(itemArray, project) {
        let todoItem = createTodoFromDOM(itemArray, project);
        let selectedProject = createListFromJSON(getStorage(project));
        selectedProject.push(todoItem);
        populateStorage(project, selectedProject);
        return renderTodos(project);
    }

    return {
        createNewTodo: createNewTodo,
        renderTodos: renderTodos,
    }
})();

export {userTodoList};