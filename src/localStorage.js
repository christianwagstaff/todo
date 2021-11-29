import data from './testTodo.json';

function populateStorage(todoList) {
    localStorage.setItem('todos', JSON.stringify(todoList));
    console.log(localStorage)
}
function getStorage(choice) {
    if (!localStorage.getItem(choice)) {
        return data[choice];
    }
    let items = localStorage.getItem(choice);
    return JSON.parse(items)
}

export {populateStorage, getStorage};