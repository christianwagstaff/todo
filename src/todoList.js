import { populateStorage, getStorage } from './localStorage.js';
import { createDomElement } from './tools.js';
import Todo from './todoClass.js';
import { createListFromJSON, createTodoFromDOM } from './todoJSON.js';
import { getIcon } from './todoIcons.js';

const userTodoList = (function() {
    let myTodos = createListFromJSON(getStorage('default'));

    function createTodoItem(item) {
        let icon = getIcon('circle');
        let container = createDomElement('div', 'todo rounded');
        let content = createDomElement('div', 'todoContent')
        let top = createDomElement('div', 'todoTop');
        let bottom = createDomElement('div', 'todoBottom');
        top.appendChild(createDomElement('h2', 'todoTitle', item.title));
        top.appendChild(createDomElement('p', 'todoDueDate', item.dueDate));
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
    
    function renderTodos(list) {
        list = createListFromJSON(getStorage(list));
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
        populateStorage(selectedProject, project);
        return renderTodos(myTodos);
    }

    return {
        addTodo: createNewTodo,
        renderTodos: renderTodos,
    }
})();

export {userTodoList};