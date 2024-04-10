const textInput = document.getElementById("text-input");
const btn = document.getElementById("add-btn");
const rmbtn = document.getElementById("remove-btn");
const ul = document.querySelector("ul");
const unique = new Set();
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

//take data from state and create todo checkboxes
// function render() {
//   if (JSON.parse(localStorage.getItem("AllMyTodos")) !== null) {
//     state = JSON.parse(localStorage.getItem("AllMyTodos"));
//   }
//   ul.innerHTML = "";

//   state.todos.forEach((todo) => {
//     const input = document.createElement("input");
//     input.type = "checkbox";
//     input.name = "done";
//     input.checked = todo.done;

//     input.addEventListener("change", () => {
//       todo.done = input.checked;
//       localStorage.setItem("AllMyTodos", JSON.stringify(state));
//     });

//     const span = document.createElement("span");
//     span.textContent = todo.description;

//     const label = document.createElement("label");
//     label.append(input, span);

//     const form = document.createElement("form");
//     form.append(label);

//     const li = document.createElement("li");
//     li.append(form);

//     ul.append(li);
//   });
// }

//take user input and add it to the state
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

function removeFromState() {
  for (let i = state.todos.length - 1; i >= 0; i--) {
    if (state.todos[i].done) {
      state.todos.splice(i, 1);
    }
  }
  localStorage.setItem("AllMyTodos", JSON.stringify(state));
}

function render() {
  if (JSON.parse(localStorage.getItem("AllMyTodos")) !== null) {
    state = JSON.parse(localStorage.getItem("AllMyTodos"));
  }
  ul.innerHTML = "";
  if (open.checked) {
    state.todos.forEach((todo) => {
      if (todo.done === false) {
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
      }
    });
  } else if (done.checked) {
    state.todos.forEach((todo) => {
      if (todo.done) {
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
      }
    });
  } else {
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
}

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
  localStorage.getItem("AllMyTodos");
  state = JSON.parse(localStorage.getItem("AllMyTodos"));
});

document.addEventListener("change", () => {
  render();
});
