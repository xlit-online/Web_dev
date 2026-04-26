const API_URL = "http://localhost:3000/api/todos";

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

async function loadTodos() {
  todoList.innerHTML = "";

  const res = await fetch(API_URL);
  const todos = await res.json();

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.name;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", async () => {
      await fetch(`${API_URL}?id=${todo.id}`, {
        method: "DELETE"
      });

      loadTodos();
    });

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const todoName = todoInput.value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: todoName })
  });

  todoInput.value = "";
  loadTodos();
});

loadTodos();