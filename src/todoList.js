import { populateStorage, getStorage } from './localStorage.js';
import { createDomElement } from './tools.js';
import Todo from './todoClass.js';
import { createListFromClass } from './todoJSON.js';
import { getIcon } from './todoIcons.js';

const userTodoList = (function() {
    let myTodos = createListFromClass(getStorage('todos'));

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