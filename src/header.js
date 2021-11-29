import { createDomElement } from "./tools";

const Header = (function() {
    function createHeader() {
        let header = createDomElement('header', 'header', 'Todo List');
        return header;
    }

    return {
        createHeader: createHeader,
    }
})();

export default Header