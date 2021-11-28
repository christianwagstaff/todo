
function populateStorage(todoList) {
    localStorage.clear();
    localStorage.setItem('todos', JSON.stringify(todoList));
    console.log(localStorage)
}
function getStorage() {
    let items = localStorage.getItem('todos');
    return JSON.parse(items)
}

export {populateStorage, getStorage};