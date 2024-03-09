let totalJugador = 0
let totalComputadora = 0
let cartaRecibida = 0
let controlOtraCarta = "si"
let switchControl = "Menú"
let cantidadFichas = 0
let cantidadFichasRestantes = "0"
let mensajeReglas21 =
  "¡Bienvenido a 21!\nLas reglas son simples, se entregará inicialmente una carta y podrás solicitar otra si lo deseas, el objetivo es obtener una suma menor o igual a 21.\n- Si acumulas 21, y la computadora también, gana la computadora.\n- Si te pasas de 21, gana la computadora.\n- Si sacas un número menor o igual a 21, pero mayor que la computadora, has ganado.\n- Si lo acumulado es menor a lo acumulado por la computadora, gana la computadora.\n \n¡Empecemos!"
let mensajeMenuJuegos =
  "Escriba el número correspondiente a la opción de juego que desea: \n1. Counter Strike (Próximamente)\n2. Blackjack o 21 (Beta)\n3. Valorant (Próximamente)"

while (true) {
  cantidadFichas = getCantidadFichas()
  cantidadFichasRestantes = cantidadFichas
  for (let i = 0; i < cantidadFichas; i++) {
    totalJugador = 0
    totalComputadora = 0
    switch (switchControl) {
      case "Menú":
        switchControl = prompt(
          mensajeMenuJuegos + "\n\nFichas restantes: " + cantidadFichasRestantes
        )
        i = i - 1
        break
      case "2":
        cantidadFichasRestantes = cantidadFichasRestantes - 1
        controlOtraCarta = "si"
        alert(mensajeReglas21)
        do {
          cartaRecibida = getRamdomCarta(1, 14)
          totalJugador = totalJugador + cartaRecibida
          controlOtraCarta = getRespuestaOtraCarta()
        } while (controlOtraCarta == "si" || controlOtraCarta == "sí")

        totalComputadora = getRamdomCarta(15, 22)
        alert("La computadora tiene " + totalComputadora)

        if (totalJugador > totalComputadora && totalJugador <= 21) {
          alert("Venciste a la computadora, ¡felicidades! 🎉")
          switchControl = "Menú"
        } else if (totalJugador >= 22) {
          alert("Perdiste versus la computadora, te pasaste de 21 😭")
          switchControl = "Menú"
        } else if (totalJugador <= totalComputadora) {
          alert("Perdiste versus la computadora, lo siento 🥺")
          switchControl = "Menú"
        } else {
          alert("Escenario no contemplado.")
        }

        break
      case "1":
        alert(
          "Estimado usuario, este juego aún se encuentra en desarrollo. Por favor intente con otra opción."
        )
        switchControl = "Menú"
        break
      case "3":
        alert(
          "Estimado usuario, este juego aún se encuentra en desarrollo. Por favor intente con otra opción."
        )
        switchControl = "Menú"
        break
      default:
        alert(
          "Valor ingresado no válido, debe ingresar un número de las opciones disponibles usuario mono."
        )
        switchControl = "Menú"
        break
    }
  }
  if (cantidadFichasRestantes === 0) {
    alert("Se han agotado la cantidad de fichas, vuelva otro día!")
    break
  }
}

//Función para devolver un número ramdom, que recibe límite inferior y límite superior
function getRamdomCarta(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

//Función para obtener el número de fichas que tendrá disponible el jugador
function getCantidadFichas() {
  let cantidadFichasInput = 0
  alert("¡Bienvenido a los minijuegos!")
  alert(
    "Antes de ingresar al menú de juegos, por favor ingrese el número de fichas que desea"
  )
  while (cantidadFichasInput === 0 || isNaN(cantidadFichasInput)) {
    cantidadFichasInput = Number(
      prompt("Por favor, solo ingresar números enteros")
    )
    if (isNaN(cantidadFichasInput)) {
      alert("Usuario mono, solo números enterors")
      cantidadFichasInput = 0
    } else if (cantidadFichasInput <= 0) {
      alert("Usuario mono, cantidad no válida")
      cantidadFichasInput = 0
    }
  }
  return cantidadFichasInput
}

//Función para validar que solo ingrese "Sí" o "No"
function getRespuestaOtraCarta() {
  let controlOtraCartaInput = ""
  while (controlOtraCartaInput == "") {
    controlOtraCartaInput = prompt(
      "Te salió " +
        cartaRecibida +
        " llevas acumlado " +
        totalJugador +
        ", ¿deseas otra carta? (Sí/No)"
    ).toLowerCase()
    if (
      controlOtraCartaInput != "si" &&
      controlOtraCartaInput != "no" &&
      controlOtraCartaInput != "sí"
    ) {
      alert("Usuario mono, valor ingresado no válido")
      controlOtraCartaInput = ""
    }
  }
  return controlOtraCartaInput
}
