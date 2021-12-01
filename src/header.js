import { createDomElement } from "./tools";
import { getIcon } from "./todoIcons";

const Header = (function() {
    function createHeader() {
        let header = createDomElement('header', 'header', 'Todo List');
        let settings = getIcon('cog');;
        header.appendChild(settings);
        return header;
    }

    return {
        createHeader: createHeader,
    }
})();

export default Header