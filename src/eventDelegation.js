function eventDelegation(event, nodeType, className) {
    //attaching eventListeners to the main books div, checks if target is what we want
    if (event.target && event.target.nodeName === nodeType) {
        if (event.target.classList.contains(className)) {
            return true;
        }
    }
}

export default eventDelegation