let totalJugador = 0;
let totalComputadora = 0;
let cartaRecibida = 0;
let controlOtraCarta = true;
let cantidadFichas = 0;
let cantidadFichasRestantes = "0";

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
let cartasSeleccionadas = [];

let usuarioAdmin = {
  idUsuario: 0,
  nombre: "Leandro",
  apellido: "Guerrero",
  nick: "Snake",
  password: "123",
};

usuarios.push(usuarioAdmin);

const cartas = [];

const palos = ["Corazones", "Diamantes", "Tréboles", "Picas"];
const valores = [
  "As",
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
const valoresNumerico = {
  As: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
};

// Crear las 52 cartas
for (let palo of palos) {
  for (let valor of valores) {
    cartas.push({
      palo: palo,
      valor: valor,
      valorNumerico: valoresNumerico[valor],
    });
  }
}

//Función para devolver un número ramdom, que recibe límite inferior y límite superior
function getRamdomCarta(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/* Verificar campos llenos */
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

// Función para validar el inicio de sesión
function validarUsuarioYContraseña(usuario, contraseña) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].nick === usuario && usuarios[i].password === contraseña) {
      return true;
    }
  }
  return false;
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
      document.getElementById("pageInicial").style.display = "none";
      document.getElementById("pageStartGame").style.display = "flex";
      localStorage.setItem("usuario", usuario);
      document.getElementById("welcomeUser").textContent =
        "¡Bienvenido a Blackjack, " + usuario + "!";
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

/* Ingreso de fichas */
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("getFichas").addEventListener("click", function () {
    let getFichaInput = document.getElementById("fichasMount").value;
    let mensajeError = document.getElementById("fichasInvalid");
    let mountFichasValid = /^[1-9]\d*$/.test(getFichaInput);

    if (mountFichasValid) {
      // Si el número es válido, guardamos el valor en una variable
      cantidadFichas = parseInt(getFichaInput);
      mensajeError.style.display = "none";
      document.getElementById("fichasMenu").style.display = "none";
      document.getElementById("levelMenu").style.display = "flex";
      updateFichasRests(cantidadFichas);
      renderDealers();
    } else {
      // Si el número no es válido, mostramos el mensaje de error
      mensajeError.style.display = "block";
    }
  });
});

function getDealers() {
  return [
    {
      id: 1,
      nombre: "Juan García",
      level: "Amateur",
      wins: 2,
      defeats: 20,
      rutaImagen: "dealer_1.jpg",
    },
    {
      id: 2,
      nombre: "Constantino Hernandez",
      level: "Veterano",
      wins: 35,
      defeats: 18,
      rutaImagen: "dealer_2.jpg",
    },
    {
      id: 3,
      nombre: "Lucinda Reyes",
      level: "Avanzado",
      wins: 60,
      defeats: 12,
      rutaImagen: "dealer_3.jpg",
    },
  ];
}

let dealers = getDealers();

function renderDealers() {
  let contenedor = document.getElementById("containerCardDealers");
  contenedor.innerHTML = "";
  dealers.forEach(({ id, nombre, level, wins, defeats, rutaImagen }) => {
    let cardDealer = document.createElement("div");
    cardDealer.className = "card-dealer";
    cardDealer.id = `${id}`;

    cardDealer.innerHTML = `
  <span class="levelGame">${level}</span>
  <div class="imgDealer"></div>
  <h3>${nombre}</h3>
  <div class="infoDealerStats">
    <span><b>Victorias: </b>${wins}</span>
    <span><b>Derrotas: </b>${defeats}</span>
  </div>
`;
    cardDealer.querySelector(
      ".imgDealer"
    ).style.backgroundImage = `url(./img/dealers/${rutaImagen})`;
    contenedor.append(cardDealer);
  });
  let opciones = document.querySelectorAll(".card-dealer");
  let guardarBoton = document.getElementById("getLevel");
  let idSeleccionado = null;

  opciones.forEach(function (opcion) {
    opcion.addEventListener("click", function () {
      // Eliminar la clase 'selected' de todas las opciones
      opciones.forEach(function (opcion) {
        opcion.classList.remove("card-dealer-selected");
      });

      // Agregar la clase 'selected' a la opción seleccionada
      this.classList.add("card-dealer-selected");
      // Guardar el ID de la opción seleccionada
      idSeleccionado = this.id;
    });
  });
  guardarBoton.addEventListener("click", function () {
    if (idSeleccionado) {
      if (cantidadFichas == 0) {
        alert("Te has quedado sin fichas");
      } else {
        document.getElementById("levelEmpty").style.display = "none";
        document.getElementById("fichasMenu").style.display = "none";
        document.getElementById("levelMenu").style.display = "none";
        document.getElementById("tableGame").style.display = "flex";
        cantidadFichas--;
        playGame(idSeleccionado);
        document
          .getElementById("getCarta")
          .addEventListener("click", getAnotherCard);
        document
          .getElementById("getResult")
          .addEventListener("click", getMessageResult);
        document.getElementById("buttonsGamePrincipal").style.display = "flex";
        document.getElementById("buttonGameAgain").style.display = "none";
      }
    } else {
      document.getElementById("levelEmpty").style.display = "block";
    }
  });
}

let levelDificult;

function playGame(levelGame) {
  if (levelGame == 1) {
    totalComputadora = getRamdomCarta(1, 22);
  } else if (levelGame == 2) {
    totalComputadora = getRamdomCarta(10, 22);
  } else if (levelGame == 3) {
    totalComputadora = getRamdomCarta(17, 22);
  }
  totalJugador = +seleccionarCarta();
}
function seleccionarCarta() {
  let indiceAleatorio = Math.floor(Math.random() * cartas.length);
  let cartaSeleccionada = cartas.splice(indiceAleatorio, 1)[0];
  let valorCarta = cartaSeleccionada.valorNumerico;
  cartasSeleccionadas.push(cartaSeleccionada);
  // Retornar el valor de la carta seleccionada
  renderCards(cartasSeleccionadas);
  return valorCarta;
}

function renderCards(cartasSeleccionadas) {
  let contenedor = document.getElementById("containerCards");
  contenedor.innerHTML = "";
  cartasSeleccionadas.forEach(({ palo, valor }) => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <div class="card-header">
      ${valor}
    </div>
    <div class="card-body">
      <p>${palo}</p>
    </div>
    <div class="card-footer">
      ${valor}
    </div>
`;
    contenedor.appendChild(card);
  });
}

function getAnotherCard() {
  totalJugador += seleccionarCarta();
  console.log(totalJugador);
  if (totalJugador >= 22) {
    document.getElementById("messageMore21").style.display = "block";
  }
}

function updateFichasRests(cantidadFichas) {
  var spanElement = document.getElementById("fichasRest");
  spanElement.textContent = cantidadFichas;
}

function updateScoreDealer(totalComputadora) {
  var spanElement = document.getElementById("scoreDealer");
  spanElement.textContent = totalComputadora;
}

function getMessageResult() {
  if (totalJugador === totalComputadora) {
    document.getElementById("messageMore21").style.display = "none";
    document.getElementById("messageLostVsDealer").style.display = "block";
    document.getElementById("messageWin").style.display = "none";
  } else if (totalJugador > totalComputadora) {
    document.getElementById("messageMore21").style.display = "none";
    document.getElementById("messageLostVsDealer").style.display = "none";
    document.getElementById("messageWin").style.display = "block";
  }
  document.getElementById("buttonsGamePrincipal").style.display = "none";
  let buttonAgain = document.getElementById("buttonGameAgain");
  buttonAgain.style.display = "block";
  buttonAgain.addEventListener("click", gameAgain);

  updateScoreDealer(totalComputadora);
}

function gameAgain() {
  cartasSeleccionadas = [];
  totalComputadora = 0;
  totalJugador = 0;
  document.getElementById("levelMenu").style.display = "flex";
  document.getElementById("tableGame").style.display = "none";
  updateFichasRests(cantidadFichas);
  renderDealers();
}
