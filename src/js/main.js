'use strict';
'use strict';
//Elementos HTML
//Botón de jugar
const button = document.querySelector('.js-button');
//Input select
const userSelect = document.querySelector('.js-select');
//Texto con el resultado
const textResult = document.querySelector('.js-result');
//Contador usuario
const userCounter = document.querySelector('.js-userCounter');
//Contador computadora
const computerCounter = document.querySelector('.js-computerCounter');
//Boton de reset
const resetButton = document.querySelector('.js-reset');
//Emojis
const emojisContainer = document.querySelector('.js-containerEmoji');
//Variables para los contadores
let totalCounter = 0;
let countUserResult = 0;
let countComputerResult = 0;

//Funciones complementarias al Handler
function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}
function getUserElement() {
  //Recoger el valor del input
  return userSelect.value;
}
function getComputerElement() {
  //Generar un numero aleatorio
  const randomNum = getRandomNumber(10);
  console.log(`El número de la computadora es: ${randomNum}`);
  //Condicional para saber si la computadora es piedra, papel o tijera
  if (randomNum <= 3) {
    // Si es menos que 3, es piedra
    console.log('la computadora saca: Piedra.');
    return 'stone';
  } else if (randomNum >= 6) {
    // Si es menos que 3, es papel
    console.log('la computadora saca: Papel.');
    return 'paper';
  } else {
    // Sino el movimiento generado es tijera
    console.log('la computadora saca: Tijera.');
    return 'scissor';
  }
}
function getUserResult(userElement, computerElement) {
  //Condicional para saber si el usuario gana, empata o pierde
  if (userElement === computerElement) {
    // Empate
    return 'draw';
  } else if (userElement === 'stone' && computerElement === 'paper') {
    // Usuario Pierde
    return 'lose';
  } else if (userElement === 'stone' && computerElement === 'scissor') {
    // Usuario Gana
    return 'win';
  } else if (userElement === 'paper' && computerElement === 'stone') {
    // Usuario Gana
    return 'win';
  } else if (userElement === 'paper' && computerElement === 'scissor') {
    // Usuario Pierde
    return 'lose';
  } else if (userElement === 'scissor' && computerElement === 'stone') {
    // Usuario Pierde
    return 'lose';
  } else if (userElement === 'scissor' && computerElement === 'paper') {
    // Usuario Gana
    return 'win';
  }
}
//Esta función para escribir el "texto del resultado"
function renderTextResult(userResult) {
  if (userResult === 'win') {
    textResult.innerHTML = '¡Has ganado!';
  } else if (userResult === 'lose') {
    textResult.innerHTML = '¡Has perdido!';
  } else {
    textResult.innerHTML = 'Empate';
  }
}
//Función para dibujar los emojis
const renderEmoji = (userElement, computerElement) => {
  let imgUser = '';
  let imgComputer = '';
  if (userElement === 'stone') {
    imgUser = './assets/images/rock.png';
  } else if (userElement === 'paper') {
    imgUser = './assets/images/paper.png';
  } else if (userElement === 'scissor') {
    imgUser = './assets/images/scissors.png';
  }
  if (computerElement === 'stone') {
    imgComputer = './assets/images/rock.png';
  } else if (computerElement === 'paper') {
    imgComputer = './assets/images/paper.png';
  } else if (computerElement === 'scissor') {
    imgComputer = './assets/images/scissors.png';
  }
  console.log(computerElement);
  const htmlImage = `
  <img class=' container__emoji--item' src='${imgUser}' alt='user emoji' title='user emoji' /> 
  <img class='container__emoji--item'
  src='${imgComputer}' alt='computer emoji'
  title='computer emoji' />`;
  emojisContainer.innerHTML = htmlImage;
};
//Función contador
function updateCounter(userResult) {
  if (userResult === 'win') {
    countUserResult += 1;
    userCounter.innerHTML = `Jugador: ${countUserResult}`;
  } else if (userResult === 'lose') {
    countComputerResult += 1;
    computerCounter.innerHTML = `Computadora: ${countComputerResult}`;
  }
}
//Función para mostrar/ocultar los botones
function showResetButton() {
  button.classList.add('hidden');
  resetButton.classList.remove('hidden');
}

//Handler
function handleClickPlay(event) {
  event.preventDefault();
  const userElement = getUserElement();
  //Si el usuario no selecciona un valor válido, se sale de esta función en este punto para que no cuente como un mov. válido.
  if (userElement === 'choose') {
    return;
  }
  const computerElement = getComputerElement();
  renderEmoji(userElement, computerElement);
  const result = getUserResult(userElement, computerElement);
  renderTextResult(result);
  updateCounter(result);
  totalCounter++;
  if (totalCounter >= 10) {
    showResetButton();
  }
}

function handleResetClick() {
  totalCounter = 0;
  countUserResult = 0;
  countComputerResult = 0;
  userCounter.innerHTML = `Jugador: ${countUserResult}`;
  computerCounter.innerHTML = `Computadora: ${countComputerResult}`;
  textResult.innerHTML = 'Vamos a jugar!';
  userSelect.value = 'choose';
  button.classList.remove('hidden');
  resetButton.classList.add('hidden');
}

//Listener
button.addEventListener('click', handleClickPlay);
resetButton.addEventListener('click', handleResetClick);
