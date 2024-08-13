function validateTextInput(input) {
    // Remover cualquier carácter que no sea letra o espacio
    input.value = input.value.replace(/[^A-Za-z\s]/g, '');

    const value = input.value;
    const isValid = /^[A-Za-z\s]+$/.test(value); // Solo letras y espacios

    if (value.length === 0) {
        // Si el valor está vacío
        input.style.border = '2px solid red'; // Borde rojo
    } else if (value.length > 5 && isValid) {
        // Si el valor tiene más de 5 caracteres y es válido
        input.style.border = '2px solid green'; // Borde verde
    } else {
        // Si el valor no cumple con los criterios
        input.style.border = '2px solid red'; // Borde rojo
    }
}

export default validateTextInput;