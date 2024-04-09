const counter = document.querySelector("#clickableNumberArea");
const reset = document.querySelector("#btn");
let clickCount = 0;

function render() {
  document.getElementById("counter").textContent = clickCount;
  let percentageOfClickCount = (clickCount % 100) + "%";
  document.querySelector(
    "main"
  ).style.background = `linear-gradient(0.25turn, #f6cb0d ${percentageOfClickCount}, #ffffff ${percentageOfClickCount})`;
}

counter.addEventListener("click", () => {
  clickCount++;
  render();
});
document.addEventListener("keydown", (event) => {
  if (event.key === " " || event.key === "Enter") {
    clickCount++;
    render();
  }
});
reset.addEventListener("click", () => {
  clickCount = 0;
  render();
});
