import { populateStorage, getStorage } from './localStorage.js';
import { createDomElement } from './tools.js';
import { createListFromJSON, createTodoFromDOM } from './todoJSON.js';
import { getIcon } from './todoIcons.js';
import { format, isAfter, isSameWeek, isToday } from 'date-fns';

const userTodoList = (function() {
    function createTodoItem(item) {
        let container = createDomElement('div', 'todo');
        let content = createDomElement('div', 'todoContent')
        let top = createDomElement('div', 'todoTop');
        let bottom = createDomElement('div', 'todoBottom');
        let completeIcon;
        if (item.completed) {
            completeIcon = getIcon('checked')
            container.classList.add('completed')
        } else {
            completeIcon = getIcon('circle')
        }
        completeIcon.classList.add('completeTodo');
        let deleteIcon = getIcon('trash')
        deleteIcon.classList.add('deleteTodo');
        let editIcon = getIcon('edit');
        editIcon.classList.add('editTodo');
        top.appendChild(createDomElement('h2', 'todoTitle', item.title));
        top.appendChild(createDomElement('p', 'todoDueDate', item.dueDate));
        bottom.appendChild(createDomElement('p', 'todoDesc', item.description));
        content.appendChild(top);
        content.appendChild(bottom);
        container.appendChild(completeIcon);
        container.appendChild(content);
        container.appendChild(editIcon);
        container.appendChild(deleteIcon)
        //add Classes to container
        container.classList.add(`priority-${item.priority}`)
        //add data-attributes to container
        container.dataset.project = item.project;
        container.dataset.completed = item.completed;
        return container;
    }

    function newTodoButton() {
        let icon = getIcon('plus');
        let content = createDomElement('div', '', 'Add Task')
        let container = createDomElement('div', 'todo newTodo')
        container.appendChild(icon);
        container.appendChild(content);
        return container;
    }

    function renderTodos(project) {
        let list = createListFromJSON(getStorage(project));
        for (let item of list) {
            item.dueDate = format(item.dueDate, 'P');
        }
        let title = createTodoTitle(project);
        let container = createDomElement('div', 'todoList');
        container.appendChild(title)
        createTodoItemWithIndex(container,list)
        container.appendChild(newTodoButton());
        return container;
    }

    function createTodoItemWithIndex(container, list) {
        if (list) {
            for (let item of list) {
                let itemDiv = createTodoItem(item)
                itemDiv.dataset.id = item.index
                container.appendChild(itemDiv);
            }
        }
    }
    
    function createTodoTitle(projectName) {
        return createDomElement('h2', 'todoListTitle', projectName)
    }
    
    function createNewTodo(itemArray, project) {
        let todoItem = createTodoFromDOM(itemArray, project);
        let selectedProject = createListFromJSON(getStorage(project));
        selectedProject.push(todoItem);
        populateStorage(project, selectedProject);
    }

    function renderTodosByDate(timeFrame) {
        let fullList = createListFromJSON(getStorage('all'))
        let partialList = [];
        let container = createDomElement('div', 'todoList');
        let title;
        if (fullList) {
            for (let item of fullList) {
                if (timeFrame === 'thisWeek') {
                    title = 'This Week';
                    if (isSameWeek(new Date(), item.dueDate)) {
                        partialList.push(item);
                    }
                } else if (timeFrame === 'today') {
                    title = 'Today';
                    if (isToday(item.dueDate)) {
                        partialList.push(item);
                    }
                } else if (timeFrame === 'pastDue') {
                    title = 'Past Due';
                    if (isAfter(new Date(), item.dueDate)) {
                        partialList.push(item);
                    }
                } else if (timeFrame === 'completed') {
                    title = 'Completed';
                    if (item.completed) {
                        partialList.push(item);
                    }
                } else if (timeFrame === 'all') {
                    title = 'Home'
                    partialList.push(item);
                }
            }
            if (partialList.length === 0) {
                container.appendChild(createTodoTitle('Completed'))
                container.appendChild(createDomElement('div', 'todo rounded', 'Nothing to see here!'));
                return container;
            }
        }
        for (let item of partialList) {
            item.dueDate = format(item.dueDate, 'P');
        }
        container.appendChild(createTodoTitle(title))
        createTodoItemWithIndex(container, partialList);
        if (timeFrame !== 'completed') {container.appendChild(newTodoButton());}
        return container;
    }

    function completeTodo(project, index) {
        let list = createListFromJSON(getStorage(project))
        if (!list) {
            console.error('Complete Todo: Project not found');
            return;
        }
        if (typeof list[index] === 'undefined') {
            console.error('Complete Todo: Index not in project');
            return;
        }
        let val = list[index].completed;
        list[index].completed = !val;
        populateStorage(project, list);
    }

    function deleteTodo(project, index) {
        let list = createListFromJSON(getStorage(project))
        if (!list) {
            console.error('Complete Todo: Project not found');
            return;
        }
        if (typeof list[index] === 'undefined') {
            console.error('Complete Todo: Index not in project');
            return;
        }
        list.splice(index, 1)
        populateStorage(project, list);
    }

    return {
        createNewTodo: createNewTodo,
        renderTodos: renderTodos,
        renderTodosByDate: renderTodosByDate,
        completeTodo: completeTodo,
        deleteTodo: deleteTodo,
    }
})();

export {userTodoList};