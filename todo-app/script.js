const textInput = document.getElementById("text-input");
const btn = document.querySelector("button");
const ul = document.querySelector("ul");
const unique = new Set();

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

function render() {
  if (JSON.parse(localStorage.getItem("AllMyTodos")) !== null) {
    state = JSON.parse(localStorage.getItem("AllMyTodos"));
  }
  ul.innerHTML = "";

  state.todos.forEach((todo) => {
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

function addToState() {
  let inputValue = textInput.value.trim();
  if (unique.has(inputValue)) {
    return;
  } else {
    unique.add(inputValue);
    state.todos.push({ description: inputValue, ID: Date.now(), done: false });
    localStorage.setItem("AllMyTodos", JSON.stringify(state));
  }
}
console.log(unique);
render();

//determine changes in state
btn.addEventListener("click", () => {
  addToState();
  render();
});

document.addEventListener("reset", () => {
  localStorage.getItem("AllMyTodos");
  state = JSON.parse(localStorage.getItem("AllMyTodos"));
});
