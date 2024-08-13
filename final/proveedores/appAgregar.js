import validar from "../Modulos JS/validarFormularios.js";
import { default as numeros } from '../Modulos JS/moduloSoloNumeros.js';
import { default as validateTextInput } from '../Modulos JS/moduloSoloLetras.js';
import { default as validateEmail } from '../Modulos JS/correo.js';
import agregarDato from '../Modulos JS/agregar.js';
import { rol, usuario } from "../Modulos JS/config.js";

// id html
const dom = document;
const $inputTelefono = dom.querySelector("#telefono");
const $inputNombre = dom.querySelector("#nombre");
const $inputCorreo = dom.querySelector("#correo");
const $inputEncargado = dom.querySelector("#nombreUsuario");
const $checkbox = document.querySelector('#terminos');
const $Button = document.querySelector('#button');
const $formulario = dom.querySelector('#registroForm');
const $table = dom.querySelector("#registroForm")

// Eventos

document.getElementById('menuIcon').addEventListener('click', function() {
    const botonera = document.getElementById('botonera');
    botonera.classList.toggle('active');
});

$inputTelefono.addEventListener("keyup", (event) => {
    numeros(event, $inputTelefono);
});
$inputTelefono.addEventListener("keypress", (event) => {
    numeros(event, $inputTelefono);
});

$inputNombre.addEventListener("input", (event) => {
    validateTextInput(event.target);
});
$inputEncargado.addEventListener("input", (event) => {
    validateTextInput(event.target);
});

$inputCorreo.addEventListener("input", (event) => {
    validateEmail(event.target);
});

// Agrega un event listener al checkbox para manejar el cambio de estado
$checkbox.addEventListener('change', toggleButtonState);

// Agrega un event listener al formulario para manejar el submit
$formulario.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita la recarga de la página

    try {
        await save();
    } catch (error) {
        console.error('Error al guardar los datos:', error); // Maneja el error
    }
});

// Funciones

const save = async () => {
    // Verifica la validez del formulario
    let ok = validar("#formulario [required]"); // Llama a la función validar

    // Captura todos los atributos
    const data = {
        nombre: $inputNombre.value.toUpperCase(),
        contactoNombre: $inputEncargado.value,
        correo: $inputCorreo.value,
        telefono: $inputTelefono.value
    };

    if (ok) {
        try {
            const resultado = await agregarDato(usuario, data);
            console.log('Resultado:', resultado); // Maneja el resultado

            // Mostrar un alert de éxito
            alert("Proveedor agregado exitosamente");

            // Limpiar los campos del formulario
            $inputNombre.value = "";
            $inputEncargado.value = "";
            $inputCorreo.value = "";
            $inputTelefono.value = "";

            // Agregar la nueva fila a la tabla
            agregarFila(data); // Actualiza la tabla con el nuevo dato

        } catch (error) {
            console.error('Error al agregar el dato:', error);
        }
    }
};

// Función para habilitar o deshabilitar el botón
function toggleButtonState() {
    $Button.disabled = !$checkbox.checked; // Habilita o deshabilita el botón según el estado del checkbox
}

const agregarFila = (data) => {
    const fragmento = dom.createDocumentFragment();
    
    // Crear una nueva fila
    const fila = dom.createElement('tr');

    // Crear y agregar las celdas con los datos
    const celda1 = dom.createElement('td');
    celda1.textContent = data.nombre;
    fila.appendChild(celda1);

    const celda2 = dom.createElement('td');
    celda2.textContent = data.contactoNombre;
    fila.appendChild(celda2);

    const celda3 = dom.createElement('td');
    celda3.textContent = data.correo;
    fila.appendChild(celda3);

    const celda4 = dom.createElement('td');
    celda4.textContent = data.telefono;
    fila.appendChild(celda4);

    // Agregar la fila al fragmento
    fragmento.appendChild(fila);

    // Agregar el fragmento al tbody
    const tbody = dom.querySelector('tbody');
    if (tbody) {
        tbody.appendChild(fragmento);
    } else {
        console.error("No se encontró el tbody en la tabla.");
    }
};