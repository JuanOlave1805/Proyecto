function validateTextInput(input) {
    const value = input.value;
    const isValid = /^[A-Za-z]{1,100}$/.test(value); // Solo letras, entre 1 y 100 caracteres

    if (value.length === 0) {
        // Si el valor está vacío
        input.style.border = '2px solid red'; // Borde rojo
    } else if (value.length > 5 && isValid) {
        // Si el valor tiene más de 5 letras y es válido
        input.style.border = '2px solid green'; // Borde verde
    } else {
        // Si el valor no cumple con los criterios
        input.style.border = '2px solid red'; // Borde rojo
    }
}

// Exporta la función como el módulo por defecto
export default validateTextInput;