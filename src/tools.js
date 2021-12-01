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

function createFormInput() {

}

export {createDomElement, removeChildren, createIcon, createFormInput};
