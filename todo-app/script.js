const textInput = document.getElementById("text-input");
const btn = document.getElementById("add-btn");
const rmbtn = document.getElementById("remove-btn");
const ul = document.querySelector("ul");

//filter state: (default is all) open, done
const open = document.getElementById("open");
const done = document.getElementById("done");

//initial state
let initialState = {
  todos: [
    {
      description: "create your first to-do",
      ID: Date.now(),
      done: false,
    },
  ],
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

//duplicate todos check
const unique = new Set();
const state = getState();
for (item of state.todos) {
  unique.add(item.description);
}

//take user input and add it to the state
function addToState() {
  let description = textInput.value.trim();
  if (unique.has(description)) {
    return;
  } else {
    unique.add(description);
    getState();
    state.todos.push({ description, ID: Date.now(), done: false });
    setState();
    console.log(state);
  }
}

//remove todos from State
function removeFromState() {
  getState();
  for (let i = state.todos.length - 1; i >= 0; i--) {
    if (state.todos[i].done) {
      state.todos.splice(i, 1);
    }
  }
  setState();
}

function render() {
  getState();
  ul.innerHTML = "";

  let filterFunction;
  if (open.checked) {
    filterFunction = (todo) => !todo.done;
  } else if (done.checked) {
    filterFunction = (todo) => todo.done;
  } else {
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

    const span = document.createElement("span");
    span.textContent = todo.description;

    const label = document.createElement("label");
    label.append(input, span);

    const form = document.createElement("form");
    form.append(label);

    const li = document.createElement("li");
    li.append(form);

    ul.append(li);
  });
}

render();

//event handling
btn.addEventListener("click", () => {
  addToState();
  render();
});

rmbtn.addEventListener("click", () => {
  removeFromState();
  render();
});

document.addEventListener("reset", () => {
  const state = getState();
});

document.addEventListener("change", () => {
  render();
});
