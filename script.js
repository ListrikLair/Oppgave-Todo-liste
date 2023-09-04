// model
let tasks = [
    // { description: 'Handle til middag', isDone: false, responsible: 'Kevin' },
    // { description: 'Lage middag', isDone: false, responsible: 'Bestefar' },
    // { description: 'Spise middag', isDone: false, responsible: 'Jens Petrus' }
];
// let myDate = new Date();

// view
let tasksTable = document.getElementById("app");
updateView();
function updateView() {
    let html = `
        <tr>
            <th>Oppgave</th>
            <th>Hvem er ansvarlig</th>
            <th>Gjort</th>
            <th>Bli gjort innen</td>
            <th>Ble gjort</th>
            <th>Rediger</th>
        </tr>`;
    for (let i = 0; i < tasks.length; i++) {
        html += createHtmlRow(i);
    }
    tasksTable.innerHTML = html;

}

function createHtmlRow(i) {
    const task = tasks[i];
    const checkedHtml = task.isDone ? 'checked="checked"' : '';
    if (!task.editMode) return `<tr>
        <td>${task.description}</td>
        <td>${task.responsible}</td>
        <td><input onchange="changeIsDone(this, ${i})" type="checkbox" ${checkedHtml} /></td>
        <td>
        <div>${task.dayToComplete}</div>
        <div>${task.timeToComplete}</div>
        </td>
        <td>${task.timeNow}</td>
        <td>
        <button onclick ="deleteTask(${i})">Slett</button>
        <button onclick ="editTask(${i})">Rediger</button>
        </td>
        </tr>
        `;
    return `<tr>
        <td><input id="editDescription${i}" type="text" value="${task.description}"/></td>
        <td><input id="editResponsible${i}" type="text" value="${task.responsible}"/></td>
        <td><input onchange="changeIsDone(this, ${i})" type="checkbox" ${checkedHtml} /></td>
        <td>
        <input id="editDayToComplete" type="date" value="${task.dayToComplete}"/>
        <input id="editTimeToComplete" type="time" value="${task.timeToComplete}"/>
        </td>
        <td>${task.timeNow}</td>
            <td>
                <button onclick ="updateTask(${i})">Lagre</button>
            </td>
        </tr>
    `;
}

// controller
let taskDescriptionInput = document.getElementById("taskDescription");
let taskResponsibleInput = document.getElementById("taskResponsible");
let taskDayToComplete = document.getElementById("taskDayToComplete")
let taskTimeToComplete = document.getElementById("taskTimeToComplete")
function addTask() {
    tasks.push(
        {
            description: taskDescriptionInput.value,
            responsible: taskResponsibleInput.value,
            dayToComplete: taskDayToComplete.value,
            timeToComplete: taskTimeToComplete.value,
            isDone: false
        }
    )
    taskDescriptionInput.value = '';
    taskDayToComplete.value = '';
    taskTimeToComplete.value = '';
    updateView();
}

function changeIsDone(checkbox, index) {
    tasks[index].isDone = checkbox.checked;
    if (tasks[index].isDone = checkbox.checked) {
        tasks[index].timeNow = new Date().toLocaleDateString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    } else {
        tasks[index].timeNow = '';
    }
    updateView();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateView();
}

function editTask(index) {
    tasks[index].editMode = true;
    updateView();
}

function updateTask(index) {
    const idDes = `editDescription${index}`;
    const idRes = `editResponsible${index}`;
    // const idDay = `editDayToComplete${index}`;
    // const idTim = `editTimeToComplete${index}`;
    const inputTagDes = document.getElementById(idDes);
    const inputTagRes = document.getElementById(idRes);
    // const inputTagDay = document.getElementById(idDay);
    // const inputTagTim = document.getElementById(idTim);
    tasks[index].description = inputTagDes.value;
    tasks[index].responsible = inputTagRes.value;
    // tasks[index].dayToComplete = inputTagDay.value;
    // tasks[index].timeToComplete = inputTagTim.value;
    tasks[index].editMode = false;
    updateView();
}