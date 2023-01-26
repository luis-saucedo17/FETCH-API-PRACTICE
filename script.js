const getUsers = async (url = "https://reqres.in/api/users?delay=3") => {
  let fechaCaducidad = localStorage.getItem("fechaCaducidad");
  if (
    Object.is(null, fechaCaducidad) ||
    new Date().getTime() > fechaCaducidad
  ) {
    console.log("Fetch");
    try {
      let response = await fetch(url);
      let { data: users } = await response.json();
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("fechaCaducidad", new Date().getTime() + 60_000);
      insertUsers(users);
    } catch (error) {
      console.log(error);
    }
  } else {
    insertUsers(JSON.parse(localStorage.getItem("users")));
    console.log("Datos locales");
  }
};

const insertUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
  for (let user of users) {
    let container = document.querySelector(".container");
    const dom = document.createElement("div");
    dom.classList.add("principal-container");
    dom.innerHTML = `
    <p >${user.id}</p>
    <p >${user.first_name}</p>
    <p >${user.last_name}</p>
    <p >${user.email} </p>
    <img src="${user.avatar}" alt="profile picture">`;

    container.appendChild(dom);
  }
};
