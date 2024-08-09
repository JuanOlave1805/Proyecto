import validateNumber from './moduloSoloNumeros.js';

const $inputUsuario = document.querySelector('#inputUsuario');

$inputUsuario.addEventListener('input', () => validateNumber($inputUsuario));