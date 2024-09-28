//get the html element
var body = document.getElementById("body")
var dropBtn = document.querySelector(".stateFiltter")
var filterTxt = document.querySelector(".filterTxt")
var addTaskBtn = document.querySelector(".addTask")
var addContainer = document.querySelector(".addContainer")
var newTaskDesc = document.querySelector(".addTaskDesc")
var newTaskTitle = document.querySelector(".addTaskTitle")
var tasksCountainer = document.querySelector(".tasksCountainer")
var searchText = document.querySelector(".searchText")
var updateBtn = document.querySelector(".updateBtn")
var updateFormHeader = document.querySelector(".formHeader")
var applyBtn = document.querySelector(".applyBtn")
var completeCount = document.querySelector(".completeCount")
var totalCount = document.querySelector(".totalCount")
var button = document.querySelectorAll("button")


//create the app variable
var darkMode = false;
var data = JSON.parse(localStorage.getItem("myTasks"))
data = (data) ? data : []
var updateItemID = ""



//toggle batween dark and light mode

const darkModeToggle = () => {
    //check if dark mode is on 
    if(darkMode != false){
        //if light mode is on then change to dark mode
        toggleDarkMode();
    }else{
        //if dark mode is on then change to light mode
        toggleLightMode();
    }
    darkMode = !darkMode
}

const toggleDarkMode = () => {
    body.classList.add("darkMode")
}
const toggleLightMode = () => {
    body.classList.remove("darkMode")
}



//change the filter button text

const changeFilterText = (newTxt) => {
    filterTxt.innerHTML = newTxt.toString();
    filterByState();
}


//show and hide the form
const showAddForm = () => {
    if(!addContainer.classList.contains("show")){
        addContainer.classList.add("show")
        updateBtn.classList.remove("show")
        applyBtn.classList.remove("hide")
    }else{
        addContainer.classList.remove("show")
        newTaskTitle.value = ""
        newTaskDesc.value = ""
    }
    
}

//create the task element

const createTaskElement = (taskid ,taskName, taskDesc, taskState) =>{

    taskDesc = (taskDesc) ? taskDesc : ""
    
    var taskElement = `
    <div class="task">
        <input onclick="updateTaskState(${taskid})" class="taskCheckBox" type="checkbox" ${taskState}>
        <label class="taskTitle">${taskName}</label>
        <label class="taskDesc">${taskDesc}</label>
        <button class="editBtn" onclick="showUpdateForm(${taskid})">
            <svg width="18" height="18" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.67272 3.49106L1 10.1637V13.5H4.33636L11.0091 6.82736M7.67272 3.49106L10.0654 1.09837L10.0669 1.09695C10.3962 0.767585 10.5612 0.602613 10.7514 0.540824C10.9189 0.486392 11.0993 0.486392 11.2669 0.540824C11.4569 0.602571 11.6217 0.767352 11.9506 1.09625L13.4018 2.54738C13.7321 2.87769 13.8973 3.04292 13.9592 3.23337C14.0136 3.40088 14.0136 3.58133 13.9592 3.74885C13.8974 3.93916 13.7324 4.10414 13.4025 4.43398L13.4018 4.43468L11.0091 6.82736M7.67272 3.49106L11.0091 6.82736" stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>                        
        </button>
        <button class="deleteBtn" onclick="deleteTask(${taskid})">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z" stroke="#CDCDCD"/>
                <path d="M14.625 3.75H3.375" stroke="#CDCDCD" stroke-linecap="round"/>
                <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" stroke="#CDCDCD"/>
                <path d="M10.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round"/>
                <path d="M7.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round"/>
            </svg>                        
        </button>
    </div>
    `

    return (taskName) ? taskElement : ""

}


//show tasks
const showItem = () => {
    if(data != null){
        tasksCountainer.innerHTML = ""
        JSON.parse(localStorage.getItem("myTasks"))
        data.map((task) =>{
            tasksCountainer.innerHTML += createTaskElement(task.id ,task.title, task.desc, task.state)
            
        })
    }
}


//add task to the local storage and show it
const addTask = (e) => {
    if(!newTaskTitle.value){
        newTaskTitle.classList.add("wrongInput")
        newTaskTitle.focus()
    }else{
        newTaskTitle.classList.remove("wrongInput")
        var newId = (data) ? data.slice(data.length - 1)[0].id + 1 : 0
        newTask = {
            "id": newId,
            "title": newTaskTitle.value,
            "desc": newTaskDesc.value,
            "state":""
        }

        data.push(newTask);
        localStorage.setItem("myTasks", JSON.stringify(data))
        
        showItem();
        showAddForm();

    }

    calcTotalTask()
   // e.preventDefault()
}



//delete task from the data

const deleteTask = (taskId) => {
    data = data.filter(item => item.id != taskId)
    localStorage.setItem("myTasks", JSON.stringify(data))
    showItem()
    
    calcCheckTask()
    calcTotalTask()
}


//filter task by state
const filterByState = () => {
    if(data != ""){
        tasksCountainer.innerHTML = ""
        completeData = data.filter(item => item.state != "")
        inCompleteData = data.filter(item => item.state == "")

        if(filterTxt.innerHTML == "Complete"){
            completeData.map((task) => {
                tasksCountainer.innerHTML += createTaskElement(task.id ,task.title, task.desc, task.state)
            })          
        }else if(filterTxt.innerHTML == "Incomplete"){
            inCompleteData.map((task) => {
                tasksCountainer.innerHTML += createTaskElement(task.id ,task.title, task.desc, task.state)
            })          
        }else{
            showItem();
        }

    }
}




//search function 

const search = () => {
    tasksCountainer.innerHTML = ""
    searchData = data.filter(item => item.title.includes(searchText.value) || item.desc.includes(searchText.value))
    searchData.map((task) => {
        tasksCountainer.innerHTML += createTaskElement(task.id ,task.title, task.desc, task.state)
    })    
}


//show update form and update the task 

const showUpdateForm = (taskId) => {

    showAddForm()

    updateFormHeader.innerHTML = "Update Task"
    updateBtn.classList.add("show")
    applyBtn.classList.add("hide")

    var updateItem = data.filter(item => item.id == taskId)

    newTaskTitle.value = updateItem[0].title
    newTaskDesc.value = updateItem[0].desc
    updateItemID = updateItem[0].id

}

const saveUpdatedTask = (e) => {

    objIndex = data.findIndex(obj => obj.id == updateItemID);

    data[objIndex].title = newTaskTitle.value
    data[objIndex].desc = newTaskDesc.value

    localStorage.setItem("myTasks", JSON.stringify(data))

    showItem();
    showAddForm();
    e.preventDefault();
}


//mark the task as completed
const updateTaskState = (taskId) => {
    objIndex = data.findIndex(obj => obj.id == taskId);
    (data[objIndex].state == "") ? data[objIndex].state = "checked" : data[objIndex].state = ""
    
    calcCheckTask()
}


// update check task count

const calcCheckTask = () => {
    if(data == null){
        completeCount.innerHTML = "0"
    }else{
        var completeData = data.filter(item => item.state != "")
        completeCount.innerHTML = completeData.length
    }
}

const calcTotalTask = () => {
    if(data == null){
        totalCount.innerHTML = "0"
    }else{
        totalCount.innerHTML = data.length
    }
}


//prevent default on every botton click or touch

button.forEach(element => {
    element.addEventListener("click", (event) => event.preventDefault())

})
