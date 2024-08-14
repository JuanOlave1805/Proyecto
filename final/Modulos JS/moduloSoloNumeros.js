export default function numeros(event, elemento) {
    let valor = elemento.value;
    let expresion = /^\d$/;

    // Manejo del evento keypress
    if (event.type === 'keypress') {
        // Verificar si la tecla presionada es un número
        if (!expresion.test(event.key) && event.key !== 'Backspace') {
            event.preventDefault();
            return;
        }

        // Verificar si la longitud del valor más el nuevo carácter excede los 10 dígitos
        if (valor.length >= 10 && expresion.test(event.key)) {
            event.preventDefault();
        }
    }

    // Manejo del evento keyup
    if (event.type === 'keyup') {
        // Eliminar caracteres no numéricos del valor
        valor = valor.replace(/\D/g, '');

        // Validar la longitud del valor actual
        if (valor.length < 7) {
            elemento.style.border = '2px solid red';
        } else if (valor.length <= 10) {
            elemento.style.border = '2px solid green';
        } else {
            // Limitar el valor a 10 caracteres
            valor = valor.slice(0, 10);
            elemento.style.border = '2px solid green';
        }

        // Actualizar el valor del campo
        elemento.value = valor;
    }
}

export function numerosEdad(event, elemento) {
    let valor = elemento.value;
    let expresion = /^\d$/;

    // Manejo del evento keypress
    if (event.type === 'keypress') {
        // Verificar si la tecla presionada es un número
        if (!expresion.test(event.key) && event.key !== 'Backspace') {
            event.preventDefault();
            return;
        }

        // Verificar si la longitud del valor más el nuevo carácter excede los 10 dígitos
        if (valor.length >= 2 && expresion.test(event.key)) {
            event.preventDefault();
        }
    }

    // Manejo del evento keyup
    if (event.type === 'keyup') {
        // Eliminar caracteres no numéricos del valor
        valor = valor.replace(/\D/g, '');

        // Validar la longitud del valor actual
        if (valor.length < 1) {
            elemento.style.border = '2px solid red';
        } else if (valor.length <= 2) {
            elemento.style.border = '2px solid green';
        } else {
            // Limitar el valor a 10 caracteres
            valor = valor.slice(0, 2);
            elemento.style.border = '2px solid green';
        }

        // Actualizar el valor del campo
        elemento.value = valor;
    }
}

export function numerosValores(event, elemento) {
    let valor = elemento.value;
    let expresion = /^\d$/;

    // Manejo del evento keypress
    if (event.type === 'keypress') {
        // Verificar si la tecla presionada es un número
        if (!expresion.test(event.key) && event.key !== 'Backspace') {
            event.preventDefault();
            return;
        }
        elemento.style.border = '2px solid green';

        // // Verificar si la longitud del valor más el nuevo carácter excede los 10 dígitos
        if (valor.length >= 10 && expresion.test(event.key)) {
            elemento.style.border = '2px solid red';
            event.preventDefault();
        }
        else if(valor.length < 3 ) {
            elemento.style.border = '2px solid red';
        }
    }
}

export function numerosStock(event, elemento) {
    let valor = elemento.value;
    let expresion = /^\d+$/; // Solo permite números

    // Filtrar caracteres no numéricos
    if (!expresion.test(valor)) {
        elemento.value = valor.replace(/\D/g, ''); // Reemplaza cualquier carácter no numérico
    }

    // Validación en tiempo real
    if (elemento.value === '1' || elemento.value.length > 10) {
        elemento.style.border = '2px solid red';
    } else if (elemento.value.length === 0) {
        elemento.style.border = ''; // Sin borde si el input está vacío
    } else {
        elemento.style.border = '2px solid green';
    }
}