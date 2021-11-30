import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { createIcon } from "./tools";

library.add(faCheck)
dom.watch();

function getIcon(userIcon) {
    if (userIcon === '') {
        return 'Nothing Selected'
    }
    return(createIcon(userIcon));
}

export {getIcon}