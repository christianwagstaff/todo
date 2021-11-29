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

export {createDomElement, removeChildren};
