window.addEventListener("load", function () {
  const button = document.getElementsByTagName("button")[0];
  button.addEventListener("click", function (event) {
    event.preventDefault();

    const form = document.getElementById("form");
    const elements = form.querySelectorAll("input");
    const error = document.getElementById("error");
    error.innerHTML = "";
    const user = {};
    let temp;
    elements.forEach((element) => {
      switch (element.type) {
        case "text":
          if (validateName(element.value)) {
            user.nombre = element.value;
            error.innerHTML = "";
          } else {
            error.innerHTML += "Nombre incorrecto<br>";
          }
          break;
        case "email":
          if (validateEmail(element.value)) {
            user.correo = element.value;
            temp = element.value;
            error.innerHTML = "";
          } else {
            error.innerHTML += "Dominio email incorrecto<br>";
          }
          break;
        case "password":
          if (validatePassword(element.value)) {
            user.password = element.value;
            error.innerHTML = "";
          } else {
            error.innerHTML += "La contraseña no válida<br>";
          }
          break;
        case "hidden":
          const domain = temp.substring(
            temp.indexOf("@") + 1,
            temp.indexOf(".")
          );
          if (domain.toLowerCase() == "student") {
            user.rol = "student";
          } else if (domain.toLowerCase() == "teacher") {
            user.rol = "teacher";
          } else {
            user.rol = "admin";
          }
          break;
      }
    });

    let users;
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      users = JSON.parse(storedUsers);
    } else {
      users = [];
    }

    let count = 0;
    users.forEach((element) => {
      if (element.correo == user.correo) {
        count++;
      }
    });

    //Object keys lo uso para saber el número de atributos totales del objeto user.
    if (Object.keys(user).length == 4 && count == 0) {
      users.push(user);
      error.innerHTML = "Registro hecho con éxito!";
      error.style.color = "green";
    } else {
      error.innerHTML = "Introduzca una contraseña";
      error.style.color = "red";
    }

    localStorage.setItem("users", JSON.stringify(users));
  });

  /*
al menos una letra minúscula
al menos una letra mayúscula
al menos un dígito (0-9) en la contraseña
al menos un carácter especial (@#$!%*?&)
la contraseña debe tener entre 8 y 15 caracteres
*/
  function validatePassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,15}$/;
    return regex.test(password);
  }

  function validateName(name) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(name);
  }

  //el dominio debe ser: @teacher.com, @student.com, @admin.com
  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@(student|teacher|admin)\.com$/;
    return regex.test(email);
  }
});
