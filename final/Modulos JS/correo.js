function validateEmail(input) {
    // Expresión regular para validar el correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const value = input.value;
    const isValid = emailPattern.test(value);

    // Verificar si el span ya existe, si no, crearlo
    let span = input.nextElementSibling;
    if (!span || span.tagName !== 'SPAN') {
        span = document.createElement('span');
        span.style.fontSize = '12px';
        input.parentNode.insertBefore(span, input.nextSibling);
    }

    if (value.length === 0) {
        // Si el valor está vacío
        input.style.border = '2px solid red'; // Borde rojo
        span.textContent = 'Este campo no puede estar vacío'; // Mensaje de error
        span.style.color = 'red';
        span.style.display = 'block'; // Mostrar el span
    } else if (isValid) {
        // Si el valor es un correo electrónico válido
        input.style.border = '2px solid green'; // Borde verde
        span.style.display = 'none'; // Ocultar el span
    } else {
        // Si el valor no es un correo electrónico válido
        input.style.border = '2px solid red'; // Borde rojo
        span.textContent = 'Ingrese un correo electrónico válido'; // Mensaje de error
        span.style.color = 'red';
        span.style.display = 'block'; // Mostrar el span
    }
}

export default validateEmail;
