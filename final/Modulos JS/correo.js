function validateEmail(input) {
    // Expresión regular para validar el correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const value = input.value;
    const isValid = emailPattern.test(value);

    if (value.length === 0) {
        // Si el valor está vacío
        input.style.border = '2px solid red'; // Borde rojo
    } else if (isValid) {
        // Si el valor es un correo electrónico válido
        input.style.border = '2px solid green'; // Borde verde
    } else {
        // Si el valor no es un correo electrónico válido
        input.style.border = '2px solid red'; // Borde rojo
    }
}

export default validateEmail;