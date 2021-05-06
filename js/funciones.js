let divTask = document.querySelector('.flex');
let taskForm = document.querySelector('input');
let prioritySelectors = document.querySelectorAll('#priority option');
let addButton = document.querySelector('.add');
let message = document.querySelector('#message');
let deleteButtons = document.getElementsByClassName('delete');
let search = document.querySelector('#search input')
let prioritySearch = document.querySelectorAll('#prioritySearch');


function printTask(aTask) {
    let article = document.createElement('article');
    let h3 = document.createElement('h3');
    let button = document.createElement('button');
    button.classList.add('delete');
    button.dataset.id = aTask.idtarea;
    button.innerHTML = `<i class="fas fa-trash-alt"></i>`
    button.addEventListener('click', deleteTask);
    h3.innerHTML = `${aTask.titulo}`;
    h3.appendChild(button);
    article.appendChild(h3);
    divTask.appendChild(article);
    article.classList.add(aTask.prioridad)
}

function printAllTheTasks(tasks) {
    tasks.forEach(task => printTask(task));
}

printAllTheTasks(tareas);

addButton.addEventListener('click', createTask);
currentId = tareas.length

function createTask(event) {
    event.preventDefault();
    currentId++

    let resultValidation = validateForm();

    if (resultValidation) {
        let i = 1;
        while (!prioritySelectors[i].selected) {
            i++;
        }

        const newTask = {
            idtarea: currentId,
            titulo: taskForm.value.trim(),
            prioridad: prioritySelectors[i].value.toLowerCase(),
        }

        tareas.push(newTask);
        printTask(newTask);
        message.innerHTML = `<h2 style = "color: green">Tarea añadida correctamente</h2>`;
        taskForm.value = "";
        prioritySelectors[0].selected = true;
    }

}


function validateForm() {
    let result = true;
    if (taskForm.value === "" && prioritySelectors[0].selected) {
        message.innerHTML = `<h2 style = "color: red">Ambos campos tienen que contener datos</h2>`;
        result = false;
    } else if (taskForm.value === "") {
        message.innerHTML = `<h2 style ="color: red">Introduce una tarea</h2>`;
        result = false;
    } else if (prioritySelectors[0].selected) {
        message.innerHTML = `<h2 style ="color: red">Elige una prioridad</h2>`;
        result = false;
    }

    return result;
}


search.addEventListener('input', filterByText)

function filterByText(event) {
    let tasks = (event.target.value != "") ? findTasksByText(event.target.value, tareas) : tareas

    divTask.innerHTML = "";
    printAllTheTasks(tasks);
}

function findTasksByText(pWord, tasks) {
    let word = pWord.toLowerCase();
    let searching = tasks.filter(task => {
        return (task.titulo.toLowerCase().includes(word));
    })
    return searching
}

prioritySearch.forEach(search => search.addEventListener('change', filterByPriority))


function filterByPriority(event) {
    let priority = event.target;
    if (priority[0].selected === true) {
        divTask.innerHTML = "";
        printAllTheTasks(tareas);
    } else {
        let priorityFilter = tareas.filter(tarea => tarea.prioridad === priority.value.toLowerCase());
        divTask.innerHTML = "";
        printAllTheTasks(priorityFilter);
    }
}


function deleteTask(event) {
    event.preventDefault();

    let article = event.currentTarget.parentNode.parentNode;
    article.parentNode.removeChild(article)
    let targetId = event.currentTarget.dataset.id;

    let i = 0;
    while (tareas[i].idtarea === targetId) {
        i++
    } tareas.splice(tareas[i], 1);
    message.innerHTML = `<h2 style ="color: green">Tarea borrada correctamente</h2>`;
    if (tareas.length === 0) {
        message.innerHTML = `<h2 style ="color: green">No hay tareas pendientes</h2>`;
    }



}











