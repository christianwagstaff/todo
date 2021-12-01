import { populateStorage, getStorage } from './localStorage.js';
import { createDomElement } from './tools.js';
import { createListFromJSON, createTodoFromDOM } from './todoJSON.js';
import { getIcon } from './todoIcons.js';
import { format, formatDistanceToNow, formatDistanceToNowStrict, isAfter, isSameWeek } from 'date-fns';

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
        let deleteIcon = getIcon('trash')
        deleteIcon.classList.add('deleteTodo');
        container.appendChild(deleteIcon)
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
    }

    function renderTodosByDate(timeFrame) {
        let fullList = createListFromJSON(getStorage('all'))
        let partialList = createDomElement('div', 'todoList');
        if (fullList) {
            for (let item of fullList) {
                if (timeFrame === 'thisWeek') {
                    if (isSameWeek(new Date(), item.dueDate)) {
                        partialList.appendChild(createTodoItem(item));
                    }
                } else if (timeFrame === 'pastDue') {
                    if (isAfter(new Date(), item.dueDate)) {
                        partialList.appendChild(createTodoItem(item));
                    }
                } else if (timeFrame === 'completed') {
                    if (item.completed) {
                        partialList.appendChild(createTodoItem(item));
                    }
                    if (!partialList.firstChild) {
                        partialList.appendChild(createDomElement('div', 'todo rounded', 'No Tasks Completed!'));
                    }
                    return partialList;
                }
            }
        }
        partialList.appendChild(newTodoButton());
        return partialList;
    }

    return {
        createNewTodo: createNewTodo,
        renderTodos: renderTodos,
        renderTodosByDate: renderTodosByDate,
    }
})();

export {userTodoList};