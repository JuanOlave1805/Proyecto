import validar from "../Modulos JS/validarFormularios.js";
import { default as numeros, numerosEdad } from '../Modulos JS/moduloSoloNumeros.js';
import { default as validateTextInput } from '../Modulos JS/moduloSoloLetras.js';
import { default as validateEmail } from '../Modulos JS/correo.js';
import actualizarDato from '../Modulos JS/actualizar.js';
import solicitud from '../Modulos JS/listar.js';
import { usuario, rol } from "../Modulos JS/config.js";

// id html
const dom = document;
const tabla = dom.querySelector("#table");
const $inputID = dom.querySelector("#identificacion");
const $inputNombre = dom.querySelector("#nombre");
const $inputApellido = dom.querySelector("#apellido");
const $inputEdad = dom.querySelector("#edad");
const $inputCorreo = dom.querySelector("#correo");
const $inputTelefono = dom.querySelector("#telefono");
const $selectRol = dom.querySelector("#rol");
const $selectEstado = dom.querySelector("#estado");

const $checkbox = document.querySelector('#terminos');
const $Button = document.querySelector('#button');
const $formulario = dom.querySelector('#registroForm');

// Eventos
document.addEventListener("DOMContentLoaded", function() {
    validarSesion();
    listarOpciones();
    seleccionarFila(tabla, [$inputID, $inputNombre, $inputApellido, $inputEdad, $inputCorreo, $inputTelefono, $selectRol, $selectEstado]);
    listar();
});
document.getElementById('menuIcon').addEventListener('click', function() {
    const botonera = document.getElementById('botonera');
    botonera.classList.toggle('active');
});

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

// Funciones

const listarOpciones = async () => {
    try {
        // Crear un fragmento de documento
        const fragmento = document.createDocumentFragment(); // Usa 'document' si 'dom' no es necesario

        // Realizar la solicitud para obtener los datos del rol
        const datarol = await solicitud(rol);

        console.log(datarol);

        // Verificar si se obtuvieron datos
        if (Array.isArray(datarol)) {
            datarol.forEach((element) => {
                // Crear y agregar las opciones con los datos
                const opcion = document.createElement('option'); // Usa 'document' si 'dom' no es necesario
                opcion.textContent = element.name.toUpperCase();
                opcion.value = element.id;

                // Agregar la opción al fragmento
                fragmento.appendChild(opcion);
            });

            // Agregar el fragmento al select
            $selectRol.appendChild(fragmento);
        } else {
            console.error('Los datos obtenidos no son una lista:', datarol);
        }
    } catch (error) {
        console.error('Error al listar opciones:', error);
    }
};
const seleccionarFila = ($table, inputs) => {
    if (!$table) {
        console.error("La tabla no fue encontrada.");
        return;
    }

    console.log("EventListener añadido a la tabla");

    $table.addEventListener('click', (event) => {
        console.log("Click en la tabla");
        const fila = event.target.closest('tr'); // Obtener la fila clickeada

        if (fila) {
            const celdas = fila.querySelectorAll('td');
            console.log("Fila seleccionada: ", fila);

            if (celdas.length >= 8) { // Asegurarse de que haya suficientes celdas
                inputs[0].value = celdas[0].textContent; 
                inputs[1].value = celdas[1].textContent; 
                inputs[2].value = celdas[2].textContent; 
                inputs[3].value = celdas[3].textContent; 
                inputs[4].value = celdas[4].textContent;
                inputs[5].value = celdas[5].textContent; 

                // Establecer la opción seleccionada en los select
                const selectRol = inputs[6];
                const selectEstado = inputs[7];

                // Función para seleccionar la opción en un select
                const seleccionarOpcion = (select, valor) => {
                    let encontrado = false;
                    for (let i = 0; i < select.options.length; i++) {
                        const opcionSelect = select.options[i];
                        console.log(opcionSelect.text)
                        console.log("f", valor)
                        if (opcionSelect.text === valor) {
                            select.selectedIndex = i;
                            encontrado = true;
                            break;
                        }
                    }
                    if (!encontrado) {
                        console.error(`Opción "${valor}" no encontrada en el select.`);
                    }
                };

                seleccionarOpcion(selectRol, celdas[6].textContent);
                seleccionarOpcion(selectEstado, celdas[7].textContent);
                

                console.log("Datos transferidos a los inputs");
            } else {
                console.error("La fila no tiene suficientes celdas.");
            }
        } else {
            console.error("No se encontró la fila.");
        }
    });
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
        id: $inputID.value, // Captura el ID si es necesario
        nombre: $inputNombre.value,
        apellido: $inputApellido.value, // Se ajustó para usar apellido en lugar de encargado
        edad: $inputEdad.value, // Se añadió el campo edad
        correo: $inputCorreo.value,
        telefono: $inputTelefono.value,
        rol: $selectRol.value, // Captura el valor del select rol
        estado: $selectEstado.value // Captura el valor del select estado
    };

    try {
        const resultado = await actualizarDato(usuario, data); // Asegúrate de que 'usuario' sea la variable correcta
        const dataRoles = await solicitud(rol); // Asegúrate de que 'rol' sea la variable correcta

        console.log('Resultado:', resultado);
        console.log('DataRoles:', dataRoles);

        if (resultado) {
            // Actualiza la fila en la tabla
            actualizarFilaEnTabla(data, dataRoles);

            // Mostrar un alert de éxito
            alert("Usuario actualizado exitosamente");

            // Limpiar los campos del formulario
            $inputID.value = "";
            $inputNombre.value = "";
            $inputApellido.value = "";
            $inputEdad.value = "";
            $inputCorreo.value = "";
            $inputTelefono.value = "";
            $selectRol.selectedIndex = 0; 
            $selectEstado.selectedIndex = 0; 
            $checkbox.checked = false;
        } else {
            alert("Error al actualizar el usuario.");
        }
    } catch (error) {
        console.error('Error al agregar el dato:', error);
        alert("Ocurrió un error al intentar actualizar el usuario.");
    }
};

const actualizarFilaEnTabla = (data, dataRoles) => {
    // Busca la fila correspondiente en la tabla usando el ID
    const filas = document.querySelectorAll('#table > tbody > tr');
    console.log(filas);
    let filaEncontrada = null;

    filas.forEach((fila) => {
        const celdaID = fila.querySelector('td:first-child'); // Suponiendo que la primera celda contiene el ID
        if (celdaID && celdaID.textContent === data.id) {
            filaEncontrada = fila;
        }
    });

    // Si la fila se encuentra, actualiza sus celdas
    if (filaEncontrada) {
        const celdas = filaEncontrada.querySelectorAll('td');
        celdas[0].textContent = data.id;
        celdas[1].textContent = data.nombre;
        celdas[2].textContent = data.apellido;
        celdas[3].textContent = data.edad;
        celdas[4].textContent = data.correo;
        celdas[5].textContent = data.telefono;

        // Encuentra el rol del usuario en dataRoles
        const rolUsuario = dataRoles.find(r => r.id === data.rol);
        celdas[6].textContent = rolUsuario ? rolUsuario.name : "Sin rol";
        celdas[7].textContent = data.estado;

    } else {
        console.error('No se encontró la fila para el ID proporcionado');
    }
};

// Función para habilitar o deshabilitar el botón
function toggleButtonState() {
    $Button.disabled = !$checkbox.checked; // Habilita o deshabilita el botón según el estado del checkbox
}

const listar = async () => {
    const fragmento = dom.createDocumentFragment();
    const dataUsuarios = await solicitud(usuario);
    const dataRoles = await solicitud(rol);

    // Crear el tbody
    const tbody = dom.createElement('tbody');

    dataUsuarios.forEach((element) => {
        // Crear una nueva fila
        const fila = dom.createElement('tr');

        // Crear y agregar las celdas con los datos
        const celda1 = dom.createElement('td');
        celda1.textContent = element.id;
        fila.appendChild(celda1);

        const celda2 = dom.createElement('td');
        celda2.textContent = element.nombre;
        fila.appendChild(celda2);

        const celda3 = dom.createElement('td');
        celda3.textContent = element.apellido;
        fila.appendChild(celda3);

        const celda4 = dom.createElement('td');
        celda4.textContent = element.edad;
        fila.appendChild(celda4);

        const celda5 = dom.createElement('td');
        celda5.textContent = element.correo;
        fila.appendChild(celda5);

        const celda6 = dom.createElement('td');
        celda6.textContent = element.telefono;
        fila.appendChild(celda6);

        const celda7 = dom.createElement('td');
        const rolUsuario = dataRoles.find(r => r.id === element.rol);
        celda7.textContent = rolUsuario ? rolUsuario.name : "Sin rol";
        fila.appendChild(celda7);

        const celda8 = dom.createElement('td');
        celda8.textContent = element.estado;
        fila.appendChild(celda8);

        // Agregar la fila al fragmento
        fragmento.appendChild(fila);
    });

    // Agregar el fragmento al tbody
    tbody.appendChild(fragmento);

    tabla.appendChild(tbody);
};