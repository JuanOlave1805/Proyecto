import { default as numeros, numerosEdad } from '../Modulos JS/moduloSoloNumeros.js';
import { default as validateTextInput } from '../Modulos JS/moduloSoloLetras.js';
import { default as validateEmail } from '../Modulos JS/correo.js';
import validar from '../Modulos JS/validarFormularios.js';
import { usuario } from '../Modulos JS/config.js';

// dom
const dom = document;
const $inputID = dom.querySelector("#identificacion");
const $inputNombre = dom.querySelector("#nombre");
const $inputApellido = dom.querySelector("#apellido");
const $inputEdad = dom.querySelector("#edad");
const $inputCorreo = dom.querySelector("#correo");
const $inputTelefono = dom.querySelector("#telefono");
const $checkbox = document.querySelector('#terminos');
const $Button = document.querySelector('#button');
const $formulario = dom.querySelector('#registroForm');


$inputID.addEventListener("keyup", (event) => {
    numeros(event, event.target);
});
$inputNombre.addEventListener("input", (event) => {
    validateTextInput(event.target);
});
$inputApellido.addEventListener("input", (event) => {
    validateTextInput(event.target);
});
$inputEdad.addEventListener("keypress", (event) => {
    numerosEdad(event, event.target);
});
$inputCorreo.addEventListener("input", (event) => {
    validateEmail(event.target);
});
$inputTelefono.addEventListener("keypress", (event) => {
    numeros(event, event.target);
});




// Eventos
document.addEventListener("DOMContentLoaded", function() {
    validarSesion();
    listar();
});

document.getElementById('menuIcon').addEventListener('click', function() {
    const botonera = document.getElementById('botonera');
    botonera.classList.toggle('active');
});

// Agrega un event listener al checkbox para manejar el cambio de estado
$checkbox.addEventListener('change', toggleButtonState);

// Agrega un event listener al formulario para manejar el submit
$formulario.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita la recarga de la página

    try {
        await actualizar();
    } catch (error) {
        console.error('Error al guardar los datos:', error); // Maneja el error
    }
});


//Control de las secciones
const validarSesion = () => {
    const usuarioActivo = localStorage.getItem("usuarioActivo");

    if (!usuarioActivo) {
        // Redirigir al login si no hay sesión activa
        window.location.href = "../inicio/inicio.html";
    } else {
        // Si hay sesión activa, convertir el string almacenado a un objeto
        const usuario = JSON.parse(usuarioActivo);
        console.log(usuario.id);
    }
};

// Función para habilitar o deshabilitar el botón
function toggleButtonState() {
    $Button.disabled = !$checkbox.checked; // Habilita o deshabilita el botón según el estado del checkbox
}

const listar = () => {
    // Obtener el usuario almacenado en localStorage
    const usuarioActivo = localStorage.getItem("usuarioActivo");
    const usuario = JSON.parse(usuarioActivo);

    if (!usuarioActivo) {
        console.error("No se encontró ningún usuario en localStorage.");
        return;
    }

    // Asignar los valores del usuario guardado a los inputs
    $inputID.value = usuario.id;
    $inputNombre.value = usuario.nombre;
    $inputApellido.value = usuario.apellido;
    $inputEdad.value = usuario.edad;
    $inputCorreo.value = usuario.correo;
    $inputTelefono.value = usuario.telefono;

    console.log("Datos del usuario cargados en los inputs");
};

const actualizar = async () => {
    // Verifica la validez del formulario
    let ok = validar("#formulario [required]");

    if (!ok) {
        alert("Por favor, complete todos los campos requeridos.");
        return;
    }

    // Captura todos los atributos
    const data = {
        id: $inputID.value, // Captura el ID
        nombre: $inputNombre.value,
        apellido: $inputApellido.value,
        edad: $inputEdad.value,
        correo: $inputCorreo.value,
        telefono: $inputTelefono.value
    };

    try {
        const resultado = await actualizarDatos(usuario, data); // Asegúrate de que 'usuario' sea la variable correcta
        console.log('Resultado:', resultado);

        if (resultado) {
            // Actualiza la información del usuario en la interfaz sin recargar la página
            actualizarDatos(data);

            // Mostrar un alert de éxito
            alert("Usuario actualizado exitosamente");

            // Limpiar los campos del formulario
            $inputID.value = "";
            $inputNombre.value = "";
            $inputApellido.value = "";
            $inputEdad.value = "";
            $inputCorreo.value = "";
            $inputTelefono.value = "";
            $checkbox.checked = false; // Desmarcar el checkbox después de la actualización
        } else {
            alert("Error al actualizar el usuario.");
        }
    } catch (error) {
        console.error('Error al agregar el dato:', error);
        alert("Ocurrió un error al intentar actualizar el usuario.");
    }
};


const actualizarDatos = (data) => {
    // Asignar los valores actualizados del usuario a los inputs
    $inputID.value = data.id;
    $inputNombre.value = data.nombre;
    $inputApellido.value = data.apellido;
    $inputEdad.value = data.edad;
    $inputCorreo.value = data.correo;
    $inputTelefono.value = data.telefono;
};

