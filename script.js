let totalJugador = 0;
let totalComputadora = 0;
let cartaRecibida = 0;
let controlOtraCarta = "si";
let switchControl = "Menú";
let switchControlLogin = "Principal";
let cantidadFichas = 0;
let cantidadFichasRestantes = "0";
let mensajeMenuJuegos =
  "Escriba el número correspondiente a la opción de que desea: \n1. Nueva partida\n2. Revisar reglas.";

let sesionActiva = 0;
let nickSesion = "";
let passwordSesion = "";
let salir = 0;
let resultadoPartidaUsuario = "";
let idUsuarioSesion = "";

let fechaHoraActual = new Date();
let dia = fechaHoraActual.getDate();
let mes = fechaHoraActual.getMonth() + 1;
let anio = fechaHoraActual.getFullYear();

let usuarios = [];
let historial = [];

/* while (salir === 0) {
  switch (switchControlLogin) {
    case "Principal":
      if (sesionActiva === 0) {
        let option = getOptionLogin();
        if (option === 1) {
          nickSesion = validarNickExiste();
          passwordSesion = validarContraseña();
          idUsuarioSesion = getIdUsuario();
          sesionActiva = 1;
          switchControlLogin = "Sesion";
        } else if (option === 2) {
          registrarUsuario();
        } else if (option === 3) {
          alert(
            "A continuación ingrese el nick o alias del que desea revisar el historial de partidas"
          );
          let nickBuscar = getNick();
          let historialUsuario = historial
            .filter(function (item) {
              return item.nick === nickBuscar;
            })
            .map(function (item) {
              return `Fecha: ${item.fecha} | Jugador: ${item.puntajeJugador} | Computadora: ${item.puntajeComputadora} | Resultado: ${item.resultadoPartida}`;
            })
            .join("\n");
          alert(
            "Historial de partidas para " +
              nickSesion +
              "\n\n" +
              historialUsuario
          );
        } else if (option === 4) {
          switchControlLogin = "Salir";
        }
      }
      break;
    case "Sesion":
      alert("¡Bienvenido " + nickSesion + "!");
      while (sesionActiva == 1) {
        cantidadFichas = getCantidadFichas();
        cantidadFichasRestantes = cantidadFichas;
        for (let i = 0; i < cantidadFichas; i++) {
          totalJugador = 0;
          totalComputadora = 0;
          switch (switchControl) {
            case "Menú":
              switchControl = prompt(
                mensajeMenuJuegos +
                  "\n\nFichas restantes: " +
                  cantidadFichasRestantes
              );
              i = i - 1;
              break;
            case "1":
              cantidadFichasRestantes = cantidadFichasRestantes - 1;
              controlOtraCarta = "si";
              do {
                cartaRecibida = getRamdomCarta(1, 14);
                totalJugador = totalJugador + cartaRecibida;
                controlOtraCarta = getRespuestaOtraCarta();
              } while (controlOtraCarta == "si" || controlOtraCarta == "sí");

              totalComputadora = getRamdomCarta(15, 22);
              alert("La computadora tiene " + totalComputadora);

              if (totalJugador > totalComputadora && totalJugador <= 21) {
                alert("Venciste a la computadora, ¡felicidades! 🎉");
                resultadoPartidaUsuario = "Victoria";
                switchControl = "Menú";
              } else if (totalJugador >= 22) {
                alert("Perdiste versus la computadora, te pasaste de 21 😭");
                resultadoPartidaUsuario = "Derrota";
                switchControl = "Menú";
              } else if (totalJugador <= totalComputadora) {
                alert("Perdiste versus la computadora, lo siento 🥺");
                resultadoPartidaUsuario = "Derrota";
                switchControl = "Menú";
              } else {
                alert("Escenario no contemplado.");
              }
              guardarHistorial();
              break;
            case "2":
              alert(reglas21);
              i = i - 1;
              switchControl = "Menú";
              break;
            default:
              alert(
                "Valor ingresado no válido, debe ingresar un número de las opciones disponibles usuario mono."
              );
              i = i - 1;
              switchControl = "Menú";
              break;
          }
        }
        if (cantidadFichasRestantes === 0) {
          alert(
            "Se han agotado la cantidad de fichas, vuelva a iniciar sesión para conseguir más fichas!"
          );
          switchControlLogin = "Principal";
          sesionActiva = 0;
        }
      }
      break;
    default:
      alert("¡Gracias por jugar 21! Esperamos vuelva pronto");
      salir = 1;
      break;
  }
} */

//Función para devolver un número ramdom, que recibe límite inferior y límite superior
function getRamdomCarta(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//Función para obtener el número de fichas que tendrá disponible el jugador
function getCantidadFichas() {
  let cantidadFichasInput = 0;
  alert(
    "Antes de empezar a jugar, por favor ingrese el número de fichas que desea utilizar. Cada ficha representa el número de veces que jugará a 21."
  );
  while (cantidadFichasInput === 0 || isNaN(cantidadFichasInput)) {
    cantidadFichasInput = Number(
      prompt("Por favor, solo ingresar números enteros")
    );
    if (isNaN(cantidadFichasInput)) {
      alert("Usuario mono, solo números enteros");
      cantidadFichasInput = 0;
    } else if (cantidadFichasInput <= 0) {
      alert("Usuario mono, cantidad no válida");
      cantidadFichasInput = 0;
    }
  }
  return cantidadFichasInput;
}

//Función para validar que solo ingrese "Sí" o "No"
function getRespuestaOtraCarta() {
  let controlOtraCartaInput = "";
  while (controlOtraCartaInput == "") {
    controlOtraCartaInput = prompt(
      "Te salió " +
        cartaRecibida +
        " llevas acumulado " +
        totalJugador +
        ", ¿deseas otra carta? (Sí/No)"
    ).toLowerCase();
    if (
      controlOtraCartaInput != "si" &&
      controlOtraCartaInput != "no" &&
      controlOtraCartaInput != "sí"
    ) {
      alert("Usuario mono, valor ingresado no válido");
      controlOtraCartaInput = "";
    }
  }
  return controlOtraCartaInput;
}

//Función para obtener un valor válido para edad
function getEdad() {
  let edadInput = 0;
  while (edadInput === 0 || isNaN(edadInput)) {
    edadInput = Number(prompt("Ingrese su edad, solo números enteros."));
    if (isNaN(edadInput)) {
      alert("Usuario mono, solo números enteros");
      edadInput = 0;
    } else if (edadInput <= 0) {
      alert("Usuario mono, cantidad no válida");
      edadInput = 0;
    }
  }
  return edadInput;
}

//Función para validar que ingrese una opción válida en Login
function getOptionLogin() {
  let optionInput = 0;
  while (optionInput === 0 || isNaN(optionInput)) {
    optionInput = Number(
      prompt(
        "¡Bienvenido a 21!\n\nPor favor inicie sesión o regístrese para poder jugar:\n1. Iniciar sesión\n2. Registrarse\n3. Historial de partidas\n\n\n4. Salir"
      )
    );
    if (
      optionInput != "1" &&
      optionInput != "2" &&
      optionInput != "3" &&
      optionInput != "4"
    ) {
      alert("Usuario mono, entrada no válida");
      optionInput = 0;
    }
  }
  return optionInput;
}

//Función para obtener el nombre
function getnombre() {
  let nombreInput = prompt("Ingrese su nombre");
  while (!nombreInput || nombreInput.trim() === "") {
    alert(
      "El nombre no puede estar en blanco. Por favor, ingrese un nombre válido."
    );
    nombreInput = prompt("Ingrese su nombre:");
  }
  return nombreInput;
}

//Función para obtener el apellido
function getApellido() {
  let apellidoInput = prompt("Ingrese su apellido");
  while (!apellidoInput || apellidoInput.trim() === "") {
    alert(
      "El apellido no puede estar en blanco. Por favor, ingrese un apellido válido."
    );
    apellidoInput = prompt("Ingrese su apellido:");
  }
  return apellidoInput;
}

//Función para registrar nuevo usuario
function registrarUsuario() {
  let nombre = getnombre();
  let apellido = getApellido();
  let edad = getEdad();
  let nick = validarNickUnico();
  let password = getPassword();
  let nuevoUsuario = {
    idUsuario: generarIdUsuario(),
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    nick: nick,
    password: password,
  };

  usuarios.push(nuevoUsuario);
  alert("Registro exitoso. Vuelve al menú principal para que inicies sesión.");
  switchControlLogin = "Principal";
}

//Función para devolver el idUsuario en sesión
function getIdUsuario() {
  let idUsuarioSesion = usuarios.find(
    (nuevoUsuario) =>
      (nuevoUsuario.nick =
        nickSesion && nuevoUsuario.password === passwordSesion)
  );
  return idUsuarioSesion;
}

//Función para guardar historial de un usuario
function guardarHistorial() {
  let nick = nickSesion;
  let fecha = `${dia}/${mes}/${anio}`;
  let puntajeJugador = totalJugador;
  let puntajeComputadora = totalComputadora;
  let resultadoPartida = resultadoPartidaUsuario;
  let historialUsuario = {
    nick: nick,
    fecha: fecha,
    puntajeJugador: puntajeJugador,
    puntajeComputadora: puntajeComputadora,
    resultadoPartida: resultadoPartida,
  };

  historial.push(historialUsuario);
}

/* const suits = ["♠", "♡", "♢", "♣"];
const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const container = document.body;

for (const suit of suits) {
  for (const rank of ranks) {
    const card = document.createElement("div");
    card.classList.add("card", "spades");
    card.innerHTML = `<div class="card-content">${rank} ${suit}</div>`;
    container.appendChild(card);
  }
} */

/* let buttonLogin = document.getElementById("buttonLogin");
buttonLogin.addEventListener("click", () => validarContraseña(user, password));
 */
//Función para inicio de sesión
function validarContraseña() {
  let password = getPassword();
  let existePassword = usuarios.find(
    (nuevoUsuario) =>
      (nuevoUsuario.nick = nickSesion && nuevoUsuario.password === password)
  );
  while (!existePassword) {
    alert(
      "El la contraseña ingresada no existe o es incorrecto. Vuelva a intentar"
    );
    password = getPassword();
    existePassword = usuarios.find(
      (nuevoUsuario) =>
        (nuevoUsuario.nick = nickSesion && nuevoUsuario.password === password)
    );
  }
  return password;
}

//Función para obtener contraseña
function getPassword() {
  let passwordInput = prompt("Ingrese su contraseña");
  while (!passwordInput || passwordInput.trim() === "") {
    alert(
      "La contraseña no puede estar en blanco. Por favor, ingrese una contraseña válida."
    );
    passwordInput = prompt("Ingrese su contraseña");
  }
  return passwordInput;
}

//Función para validar nick en inicio de sesión
function validarNickExiste() {
  let nick = getNick();
  let existeNick = usuarios.find((nuevoUsuario) => nuevoUsuario.nick === nick);
  while (!existeNick) {
    alert("El nick ingresado no existe o es incorrecto. Vuelva a intentar");
    nick = getNick();
    existeNick = usuarios.find((nuevoUsuario) => nuevoUsuario.nick === nick);
  }
  return nick;
}

//Función para validar que el nick no exista
function validarNickUnico() {
  let nick = getNick();
  let existeNick = usuarios.find((nuevoUsuario) => nuevoUsuario.nick === nick);
  while (existeNick) {
    alert("Ya existe ese nick, ingrese uno diferente");
    nick = getNick();
    existeNick = usuarios.find((nuevoUsuario) => nuevoUsuario.nick === nick);
  }
  return nick;
}

//Función para obtener el nick
function getNick() {
  let nickInput = prompt("Ingrese su nick o alias");
  while (!nickInput || nickInput.trim() === "") {
    alert(
      "El nick o alias no puede estar en blanco. Por favor, ingrese un nick válido."
    );
    nickInput = prompt("Ingrese su nick o alias:");
  }
  return nickInput;
}

function verificarCamposLlenos() {
  var inputs = document.querySelectorAll(
    '#formLogin input[type="text"],#formLogin input[type="password"]'
  );
  var todosLlenos = true;
  inputs.forEach(function (input) {
    var errorMessage = input.nextElementSibling;
    if (input.value === "") {
      errorMessage.style.display = "block";
      todosLlenos = false;
    } else {
      errorMessage.style.display = "none";
    }
  });
  return todosLlenos;
}

// Función para validar el usuario y la contraseña
function validarUsuarioYContraseña(usuario, contraseña) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].nick === usuario && usuarios[i].password === contraseña) {
      return true; // Usuario y contraseña válidos
    }
  }
  return false; // Usuario y contraseña inválidos
}

// Función que se ejecuta cuando se intenta enviar el formulario
function onSubmitFormLogin(event) {
  event.preventDefault();
  if (!verificarCamposLlenos()) {
    return; // Detener la ejecución si los campos están vacíos
  } else {
    let usuario = document.getElementById("userLogin").value;
    let contraseña = document.getElementById("passwordLogin").value;
    localStorage.removeItem("usuario");

    // Validar el usuario y la contraseña
    if (validarUsuarioYContraseña(usuario, contraseña)) {
      // Acción en caso de usuario y contraseña válidos
      document.getElementById("pageInicial").style.display = "none";
      document.getElementById("pageStartGame").style.display = "flex";
      localStorage.setItem("usuario", usuario);
      document.getElementById("welcomeUser").textContent =
        "¡Bienvenido a Blackjack, " + usuario + "!";
      // Aquí podrías redirigir a otra página o realizar otras acciones
    } else {
      // Acción en caso de usuario y contraseña inválidos
      messageLoginError.style.display = "block";
      document.getElementById("formLogin").reset();
    }
  }
}
// Agregar el evento submit al formulario
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("formSignin")
    .addEventListener("submit", onSubmitFormSignin);
});

document.addEventListener("DOMContentLoaded", function () {
  // Asociar la función onSubmitForm al evento submit del formulario
  document
    .getElementById("formLogin")
    .addEventListener("submit", onSubmitFormLogin);
});

/* Registro de usuario */
// Función para generar un nuevo idUsuario autoincremental
function generarIdUsuario() {
  if (usuarios.length === 0) {
    return 1;
  } else {
    return usuarios[usuarios.length - 1].idUsuario + 1;
  }
}

// Función para validar si un campo de texto contiene solo letras
function validarTexto(texto) {
  return /^[a-zA-Z]+$/.test(texto.trim());
}

// Función para validar todos los campos del formulario
function validarCampos() {
  let nombre = document.getElementById("name").value.trim();
  let apellido = document.getElementById("surname").value.trim();
  let usuario = document.getElementById("user").value.trim();
  let password = document.getElementById("password").value.trim();
  let errores = [];

  if (!nombre) {
    document.getElementById("nameEmpty").style.display = "block";
    document.getElementById("nameInvalid").style.display = "none";
    errores.push("El campo de nombre no puede estar vacío.");
  } else if (!validarTexto(nombre)) {
    document.getElementById("nameInvalid").style.display = "block";
    document.getElementById("nameEmpty").style.display = "none";
  } else {
    document.getElementById("nameEmpty").style.display = "none";
    document.getElementById("nameInvalid").style.display = "none";
  }

  if (!apellido) {
    document.getElementById("surnameEmpty").style.display = "block";
    document.getElementById("nameInvalid").style.display = "none";
    errores.push("El campo de apellido no puede estar vacío.");
  } else if (!validarTexto(apellido)) {
    document.getElementById("surnameInvalid").style.display = "block";
    document.getElementById("surnameEmpty").style.display = "none";
    errores.push("El campo de apellido solo puede contener letras.");
  } else {
    document.getElementById("surnameEmpty").style.display = "none";
    document.getElementById("surnameInvalid").style.display = "none";
  }

  if (!usuario) {
    document.getElementById("userEmpty").style.display = "block";
    errores.push("El campo de usuario no puede estar vacío.");
  } else {
    document.getElementById("userEmpty").style.display = "none";
  }

  if (!password) {
    document.getElementById("passwordEmpty").style.display = "block";
    errores.push("El campo de contraseña no puede estar vacío.");
  } else {
    document.getElementById("passwordEmpty").style.display = "none";
  }

  return errores.length;
}

// Función para manejar el envío del formulario
function onSubmitFormSignin(event) {
  event.preventDefault();
  let nombre = document.getElementById("name").value.trim();
  let apellido = document.getElementById("surname").value.trim();
  let usuario = document.getElementById("user").value.trim();
  let password = document.getElementById("password").value.trim();
  let nickExistente = usuarios.find(function (user) {
    return user.nick === usuario;
  });
  if (validarCampos() > 0) {
    return;
  } else if (nickExistente) {
    document.getElementById("userNoUnique").style.display = "block";
    return;
  } else {
    let nuevoUsuario = {
      idUsuario: generarIdUsuario(),
      nombre: nombre,
      apellido: apellido,
      nick: usuario,
      password: password,
    };

    usuarios.push(nuevoUsuario);

    // Limpiar el formulario después del registro

    document.getElementById("messageSiginSuccess").style.display = "block";
    document.getElementById("formSignin").reset();
    document.getElementById("userNoUnique").style.display = "none";
    localStorage.removeItem("usuario");
  }

  // Validar si el nick ya está en uso
}

document.addEventListener("DOMContentLoaded", function () {
  // Obtener el enlace por su ID
  let enlace = document.getElementById("optionSignin");

  enlace.addEventListener("click", function (event) {
    event.preventDefault();

    document.getElementById("cardSignin").style.display = "flex";
    document.getElementById("cardLogin").style.display = "none";
    document.getElementById("formSignin").reset();
    messageLoginError.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Obtener el enlace por su ID
  let enlace = document.getElementById("optionLogin");

  enlace.addEventListener("click", function (event) {
    event.preventDefault();

    document.getElementById("cardSignin").style.display = "none";
    document.getElementById("cardLogin").style.display = "flex";
    document.getElementById("formSignin").reset();
    messageSiginSuccess.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Agregar un listener de eventos al botón
  let enlace = document.getElementById("logout");

  enlace.addEventListener("click", function (event) {
    event.preventDefault();
    // Limpiar el almacenamiento local
    localStorage.removeItem("usuario");
    document.getElementById("pageInicial").style.display = "flex";
    document.getElementById("pageStartGame").style.display = "none";
    document.getElementById("formLogin").reset();
  });
});
