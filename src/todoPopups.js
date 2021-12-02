import { createDomElement, createFormButton, createFormInput, createFormInputDropdown } from "./tools";

function newTodoPopup() {
    let popup = createDomElement('div', 'newTodoPopup');
    let form = createDomElement('form', 'newTodoForm');
    let title = createFormInput('text', 'newTitle', 'Todo Title', 'Title');
    let description = createFormInput('text', 'newDescription', 'Description', 'Description');
    let dueDate = createFormInput('date', 'newDueDate', '', 'Due Date');
    let priority = createFormInputDropdown('newPriority', [['High', 3], ['Medium', 2], ['Low', 1]], 'Priority');
    let submit = createFormButton('submit', 'Save Todo', 'submitNew');
    let cancel = createFormButton('button', 'Cancel', 'cancelNew');
    let buttonContainer = createDomElement('div', 'formButtons')
    buttonContainer.appendChild(cancel);
    buttonContainer.appendChild(submit);
    form.appendChild(title);
    form.appendChild(description);
    form.appendChild(dueDate);
    form.appendChild(priority);
    form.appendChild(buttonContainer)
    popup.appendChild(form);
    return popup
}

export {newTodoPopup};