import { createIcon } from "./tools";

let icons = {
    "circle" : 'far fa-circle',
    "plus" : "fas fa-plus",
    "checked" : "far fa-check-circle",
    "cog" : "far fa-cog",
}

function getIcon(userIcon) {
    if (userIcon === '') {
        return 'Nothing Selected'
    }
    let icon = icons[userIcon];
    return(createIcon(icon));
}

export {getIcon}