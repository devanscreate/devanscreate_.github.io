var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToDoItem);

var toDoEntryBox = document.getElementById("todo-entry-box");
var daySelect = document.getElementById("day-select");

function addToDoItem() {
  var itemText = toDoEntryBox.value;
  var selectedDay = daySelect.value;

  if (itemText !== "") {
    var toDoItem = document.createElement("li");
    toDoItem.textContent = itemText;
    toDoItem.addEventListener("dblclick", toggleToDoItemState); // Tambahkan toggle pada double-click
    document.getElementById(selectedDay + "-list").appendChild(toDoItem);
    toDoEntryBox.value = ""; // Kosongkan input setelah ditambahkan
  }
}

function toggleToDoItemState() {
  this.classList.toggle("completed");
}

// Fungsi lainnya tetap sama
function clearCompletedToDoItems() {
  var completedItems = document.querySelectorAll(".completed");
  completedItems.forEach(function (item) {
    item.remove();
  });
}

function emptyList() {
  var allLists = document.querySelectorAll("td");
  allLists.forEach(function (list) {
    list.innerHTML = "";
  });
}

function saveList() {
  var toDos = {};

  var days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  days.forEach(function (day) {
    var list = document.getElementById(day + "-list");
    var tasks = [];
    for (var i = 0; i < list.children.length; i++) {
      var task = list.children[i];
      tasks.push({
        task: task.textContent,
        completed: task.classList.contains("completed"),
      });
    }
    toDos[day] = tasks;
  });
  localStorage.setItem("weeklyToDos", JSON.stringify(toDos));
}

function loadList() {
  if (localStorage.getItem("weeklyToDos") !== null) {
    var toDos = JSON.parse(localStorage.getItem("weeklyToDos"));
    for (var day in toDos) {
      var list = document.getElementById(day + "-list");
      toDos[day].forEach(function (toDo) {
        var toDoItem = document.createElement("li");
        toDoItem.textContent = toDo.task;
        if (toDo.completed) {
          toDoItem.classList.add("completed");
        }
        toDoItem.addEventListener("dblclick", toggleToDoItemState);
        list.appendChild(toDoItem);
      });
    }
  }
}

loadList();
