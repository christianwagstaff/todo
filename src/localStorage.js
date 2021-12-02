import { add } from 'date-fns';
import data from './newJson.json';

function populateStorage(choice, list) {
    //if the list is empty do nothing
    if (!list) return;
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
        projects.unshift('default') //readd Default list to all projects
        let list = []
        for (let i of projects) {
            if (checkStorage(i)){
                let item = JSON.parse(localStorage.getItem(i));
                addIndex(item);
                list.push(...item);
            }
        }
        return list
    }
    if (choice === 'allList') {
        let projects = getProjects();
        projects.unshift('default') //readd Default list to all projects
        let list = {}
        for (let i of projects) {
            if (checkStorage(i)){
                let item = JSON.parse(localStorage.getItem(i));
                addIndex(item);
                list[i] = item
            }
        }
        return list
    }
    let item = localStorage.getItem(choice);
    if (!item) {
        return;
    }
    return addIndex(JSON.parse(item))
}

function changeProjectName(newProjectName, oldProjectName) {
    if (oldProjectName === 'default' || oldProjectName === 'userPreferences') return;
    //check if the newName already Exists
    if (localStorage.getItem(newProjectName)) {
        alert(`Cannot Complete Request: ${newProjectName} already exists!`);
        return
    };
    let info = getStorage(oldProjectName);
    populateStorage(newProjectName, info);
    localStorage.removeItem(oldProjectName);
}

function getProjects() {
    let defaultKeys = Object.keys(data)
    if (!localStorage[defaultKeys[0]]) {
        for (let i of defaultKeys) {
            if (i !== 'userPreferences') {
                populateStorage(i, data[i])
            }
        }

    }
    let keys =  Object.keys(localStorage).reverse();
    keys = keys.filter(function(item) {
        return item !== 'default'
    })
    return keys;
}

function addNewProject(project) {
    // If a project under the same name exists, exit
    if (localStorage.getItem(project)) {
        return
    }
    localStorage.setItem(project, '[]');
}

function deleteProjectFromStorage(project) {
    if (project === 'default' || project === 'userPreferences') return;
    localStorage.removeItem(project);
}

function addIndex(list) {
    if (!list) return;
    let counter = 0;
    for (let item of list) {
        item.index = counter;
        counter++;
    }
    return list
}

function resetLocalStorage() {
    localStorage.clear();
}

export {populateStorage, getStorage, getProjects, addNewProject, changeProjectName, deleteProjectFromStorage, resetLocalStorage, checkStorage};