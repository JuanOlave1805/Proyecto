import { pedidos } from "../Modulos JS/config.js"; 
import  solicitud  from "../Modulos JS/listar.js";
import { categorias, producto } from "../Modulos JS/config.js";

const dom = document;
const $table = dom.querySelector("#tableProductos");
const $selectCategoria = dom.querySelector("#categoria")
console.log($selectCategoria.value)

$selectCategoria.addEventListener('click', function() {
    let capturado = $selectCategoria.value;


})

// Eventos
document.addEventListener("DOMContentLoaded", function() {
    validarSesion();
    listar();
    cargarProductos();
    console.log($selectCategoria.value)
});

document.getElementById('menuIcon').addEventListener('click', function() {
    const botonera = document.getElementById('botonera');
    botonera.classList.toggle('active');
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


const listar = async () => {
    try {
        // Crear un fragmento de documento
        const fragmento = document.createDocumentFragment(); // Usa 'document' si 'dom' no es necesario

        // Realizar la solicitud para obtener los datos del rol
        const dataCategoria = await solicitud(categorias);

        console.log(dataCategoria);

        // Verificar si se obtuvieron datos
        if (Array.isArray(dataCategoria)) {
            dataCategoria.forEach((element) => {
                // Crear y agregar las opciones con los datos
                const opcion = document.createElement('option'); // Usa 'document' si 'dom' no es necesario
                opcion.textContent = element.nombre;
                opcion.value = element.id;

                // Agregar la opción al fragmento
                fragmento.appendChild(opcion);
            });

            // Agregar el fragmento al select
            $selectCategoria.appendChild(fragmento);
        } else {
            console.error('Los datos obtenidos no son una lista:', dataCategoria);
        }
    } catch (error) {
        console.error('Error al listar opciones:', error);
    }
};


const cargarProductos = async (categoria) => {
    // Crear un fragmento de documento
    const fragmento = document.createDocumentFragment(); // Usa 'document' si 'dom' no es necesario

    // Realizar la solicitud para obtener los datos del rol
    const dataProductos = await solicitud(producto);

    console.log(dataProductos)

    const arrayProductoSeleccionado = [];
    dataProductos.forEach((element) => {
        if( element.categoria == categoria ){
            arrayProductoSeleccionado.push = element;
            console.log(element)
        }
    })
}