import { populateStorage, getStorage } from './localStorage.js';
import { createDomElement } from './tools.js';
import Todo from './todoClass.js';
import { createListFromClass } from './todoJSON.js';
import { getIcon } from './todoIcons.js';

const userTodoList = (function() {
    let myTodos = createListFromClass(getStorage('todos'));

    function createTodoItem(item) {
        let icon = getIcon('fas fa-check');
        let container = createDomElement('div', 'todo rounded');
        let top = createDomElement('div', 'todoTop');
        let bottom = document.createElement('div');
        top.appendChild(createDomElement('h2', 'todoTitle', item.title));
        top.appendChild(createDomElement('p', 'todoDueDate', item.dueDate));
        bottom.appendChild(createDomElement('p', 'todoDesc', item.description));
        container.appendChild(icon);
        container.appendChild(top);
        container.appendChild(bottom);
        return container;
    }
    
    function renderTodos(list) {
        let container = createDomElement('div', 'todoList');
        for (let item of list) {
            container.appendChild(createTodoItem(item));
        }
        container.appendChild(createDomElement('div', 'todo newTodo rounded', 'New Todo Item'));
        return container;
    }
    
    function addTodo(item) {
        let todoItem = new Todo(item);
        myTodos.push(todoItem);
        populateStorage(myTodos);
        return renderTodos(myTodos);
    }

    return {
        addTodo: addTodo,
        renderTodos: renderTodos,
    }
})();

export {userTodoList};