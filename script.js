let totalJugador = 0;
let totalComputadora = 0;
let cartaRecibida = 0;
let controlOtraCarta = "si";
let switchControl = "Menú";
let switchControlLogin = "Principal";
let cantidadFichas = 0;
let cantidadFichasRestantes = "0";
let reglas21 =
  "Las reglas son simples, se entregará inicialmente una carta y podrás solicitar otra si lo deseas, el objetivo es obtener una suma menor o igual a 21.\n- Si acumulas 21, y la computadora también, gana la computadora.\n- Si te pasas de 21, gana la computadora.\n- Si sacas un número menor o igual a 21, pero mayor que la computadora, has ganado.\n- Si lo acumulado es menor a lo acumulado por la computadora, gana la computadora.";
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

while (salir === 0) {
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
}

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

// Función para generar un nuevo idUsuario autoincremental
function generarIdUsuario() {
  if (usuarios.length === 0) {
    return 1;
  } else {
    return usuarios[usuarios.length - 1].idUsuario + 1;
  }
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

//Función para obtener el nick
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

//Función para obtener el nick
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
//Función para validar password en inicio de sesión

//Función para inicio de sesión
function validarContraseña() {
  let password = getPassword();
  let existePassword = usuarios.find(
    (nuevoUsuario) =>
      (nuevoUsuario.nick = nickSesion && nuevoUsuario.password === password)
  );
  while (!existePassword) {
    alert("El nick ingresado no existe o es incorrecto. Vuelva a intentar");
    password = getPassword();
    existePassword = usuarios.find(
      (nuevoUsuario) =>
        (nuevoUsuario.nick = nickSesion && nuevoUsuario.password === password)
    );
  }
  return password;
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
