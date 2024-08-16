import  solicitud  from "../Modulos JS/listar.js";
import { categorias, producto, proveedores } from "../Modulos JS/config.js";

const dom = document;
const $table = dom.querySelector("#table");
const $selectCategoria = dom.querySelector("#categoria")
const $fragmento = document.createDocumentFragment();
const $tbody = document.querySelector("#tbody");

// Eventos
document.addEventListener("DOMContentLoaded", function() {
    validarSesion();
    listar();
});

document.getElementById('menuIcon').addEventListener('click', function() {
    const botonera = document.getElementById('botonera');
    botonera.classList.toggle('active');
});

$selectCategoria.addEventListener('click', function() {
    limpiar();
    let capturado = $selectCategoria.value;
    console.log(capturado);
    cargarProductos(capturado);
})

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
    // Realizar la solicitud para obtener los datos del rol
    const dataProductos = await solicitud(producto);
    const dataCategorias = await solicitud(categorias);
    const dataProveedores = await solicitud(proveedores);
    $tbody.innerHTML="";

    dataProductos.forEach((element) => {
        if( element.categoria == categoria ){
            console.log(element);
            const fila = dom.createElement('tr');

        const celda1 = dom.createElement('td');
        celda1.textContent = element.id;
        fila.appendChild(celda1);

        const celda2 = dom.createElement('td');
        celda2.textContent = element.nombre;
        fila.appendChild(celda2);

        const celda3 = dom.createElement('td');
        celda3.textContent = element.precioVenta;
        fila.appendChild(celda3);

        const celda4 = dom.createElement('td');
        celda4.textContent = element.precioCompra;
        fila.appendChild(celda4);

        const celda5 = dom.createElement('td');
        celda5.textContent = element.stock;
        fila.appendChild(celda5);

        const celda6 = dom.createElement('td');
        const categoria = dataCategorias.find(c => c.id === element.categoria);
        celda6.textContent = categoria ? categoria.nombre : "Sin categoría";
        fila.appendChild(celda6);

        const celda7 = dom.createElement('td');
        const proveedor = dataProveedores.find(p => p.id === element.proveedor);
        celda7.textContent = proveedor ? proveedor.nombre : "Sin proveedor";
        fila.appendChild(celda7);

        console.log(proveedor);
        // Agregar la fila al fragmento
        $fragmento.appendChild(fila);
        }
    })
    $tbody.appendChild($fragmento)

    $table.appendChild($tbody)
}

const limpiar = () => {
    
}