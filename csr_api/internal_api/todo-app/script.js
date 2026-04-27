const API_URL = "https://web-dev-csr-api-internal-api.onrender.com/api/todos";

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

async function loadTodos() {
  todoList.innerHTML = "";

  const res = await fetch(API_URL);
  const todos = await res.json();

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", async () => {
      await fetch(`${API_URL}?id=${todo._id}`, {
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

  const todoTitle = todoInput.value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: todoTitle })
  });

  todoInput.value = "";
  loadTodos();
});

loadTodos();