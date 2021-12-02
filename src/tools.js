function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

function createDomElement(userType, userClass = '', content = '') {
    let container = document.createElement(userType);
    if (userClass !== '') {
        let classes = userClass.split(' ')
        for (let x of classes) {
            container.classList.add(x);
        }
    }
    if (content !== '') {
        container.textContent = content;
    }
    return container;
}

function createIcon(icon) {
    let container = createDomElement('i', icon);
    return container
}

function createInput(userType, name, placeholder) {
    let input = document.createElement('input')
    input.setAttribute('type', userType);
    input.setAttribute('name', name);
    input.setAttribute('id', name)
    input.setAttribute('placeholder', placeholder);
    return input
}

function createLabel(name, content) {
    let label = document.createElement('label');
    label.setAttribute('for', name);
    label.textContent = content;
    return label;
}

function createFormInput(userType, name, placeholder, labelText) {
    let input = createInput(userType,name, placeholder);
    let label = createLabel(name, labelText)
    let container = createDomElement('div', 'popupInput')
    container.appendChild(label);
    container.appendChild(input);
    return container;
}

function createFormInputDropdown(name, options, labelText) {
    let label = createLabel(name, labelText);
    let input = document.createElement('select')
    input.id = name;
    for (let option of options) {
        let x = new Option(option[0], option[1])
        input.appendChild(x);
    }
    let container = createDomElement('div', 'popupInput')
    container.appendChild(label);
    container.appendChild(input);
    return container
}

function createFormButton(userType, value, id) {
    let input = createDomElement('button', 'btn', value)
    input.setAttribute('type', userType);
    input.id = id;
    return input;
}

function checkIfArrayContains(array, element) {
    for (let item of array) {
        console.log(item)
        if (item === element) {
            return true;
        }
    }
    return false;
}

export {checkIfArrayContains, createDomElement, removeChildren, createIcon, createFormInput, createFormButton, createFormInputDropdown};
