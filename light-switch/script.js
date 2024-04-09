const btn = document.querySelector("#lumos");

btn.addEventListener("click", function () {
  if (document.body.classList.contains("dark")) {
    document.body.classList.remove("dark");
    document.title = "Good Morning";
  } else {
    document.body.classList.add("dark");
    document.title = "Good Night";
  }
});
