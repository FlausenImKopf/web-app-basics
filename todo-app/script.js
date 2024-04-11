//declaration of variables and initial state
const unique = new Set();
let state = {};
const textInput = document.getElementById("text-input");
const addTodoForm = document.getElementById("add-todo-form");
const rmbtn = document.getElementById("remove-btn");
const ul = document.querySelector("ul");

//filter state: (default is all) open, done
const open = document.getElementById("open");
const done = document.getElementById("done");
const all = document.getElementById("all");

//initial state
let initialState = {
  todos: [
    {
      description: "create your first to-do",
      ID: Date.now(),
      done: false,
    },
  ],
  filter: "all",
};

// functions for state handling
function setState() {
  localStorage.setItem("AllMyTodos", JSON.stringify(state));
}

function getState() {
  if (JSON.parse(localStorage.getItem("AllMyTodos")) == null) {
    const state = initialState;
    return state;
  }
  const state = JSON.parse(localStorage.getItem("AllMyTodos"));
  return state;
}

//duplicate todos check: initialize set of unique todos
function initializeUnique() {
  for (item of state.todos) {
    unique.add(item.description.toLowerCase());
  }
}

//take user input and add it to the state, if it's not a duplicate
function addToState() {
  let description = textInput.value.trim();
  if (unique.has(description.toLowerCase())) {
    alert("Your todo already exists");
    textInput.value = "";
  } else {
    unique.add(description.toLowerCase());
    state.todos.push({ description, ID: Date.now(), done: false });
    setState();
    textInput.value = "";
  }
}

//remove todos from State and from duplicate check set
function removeCompletedTodos() {
  for (let i = state.todos.length - 1; i >= 0; i--) {
    if (state.todos[i].done) {
      unique.delete(state.todos[i].description);
      state.todos.splice(i, 1);
    }
  }
  setState();
}

function render() {
  ul.innerHTML = "";

  let filterFunction;
  if (state.filter == "open") {
    open.setAttribute("checked", "");
    filterFunction = (todo) => !todo.done;
  } else if (state.filter == "done") {
    done.setAttribute("checked", "");
    filterFunction = (todo) => todo.done;
  } else {
    all.setAttribute("checked", "");
    filterFunction = () => true;
  }

  state.todos.filter(filterFunction).forEach((todo) => {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "done";
    input.checked = todo.done;

    input.addEventListener("change", () => {
      todo.done = input.checked;
      setState();
    });
    const s = document.createElement("s");
    const span = document.createElement("span");

    if (todo.done) {
      s.textContent = todo.description;
      span.append(s);
    } else if (!todo.done) {
      span.textContent = todo.description;
    }

    const label = document.createElement("label");
    label.append(input, span);

    const form = document.createElement("form");
    form.append(label);

    const li = document.createElement("li");
    li.append(form);

    ul.append(li);
  });
}

//code that is executed when todo app loads
state = getState();
initializeUnique();
render();

//event handling
addTodoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addToState();
  render();
});

rmbtn.addEventListener("click", () => {
  removeCompletedTodos();
  render();
});

document.addEventListener("change", () => {
  if (open.checked) {
    state.filter = "open";
    console.log(state);
  } else if (done.checked) {
    state.filter = "done";
  } else {
    state.filter = "all";
  }
  setState();
  render();
});
