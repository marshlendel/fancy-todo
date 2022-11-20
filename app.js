//Selectors
const todo = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteAndCheck);

//Functions
function addTodo(e) {
  e.preventDefault();

  if (todoInput.value !== "") {
    //toDiv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // CREATE LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
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

    //APPEND INDIVIDUAL TODO DIV TO TODO LIST
    todoList.appendChild(todoDiv);
    todoInput.value = "";
  }
}

function deleteAndCheck(e) {
  const todoItem = e.target;
  const todo = todoItem.parentElement;
  if (todoItem.classList[0] === "trash-button") {
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (todoItem.classList[0] === "check-button") {
    todo.classList.toggle("completed");
  }
}
