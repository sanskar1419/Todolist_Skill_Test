let tasks = [];
let completedTask = [];
let unCompletedTask = [];
const tasksList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");
const blueTick = document.getElementById("Blue-tick");

// Printing on the console for weather site is Working or not
console.log("Working");

// Funtion to update the Complete Task Array and Uncomplete task Array
function update() {
  completedTask = tasks.filter((elem) => {
    return elem.done;
  });
  unCompletedTask = tasks.filter((elem) => {
    return !elem.done;
  });
}

// Function to add Task Object to the tasks Array
function addTaskToDOM(task) {
  const li = document.createElement("li");
  // Adding List Item
  li.innerHTML = `
          <input type="checkbox" id="${task.id}" ${
    task.done ? "checked" : ""
  } class="custom-checkbox">
          <label for="${task.id}">${task.text}</label>
          <i class="fa-regular fa-circle-xmark delete" id="Delete-icon" data-id="${
            task.id
          }"></i>
          
  `;
  tasksList.append(li);
}

//Randering the list and showing it
function renderList(tasks) {
  tasksList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    addTaskToDOM(tasks[i]);
  }
  tasksCounter.innerHTML = tasks.length;
}

// Function to Toggle the Task(Selecting and de-selecting)
function ToggleTask(taskId) {
  //Search for the taskId which we wanted to toggle
  const task = tasks.filter(function (task) {
    return task.id === taskId;
  });
  //If we found that id we will toggle it
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.done = !currentTask.done;
    update();
    completeAllTaskCheck(tasks);
    renderList(tasks);
    // Show the notification of done successfully by calling it
    showNotification("Task toggle Successfully");
    return;
  }

  showNotification("Could not toggle the task");
}

//To delete an element of an array
function deleteTask(taskId) {
  // Filter out all the element except the one we wanted to delete.
  // And store it into the new array.
  const newtask = tasks.filter(function (task) {
    return task.id !== taskId;
  });
  //Coping the filter array to the orriginal array.
  tasks = newtask;
  update();
  renderList(tasks);
  //Showing the notification of completed task
  showNotification("Task deleted Succsessfully");
}

// To add the task in the task array
function addTask(task) {
  //Only if task is not empty
  if (task) {
    tasks.push(task); //Push the task on the task array
    update();
    renderList(tasks); //rander or appling styles to our list
    showNotification("Task is added to your list");
    return;
  }
  // If task is not present
  showNotification("Task cannot be added to task list");
}

// For showing the notification for various task
function showNotification(text) {
  alert(text);
}

//For Handeling the input by the user
function addParticularTask() {
  const text = addTaskInput.value;
  console.log(text);
  if (text === "") {
    showNotification("Task can not be empty !");
    return;
  }
  const task = {
    text: text,
    id: Date.now().toString(), // To Convert the date into string and store in the ID
    done: false, // Initially we will Mark Status as false so that in future we can mark it as completed
  };
  addTaskInput.value = ""; // We will make text empty to take another task
  addTask(task);
}

// Handeling the keypress
function keyPress(event) {
  if (event.key === "Enter") {
    addParticularTask();
  }
}

// Function to check all task are completed or not
function completeAllTaskCheck(tasks) {
  var bool = true;
  tasks.forEach((e) => {
    if (e.done === false) bool = false;
  });

  if (bool === true) {
    blueTick.style.color = "#0079bf";
    blueTick.style.transform = "scale(1.05)";
  }
}

// Function to clear all task from the array
function clearAllTask() {
  tasks.splice(0);
  blueTick.style.color = "rgb(174, 167, 167)";
  update();
  renderList(tasks);
}

// Function to handle click using Event Delegation
function handleClickOnScreen(event) {
  const target = event.target;
  console.log(target);
  //Checking click on different location
  if (target.className === "fa-regular fa-circle-xmark delete") {
    const taskId = target.dataset.id;
    deleteTask(taskId);
  } else if (target.className === "custom-checkbox") {
    const taskId = target.id;
    ToggleTask(taskId);
  } else if (target.className === "All-Task-button") {
    renderList(tasks);
  } else if (target.className === "Uncompleted-button") {
    renderList(unCompletedTask);
  } else if (target.className === "Completed-button") {
    renderList(completedTask);
  } else if (target.className === "Clear-All") {
    clearAllTask();
  } else if (target.className === "fa-solid fa-circle-plus") {
    addParticularTask();
  }
}

//function to add event listener
function startApp() {
  addTaskInput.addEventListener("keyup", keyPress);
  document.addEventListener("click", handleClickOnScreen);
}
//Calling function StartApp
startApp();
