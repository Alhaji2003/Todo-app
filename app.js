//Local Storage getItem
document.addEventListener('DOMContentLoaded', () => {
    const storageTasks = JSON.parse(localStorage.getItem('tasks'));

    if (storageTasks) {
        storageTasks.forEach((task) => tasks.push(task));
        updateTaskList();
        updateStatus();
    }
});
//End

let tasks = [];

//Local Storage setItem
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
//End

//  Function addTask Start
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        updateTaskList();
        updateStatus();
        saveTasks();
    }
};
//  Function End


//Function toggleTaskCompleted Start
const toggleTaskCompleted = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStatus();
    saveTasks();
};
// Function End


//Function deleteTask Start
const deleteTask = (index) => {
        tasks.splice(index, 1);
        updateTaskList();
        updateStatus();
        saveTasks();
    }
    //  Function End

//Function editTask Start
const editTask = (index) => {
        const taskInput = document.getElementById('taskInput');
        taskInput.value = tasks[index].text;

        tasks.splice(index, 1);
        updateTaskList();
        updateStatus();
        saveTasks();
    }
    //  Function End

//Function updateStatus Start
const updateStatus = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTask = tasks.length;
    const progress = (completedTasks / totalTask) * 100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`

    document.getElementById('numbers').innerHTML = `${completedTasks} / ${totalTask}`

    //Animation effect
    if (tasks.length && completedTasks === totalTask) {
        blaskConfetti();
    }
};
//Function End

// Function updatetaskList Start
const updateTaskList = () => {
    const tasklist = document.getElementById("task-list");
    tasklist.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = ` 
        <div class= "taskItem">
        <div class ="task ${task.completed ? "completed " : ""}">
        <input type = 'checkbox' class ='checkbox' ${task.completed ? "checked" : ""}/> 
        <p> ${task.text} </p> 
        </div >
         <div class='icons'>
            <img src = "img/edit.png" onclick = 'editTask(${index})' / >
            <img src = "img/bin.png" onclick = 'deleteTask(${index})' / >
            </div>
             </div>`;

        listItem.addEventListener("change", () => toggleTaskCompleted(index));
        tasklist.append(listItem);
    });
};
//Function End


//Click button
document.getElementById("taskAdd").addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
});

//Animation Function

const blaskConfetti = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.1 },
    });
}