//declaration of variables and initial state
let state = {
  todos: [],
  filter: "all",
};

const textInput = document.getElementById("text-input");
const addTodoForm = document.getElementById("add-todo-form");
const rmbtn = document.getElementById("remove-btn");
const ul = document.querySelector("ul");
const div = document.querySelector("div");

//filter state: all (default), open, done
const open = document.getElementById("open");
const done = document.getElementById("done");
const all = document.getElementById("all");

//initial state
const initialState = {
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
  const rawSavedState = localStorage.getItem("AllMyTodos");

  if (!rawSavedState) {
    state = initialState;
  } else {
    state = JSON.parse(rawSavedState);
  }
}

// Call this every time the state changes
function onStateUpdate() {
  setState();
  render();
}

//take user input and add it to the state, if it's not a duplicate
function addToState() {
  const description = textInput.value.trim();
  if (
    state.todos.some((todo) => {
      return todo.description.toLowerCase() == description.toLowerCase();
    })
  ) {
    alert("Todo already exists");
    return;
  }
  state.todos.push({ description, ID: Date.now(), done: false });
  onStateUpdate();
  textInput.value = "";
}

//remove todos from State and from duplicate check set
function removeCompletedTodos() {
  for (let i = state.todos.length - 1; i >= 0; i--) {
    if (state.todos[i].done) {
      state.todos.splice(i, 1);
    }
  }

  state.todos = state.todos.filter((todo) => !todo.done);
  onStateUpdate();
}

function render() {
  ul.innerHTML = "";

  const todoListCls = ["todo-list-all", "todo-list-open", "todo-list-done"];

  let filterFunction;
  if (state.filter == "open") {
    open.setAttribute("checked", "");
    div.classList.remove(...todoListCls);
    div.classList.add("todo-list-open");
    addTodoForm.classList.remove("add-todo-form-done");
    addTodoForm.classList.add("add-todo-form");
    filterFunction = (todo) => !todo.done;
  } else if (state.filter == "done") {
    done.setAttribute("checked", "");
    div.classList.remove(...todoListCls);
    div.classList.add("todo-list-done");
    addTodoForm.classList.remove("add-todo-form");
    addTodoForm.classList.add("add-todo-form-done");
    filterFunction = (todo) => todo.done;
  } else {
    all.setAttribute("checked", "");
    filterFunction = () => true;
    div.classList.remove(...todoListCls);
    div.classList.add("todo-list-all");
    addTodoForm.classList.remove("add-todo-form-done");
    addTodoForm.classList.add("add-todo-form");
  }

  // const filterFunction =
  //   state.filter == "open"
  //     ? (t) => !t.done
  //     : state.filter == "done"
  //     ? (t) => t.done
  //     : () => true;

  state.todos?.filter(filterFunction).forEach((todo) => {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "done";
    input.checked = todo.done;

    input.addEventListener("change", () => {
      todo.done = input.checked;
      onStateUpdate();
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
    label.className = "each-todo";
    label.append(input, span);

    const form = document.createElement("form");
    form.append(label);

    const li = document.createElement("li");
    li.append(form);

    ul.append(li);
  });
}

//code that is executed when todo app loads
getState();
render();

//event handling
addTodoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addToState();
});

rmbtn.addEventListener("click", () => {
  removeCompletedTodos();
});

document.addEventListener("change", () => {
  if (open.checked) {
    state.filter = "open";
  } else if (done.checked) {
    state.filter = "done";
  } else {
    state.filter = "all";
  }
  onStateUpdate();
});
