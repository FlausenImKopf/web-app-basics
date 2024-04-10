const textInput = document.getElementById("text-input");
const btn = document.getElementById("add-btn");
const rmbtn = document.getElementById("remove-btn");
const ul = document.querySelector("ul");

//filter state: all, open, done

const all = document.getElementById("all");
const open = document.getElementById("open");
const done = document.getElementById("done");

//state
let state = {
  todos: [
    {
      description: "create your first to-do",
      ID: Date.now(),
      done: false,
    },
  ],
};

function setState() {
  localStorage.setItem("AllMyTodos", JSON.stringify(state));
}

function getState() {
  if (JSON.parse(localStorage.getItem("AllMyTodos")) == null) {
    return state;
  }
  state = JSON.parse(localStorage.getItem("AllMyTodos"));
}
//create unique set full of todo-strings from initial state or local storage

const unique = new Set();
getState();
for (item of state.todos) {
  unique.add(item.description);
}
console.log(unique);

//take user input and add it to the state
function addToState() {
  let description = textInput.value.trim();
  if (unique.has(description)) {
    return;
  } else {
    unique.add(description);
    state.todos.push({ description, ID: Date.now(), done: false });
    setState();
  }
}

function removeFromState() {
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
      localStorage.setItem("AllMyTodos", JSON.stringify(state));
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

console.log(unique);
render();

//determine changes in state
btn.addEventListener("click", () => {
  addToState();
  render();
});

rmbtn.addEventListener("click", () => {
  removeFromState();
  console.log(state);
  render();
});

document.addEventListener("reset", () => {
  getState();
});

document.addEventListener("change", () => {
  render();
});
