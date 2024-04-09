const r = document.querySelector("#r");
const g = document.querySelector("#g");
const b = document.querySelector("#b");

//html changes
function render() {
  let allColor = "rgb(" + r.value + ", " + g.value + ", " + b.value + ")";
  let rgbaColor =
    "rgba(" + r.value + ", " + g.value + ", " + b.value + ", 0.3)";
  document.getElementById("rgb-heading").textContent = allColor;
  document.querySelector("main").style.background = allColor;
  document.querySelector("header").style.background = rgbaColor;
}

//event listeners
r.addEventListener("input", function () {
  render();
});
g.addEventListener("input", function () {
  render();
});
b.addEventListener("input", function () {
  render();
});
