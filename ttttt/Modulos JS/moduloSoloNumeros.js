export default numeros;

function numeros(event, elemento) {
    let numero = elemento.value.length;
    let expresion = /^\d$/;

    // Verificar si la tecla presionada es un número
    if (!expresion.test(event.key)) {
        event.preventDefault();
    }

    // Validar la longitud del valor actual
    if (numero < 9) {
        elemento.style.border = '2px solid red';
    } else if (numero === 9) {
        // Permitir el décimo número
        if (expresion.test(event.key)) {
            elemento.style.border = '2px solid green';
        } else {
            event.preventDefault();
        }
    } else {
        // Evitar que se siga escribiendo más de 10 caracteres
        event.preventDefault();
    }
}