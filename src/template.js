function createDomElement(userType, userClass = '', content = '') {
    let container = document.createElement(userType);
    if (userClass !== '') {
        container.classList.add(userClass);
    }
    if (content !== '') {
        container.textContent = content;
    }
    return container;
}

export {createDomElement};