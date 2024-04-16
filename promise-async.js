fetch("https://api.com/irgendwas")
  .then((res) => res.json())
  .then((data) => console.log(data));

async function fetchWithAsync() {
  const response = await fetch("https://api.com/irgendwas");
  const data = await response.json();
  console.log(data);
}

fetchWithAsync().then(() => console.log("fetchWithAsync Done"));
