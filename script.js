
/* =========================
   STUDY PLANNER
   ========================= */

const subjectInput = document.getElementById("subjectInput");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const completedCount = document.getElementById("completedCount");
const totalCount = document.getElementById("totalCount");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");


/* Load saved tasks */

let tasks = JSON.parse(localStorage.getItem("studyFlowTasks")) || [];


/* =========================
   SAVE TASKS
   ========================= */

function saveTasks() {

    localStorage.setItem(
        "studyFlowTasks",
        JSON.stringify(tasks)
    );

}


/* =========================
   ADD TASK
   ========================= */

addTaskBtn.addEventListener("click", function () {

    const subject = subjectInput.value.trim();
    const task = taskInput.value.trim();

    if (subject === "" || task === "") {

        alert("Please enter both subject and study task.");

        return;
    }

    const newTask = {

        id: Date.now(),

        subject: subject,

        task: task,

        completed: false

    };

    tasks.push(newTask);

    saveTasks();

    subjectInput.value = "";
    taskInput.value = "";

    displayTasks();

    updateProgress();

});


/* =========================
   DISPLAY TASKS
   ========================= */

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (item) {

        const li = document.createElement("li");

        li.className = "task-item";

        if (item.completed) {

            li.classList.add("completed");

        }

        li.innerHTML = `

            <div class="task-info">

                <span class="task-subject">
                    ${item.subject}
                </span>

                <span class="task-name">
                    ${item.task}
                </span>

            </div>

            <div class="task-actions">

                <button
                    class="complete-btn"
                    onclick="completeTask(${item.id})">

                    ${item.completed ? "Undo" : "Complete"}

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${item.id})">

                    Delete

                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

}


/* =========================
   COMPLETE / UNDO
   ========================= */

function completeTask(id) {

    tasks = tasks.map(function (item) {

        if (item.id === id) {

            item.completed = !item.completed;

        }

        return item;

    });

    saveTasks();

    displayTasks();

    updateProgress();

}


/* =========================
   DELETE TASK
   ========================= */

function deleteTask(id) {

    tasks = tasks.filter(function (item) {

        return item.id !== id;

    });

    saveTasks();

    displayTasks();

    updateProgress();

}


/* =========================
   UPDATE PROGRESS
   ========================= */

function updateProgress() {

    const total = tasks.length;

    const completed = tasks.filter(function (item) {

        return item.completed;

    }).length;


    let percentage = 0;

    if (total > 0) {

        percentage = Math.round(
            (completed / total) * 100
        );

    }


    /* Study Planner Progress */

    totalCount.textContent = total;

    completedCount.textContent = completed;

    progressFill.style.width =
        percentage + "%";

    progressText.textContent =
        percentage + "% Completed";


    /* Dashboard */

    document.getElementById("dashboardTotal").textContent =
        String(total).padStart(2, "0");

    document.getElementById("dashboardCompleted").textContent =
        String(completed).padStart(2, "0");

    document.getElementById("dashboardPercentage").textContent =
        percentage + "%";

    document.getElementById("dashboardProgressText").textContent =
        percentage + "%";

    document.getElementById("dashboardProgressFill").style.width =
        percentage + "%";


    /* Next Task */

    const nextTaskBox =
        document.getElementById("dashboardNextTask");


    const nextTask = tasks.find(function (item) {

        return !item.completed;

    });


    if (nextTask) {

        nextTaskBox.innerHTML = `

            <span class="next-task-label">
                NEXT TASK
            </span>

            <h3>
                ${nextTask.task}
            </h3>

            <p>
                ${nextTask.subject}
            </p>

        `;

    }

    else if (total > 0) {

        nextTaskBox.innerHTML = `

            <span class="next-task-label">
                ALL TASKS COMPLETED
            </span>

            <h3>
                Great work! 🎉
            </h3>

            <p>
                You completed all your study tasks.
            </p>

        `;

    }

    else {

        nextTaskBox.innerHTML = `

            <span class="next-task-label">
                NEXT TASK
            </span>

            <h3>
                No tasks added yet
            </h3>

            <p>
                Add a study task to get started.
            </p>

        `;

    }

}


/* =========================
   STUDY TIMER
   ========================= */

function updateTimerDisplay() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    timerDisplay.textContent =
        String(minutes).padStart(2, "0")
        + ":"
        + String(seconds).padStart(2, "0");

}


let timeLeft = 45 * 60;
let timer = null;


/* Timer Elements */

const timerDisplay =
    document.getElementById("timerDisplay");

const startTimer =
    document.getElementById("startTimer");

const pauseTimer =
    document.getElementById("pauseTimer");

const resetTimer =
    document.getElementById("resetTimer");

const setTimerBtn =
    document.getElementById("setTimerBtn");

const timerSettings =
    document.getElementById("timerSettings");

const customMinutes =
    document.getElementById("customMinutes");

const applyTimer =
    document.getElementById("applyTimer");


/* =========================
   DISPLAY TIMER
   ========================= */

function updateTimerDisplay() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    timerDisplay.textContent =
        String(minutes).padStart(2, "0")
        + ":"
        + String(seconds).padStart(2, "0");

}


/* =========================
   START TIMER
   ========================= */

startTimer.addEventListener("click", function () {

    if (timer !== null) {
        return;
    }

    timer = setInterval(function () {

        if (timeLeft > 0) {

            timeLeft--;

            updateTimerDisplay();

        } else {

            clearInterval(timer);

            timer = null;

            alert("Study session completed! 🎉");

        }

    }, 1000);

});


/* =========================
   PAUSE TIMER
   ========================= */

pauseTimer.addEventListener("click", function () {

    clearInterval(timer);

    timer = null;

});


/* =========================
   RESET TIMER
   ========================= */

resetTimer.addEventListener("click", function () {

    clearInterval(timer);

    timer = null;

    timeLeft = 45 * 60;

    updateTimerDisplay();

});


/* =========================
   SHOW / HIDE SET TIMER
   ========================= */

setTimerBtn.addEventListener("click", function () {

    if (timerSettings.style.display === "block") {

        timerSettings.style.display = "none";

    } else {

        timerSettings.style.display = "block";

        customMinutes.focus();

    }

});


/* =========================
   APPLY CUSTOM TIMER
   ========================= */

applyTimer.addEventListener("click", function () {

    const minutes =
        Number(customMinutes.value);


    /* Validate */

    if (
        !Number.isInteger(minutes) ||
        minutes < 5 ||
        minutes > 180
    ) {

        alert("Please enter a value between 5 and 180 minutes.");

        return;

    }


    /* Stop Current Timer */

    clearInterval(timer);

    timer = null;


    /* Set New Time */

    timeLeft = minutes * 60;

    updateTimerDisplay();


    /* Hide Settings */

    timerSettings.style.display = "none";

    customMinutes.value = "";


    alert(
        "Timer set to " + minutes + " minutes."
    );

});


/* =========================
   INITIALIZE
   ========================= */

updateTimerDisplay();