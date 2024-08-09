import { default as numeros } from '../Modulos JS/moduloSoloNumeros.js';

const $inputUsuario = document.querySelector("#username");

$inputUsuario.addEventListener("keypress", (event) => {
    numeros(event, $inputUsuario);
});