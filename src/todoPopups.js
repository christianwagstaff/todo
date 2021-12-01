import { createDomElement, createFormButton, createFormInput } from "./tools";

function newTodoPopup() {
    let popup = createDomElement('div', 'newTodoPopup');
    let form = document.createElement('form');
    let title = createFormInput('text', 'title', 'Todo Title');
    let description = createFormInput('text', 'description', 'Description');
    let dueDate = createFormInput('date', 'dueDate', new Date().getDate());
    let priority = createFormInput('text', 'priority', '');
    let submit = createFormButton('submit', 'submit');
    form.appendChild(title);
    form.appendChild(description);
    form.appendChild(dueDate);
    form.appendChild(priority);
    form.appendChild(submit)
    popup.appendChild(form);
    return popup
}

export {newTodoPopup};