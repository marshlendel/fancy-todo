//Selectors
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const select = document.querySelector("select");
//Event Listeners
todoButton.addEventListener("click", addFromInput);
todoList.addEventListener("click", deleteAndCheck);
select.addEventListener("change", filterTodos);

if (localStorage.getItem("todo-list")) {
  displayTodos(JSON.parse(localStorage.getItem("todo-list")));
}

//Functions

function addTodo(item, id) {
  const todoName = item?.name || item;
  //toDiv
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // CREATE LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoName;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //CHECK MARK BUTTON
  const checkButton = document.createElement("button");
  checkButton.innerHTML = "<i class='fas fa-check'></i>";
  checkButton.classList.add("check-button");
  todoDiv.appendChild(checkButton);
  //TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);

  //APPEND INDIVIDUAL TODO DIV TO TODO LIST and set id attribute
  if (item?.isComplete === true) {
    todoDiv.classList.add("completed");
  }

  todoDiv.dataset.id = id;
  todoList.appendChild(todoDiv);
}

function addFromInput(e) {
  e.preventDefault();
  let input = document.querySelector(".todo-input");
  let currentId = Number(localStorage.getItem("id"));

  if (!localStorage.getItem("id")) {
    localStorage.setItem("id", 1);
  }

  if (input.value.trim()) {
    addTodo(input.value, currentId);
    addToStorage(input.value, currentId);
    currentId++;
    localStorage.setItem("id", currentId);
    input.value = "";
  }
}

function displayTodos(storageList) {
  storageList.forEach((object) => {
    addTodo(object, object.id);
  });
}

function filterTodos(e) {
  const filterValue = e.target.value;
  const todoList = document.querySelectorAll(".todo");
  todoList.forEach((todo) => {
    if (filterValue === "all") {
      todo.classList.remove("hide");
    } else if (filterValue === "incomplete") {
      todo.classList.contains("completed")
        ? todo.classList.add("hide")
        : todo.classList.remove("hide");
    } else {
      todo.classList.contains("completed")
        ? todo.classList.remove("hide")
        : todo.classList.add("hide");
    }
  });
}

function deleteAndCheck(e) {
  const todoItem = e.target;
  const todo = todoItem.parentElement;
  if (todoItem.classList[0] === "trash-button") {
    removeInStorage(todo.dataset.id);
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (todoItem.classList[0] === "check-button") {
    todo.classList.toggle("completed");
    updateStorage(todo.dataset.id);
  }
}

function addToStorage(todo, id) {
  let items;
  if (localStorage.getItem("todo-list")) {
    items = JSON.parse(localStorage.getItem("todo-list"));
  } else {
    items = [];
  }
  items.push({ name: todo, isComplete: false, id: id });
  localStorage.setItem("todo-list", JSON.stringify(items));
}

function removeInStorage(id) {
  const list = JSON.parse(localStorage.getItem("todo-list"));
  let indexDelete;
  list.forEach((object, index) => {
    if (object.id === Number(id)) {
      indexDelete = index;
    }
  });
  list.splice(indexDelete, 1);
  localStorage.setItem("todo-list", JSON.stringify(list));
}

function updateStorage(id) {
  const list = JSON.parse(localStorage.getItem("todo-list"));
  list.forEach((object) => {
    if (object.id === Number(id)) {
      object.isComplete = object.isComplete ? false : true;
    }
  });
  localStorage.setItem("todo-list", JSON.stringify(list));
}
