import { createDomElement } from "./tools";

function newTodoPopup() {
    let popup = createDomElement('div', 'newTodoPopup');
    let form = document.createElement('form');

    popup.appendChild(form);
    return popup
}