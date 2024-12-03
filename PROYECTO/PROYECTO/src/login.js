window.addEventListener("load", function () {
  const button = document.getElementsByTagName("button")[0];
  button.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");
    error.innerHTML = "";
    const users = JSON.parse(localStorage.getItem("users"));
    users.forEach((element) => {
      if (element.correo == email && element.password == password) {
        error.innerHTML = "Login con éxito!";
        error.style.color = "green";
        if (element.rol == "admin") {
          window.location = "admin/admin-dashboard.html";
        }
      } else {
        error.innerHTML = "Incorrect user or password!";
        error.style.color = "red";
      }
    });
  });
});
