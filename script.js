document.addEventListener("DOMContentLoaded", () => {
  const addTodoButton = document.getElementById("add-todo");
  const todoList = document.getElementById("todo-list");
  const todoArr = JSON.parse(localStorage.getItem("todos")) || [];
  renderTodos(todoArr);
  addTodoButton.addEventListener("click", () => {
    const todoInput = document.getElementById("todo-input").value;
    if (todoInput == "") return;
    const todo = {
      id: Date.now(),
      text: todoInput,
      completed: false,
    };
    saveTodo(todo);
  });
  function saveTodo(todo) {
    todoArr.push(todo);
    localStorage.setItem("todos", JSON.stringify(todoArr));
  }

  function renderTodos(todoArr) {
    todoArr.forEach((todo) => {
      const li = document.createElement("li");
      li.innerText = todo.text;
      li.className =
        "bg-gray-800 text-white p-2 rounded-md mt-3 flex justify-between items-center";
      if (todo.completed) {
        li.style.textDecoration = "line-through";
      }
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.className =
        "bg-red-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-red-600";
      deleteButton.addEventListener("click", () => {
        deleteTodo(todo.id);
      });
      li.appendChild(deleteButton);
      todoList.appendChild(li);
    });
  }
  function deleteTodo(id) {
    const index = todoArr.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todoArr.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todoArr));
      todoList.innerHTML = "";
      renderTodos(todoArr);
    }
  }
});
