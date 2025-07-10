// DOM elements
let addBtn = document.querySelector(".add-task-btn");
let task = document.querySelector(".type-task");
let taskList = document.querySelector(".task-list");
let img = "assets/cross.png"
let deleteBtn = document.querySelector(".delete-btn");
let todayHeading = document.getElementById("today-heading");







/* ------------------- Local Storage ------------------ */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((taskObj)=>{
    addTask(taskObj.text , taskObj.completed);
})
let darkMode=localStorage.getItem('dark-mode');



// Checkbox toggle event listener
taskList.addEventListener("change", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("task-checkbox")) {
        let list = e.target.closest(".list");
        let index = Array.from(taskList.children).indexOf(list);
        tasks[index].completed = e.target.checked;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});








/* ------------------- Add Task Logic ------------------ */

//Add task Event listener
addBtn.addEventListener("click", (e) => {
    e.preventDefault()

    let taskInput = task.value.trim();

    if (!taskInput) {
        alert("Enter a task");
        return
    }

    tasks.push({
        text: taskInput,
        completed: false
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    addTask(taskInput);
    task.value = "";
})

//Add task functionality
function addTask(taskInput, completed=false) {
    let div = document.createElement("div");
    div.classList.add("list");
    div.innerHTML = `<input type="checkbox" class="task-checkbox" ${completed ? "checked" : ""}>
                    <h4>${taskInput}</h4>
                    <button class="delete-btn"><img src=${img}></button>`;

    taskList.appendChild(div);
}









/* ------------------- Delete Task Logic ------------------ */
taskList.addEventListener("click", (e) => {
    const deleteButton = e.target.closest(".delete-btn");
    if (deleteButton) {
        let list = deleteButton.closest(".list");
        let index = Array.from(taskList.children).indexOf(list);
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        list.remove();
    }
});







/* ------------------- Dynamic Heading ------------------ */

window.addEventListener("DOMContentLoaded", () => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const today = new Date();
    todayHeading.textContent = `Today • ${today.toLocaleDateString(undefined, options)}`;
});




/* ------------------- Light Mode & Dark Mode Toggle ------------------ */

const themeSwitch=document.getElementById('theme-switch');
themeSwitch.addEventListener("click",()=>{
    darkMode=localStorage.getItem('dark-mode')
    darkMode !== "active" ? enableDarkmode() : disableDarkmode()
})

const enableDarkmode=()=>{
    document.body.classList.add("dark-mode");
    localStorage.setItem('dark-mode','active');
}

const disableDarkmode=()=>{
    document.body.classList.remove('dark-mode')
    localStorage.setItem('dark-mode',null)
}

if(darkMode==="active") enableDarkmode()





/* ------------------- Home page tasks added to the task list ------------------ */

let newHabits = JSON.parse(localStorage.getItem('newHabits')) || [];
if (newHabits.length > 0) {
    newHabits.forEach(habit => {

        if (!tasks.some(taskObj => taskObj.text === habit)) {
            tasks.push({ text: habit, completed: false });
            addTask(habit, false);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.removeItem('newHabits');
}





