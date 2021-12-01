import data from './newJson.json';
let testing = true;

function populateStorage(choice, list) {
    //if the list is empty do nothing
    if (!list) return;
    console.log('Saving Storage')
    localStorage.setItem(choice, JSON.stringify(list));
}

function checkStorage(choice) {
    if (localStorage.getItem(choice)) {
        return true;
    }
    return false;
}

function getStorage(choice) {
    if (choice==='all') {
        let projects = getProjects();
        let list = []
        for (let i of projects) {
            if (checkStorage(i)){
                let item = JSON.parse(localStorage.getItem(i));
                list.push(...item);
            }
        }
        return list
    }
    // if (testing) {
    //     let projects = getProjects();
    //     for (let i of projects) {
    //         populateStorage(i, data[i]);
    //     }
    // }
    let items = localStorage.getItem(choice);
    if (!items) {
        return;
    }
    return JSON.parse(items)
}

function getProjects() {
    let defaultKeys = Object.keys(data)
    if (!localStorage[defaultKeys[0]]) {
        for (let i of defaultKeys) {
            populateStorage(i, data[i])
        }
    }
    return Object.keys(localStorage).reverse();
}

function addNewProject(project) {
    // If a project under the same name exists, exit
    if (localStorage.getItem(project)) {
        return
    }
    localStorage.setItem(project, '[]');
}

export {populateStorage, getStorage, getProjects, addNewProject};