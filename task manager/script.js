function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;
    span.onclick = () => {
        li.classList.toggle("done");
        saveTasks();
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = () => {
        li.remove();
        saveTasks();
    };

    li.appendChild(span);
    li.appendChild(delBtn);

    document.getElementById("taskList").appendChild(li);
    input.value = "";

    saveTasks(); // ✅ Save to localStorage
}
// TODO: Store tasks in localStorage when they are added or deleted.
function  clearTasks() {
    const  taskList  =  document.getElementById("taskList");
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}
// TODO: Load tasks from localStorage when the page loads.
function  saveTasks() {
    const  taskList  =  document.getElementById("taskList");
    const  tasks  = [];
    taskList.querySelectorAll("li").forEach(li => {
        const  span  = li.querySelector("span");
        tasks.push({
            text: span.textContent,
            done: li.classList.contains("done")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function  loadTasks() {
    const  taskList  =  document.getElementById("taskList");
    const  tasks  =  JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const  li  =  document.createElement("li");

        const  span  =  document.createElement("span");
        span.textContent  =  task.text;
        if (task.done) {
            li.classList.add("done");
        }
        span.onclick  =  ()  =>  li.classList.toggle("done");

        const  delBtn  =  document.createElement("button");
        delBtn.textContent  =  "❌";
        delBtn.onclick  =  () => {
            li.remove();
            saveTasks();
        };

        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}
// Each task should include its text and whether it's marked as done.
window.onload = () => {
    loadTasks();
    document.getElementById("taskInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
            saveTasks();
        }
    });
    document.getElementById("clearBtn").onclick = () => {
        clearTasks();
        saveTasks();
    };
};




