function validateNumber(input) {
    const value = input.value;
    const isValid = /^\d{10}$/.test(value);

    // Cambia el borde del input según la validez
    input.style.border = isValid ? '2px solid green' : '2px solid red';
}

// Exporta la función como el módulo por defecto
export default validateInput;