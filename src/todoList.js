import { populateStorage, getStorage } from './localStorage.js';
import { createDomElement } from './template.js';
import Todo from './todoClass.js';
import { createListFromClass } from './todoJSON.js';

const userTodoList = (function() {
    let myTodos = createListFromClass(getStorage());

    function createContentFromClass(item) {
        let container = createDomElement('div', 'todo');
        container.appendChild(createDomElement('h2', 'todoTitle', item.title));
        container.appendChild(createDomElement('p', 'todoDesc', item.description));
        container.appendChild(createDomElement('p', 'todoDueDate', item.dueDate));
        return container;
    }
    
    function renderTodos(list) {
        let container = createDomElement('div', 'todoList');
        for (let item of list) {
            container.appendChild(createContentFromClass(item));
        }
        return container;
    }
    
    function addTodo(item) {
        let todoItem = new Todo(item);
        myTodos.push(todoItem);
        console.log(myTodos)
        populateStorage(myTodos);
        return renderTodos(myTodos);
    }

    return {
        addTodo: addTodo,
        renderTodos: renderTodos,
    }
})();

export {userTodoList};