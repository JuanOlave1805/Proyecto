import  solicitud  from "../Modulos JS/listar.js";
import { categorias, producto, proveedores } from "../Modulos JS/config.js";
import { numerosEdad } from "../Modulos JS/moduloSoloNumeros.js";

const dom = document;
const $table = dom.querySelector("#table");
const $selectCategoria = dom.querySelector("#categoria")
const $fragmento = document.createDocumentFragment();
const $tbody = document.querySelector("#tbody");
const $inputID = document.querySelector("#textProducto");
const $inputNombre = document.querySelector("#textNombre");
const $table2 = document.querySelector("#table2");
const $tbody2 = document.querySelector("#tbody2");
const $cantidad = document.querySelector("#textCantidad");
const $btnAgregarProducto = document.querySelector("#btnAgregarProducto");
const $btnRemoverProducto = document.querySelector("#btnRemoverProducto");

// Eventos
document.addEventListener("DOMContentLoaded", function() {
    validarSesion();
    seleccionarFila($table, [$inputID, $inputNombre]);
    seleccionarFila($table2, [$inputID, $inputNombre]);
    listar();
});

document.getElementById('menuIcon').addEventListener('click', function() {
    const botonera = document.getElementById('botonera');
    botonera.classList.toggle('active');
});

$selectCategoria.addEventListener('click', function() {
    let capturado = $selectCategoria.value;
    console.log(capturado);
    cargarProductos(capturado);
})

$cantidad.addEventListener("keyup", (event) => {
    numerosEdad(event, event.target);
});
$cantidad.addEventListener("keypress", (event) => {
    numerosEdad(event, event.target);
});

$btnAgregarProducto.addEventListener('click', function() {
    const productoBuscado = $inputID.value.trim();
    const cantidadDeseada = $cantidad.value.trim();

    if (cantidadDeseada === '' || isNaN(cantidadDeseada) || parseInt(cantidadDeseada) <= 0) {
        alert("Por favor, ingrese una cantidad válida.");
    } else {
        agregarProducto(productoBuscado, cantidadDeseada);
    }
});

$btnRemoverProducto.addEventListener('click', function() {
    const productoBuscado = $inputID.value.trim();
    removerProducto(productoBuscado);
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
        celda4.textContent = element.stock;
        fila.appendChild(celda4);

        const celda5 = dom.createElement('td');
        const categoria = dataCategorias.find(c => c.id === element.categoria);
        celda5.textContent = categoria ? categoria.nombre : "Sin categoría";
        fila.appendChild(celda5);

        const celda6 = dom.createElement('td');
        const proveedor = dataProveedores.find(p => p.id === element.proveedor);
        celda6.textContent = proveedor ? proveedor.nombre : "Sin proveedor";
        fila.appendChild(celda6);

        // console.log(proveedor);
        // Agregar la fila al fragmento
        $fragmento.appendChild(fila);
        }
    })
    $tbody.appendChild($fragmento)

    $table.appendChild($tbody)
}
console.log($table2, [$inputID, $inputNombre])
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

            if (celdas.length >= 5) { // Asegurarse de que haya suficientes celdas
                inputs[0].value = celdas[0].textContent; // id
                inputs[1].value = celdas[1].textContent; // Nombre
                console.log("Datos transferidos a los inputs");
            } else {
                console.error("La fila no tiene suficientes celdas.");
            }
        } else {
            console.error("No se encontró la fila.");
        }
    });
};

const agregarProducto = async (idProducto, cantidad) => {
    // Realizar la solicitud para obtener los datos de productos, categorías y proveedores
    const dataProductos = await solicitud(producto);
    const dataCategorias = await solicitud(categorias);
    const dataProveedores = await solicitud(proveedores);

    // Buscar el producto en la lista de productos
    const productoEncontrado = dataProductos.find(element => element.id == idProducto);

    if (productoEncontrado) {
        console.log(productoEncontrado);

        // Verificar si el producto ya está en la tabla
        let productoEnTabla = false;
        const filas = $tbody2.querySelectorAll('tr');

        filas.forEach(fila => {
            const celdaID = fila.querySelector('td:first-child'); // Obtiene la primera celda (ID)
            if (celdaID && celdaID.textContent == idProducto) {
                // Producto encontrado en la tabla, sumar la cantidad
                const celdaCantidad = fila.querySelector('td:nth-child(4)'); // Obtiene la celda de cantidad
                const nuevaCantidad = parseInt(celdaCantidad.textContent) + parseInt(cantidad);
                celdaCantidad.textContent = nuevaCantidad;
                productoEnTabla = true;
            }
        });

        // Si el producto no está en la tabla, agregar una nueva fila
        if (!productoEnTabla) {
            // Crear un fragmento de documento
            const fragmento = document.createDocumentFragment();

            // Crear la nueva fila
            const fila = document.createElement('tr');

            // Crear celdas y asignar valores
            const celda1 = document.createElement('td');
            celda1.textContent = productoEncontrado.id;
            fila.appendChild(celda1);

            const celda2 = document.createElement('td');
            celda2.textContent = productoEncontrado.nombre;
            fila.appendChild(celda2);

            const celda3 = document.createElement('td');
            celda3.textContent = productoEncontrado.precioVenta;
            fila.appendChild(celda3);

            const celda4 = document.createElement('td');
            celda4.textContent = cantidad;
            fila.appendChild(celda4);

            const celda5 = document.createElement('td');
            const categoria = dataCategorias.find(c => c.id === productoEncontrado.categoria);
            celda5.textContent = categoria ? categoria.nombre : "Sin categoría";
            fila.appendChild(celda5);

            const celda6 = document.createElement('td');
            const proveedor = dataProveedores.find(p => p.id === productoEncontrado.proveedor);
            celda6.textContent = proveedor ? proveedor.nombre : "Sin proveedor";
            fila.appendChild(celda6);

            // Agregar la fila al fragmento
            fragmento.appendChild(fila);

            // Finalmente, agregar el fragmento al tbody
            $tbody2.appendChild(fragmento);
        }

        // Limpiar los inputs
        $cantidad.value = "";
        $inputID.value = "";
        $inputNombre.value = "";
    } else {
        alert("Producto no encontrado.");
    }
}

const removerProducto = (idProducto) => {
    // Obtener todas las filas de la tabla
    const filas = $tbody2.querySelectorAll('tr');

    let productoEliminado = false;

    // Iterar sobre las filas para encontrar el producto
    filas.forEach(fila => {
        const celdaID = fila.querySelector('td:first-child'); // Obtener la primera celda (ID)
        if (celdaID && celdaID.textContent == idProducto) {
            // Producto encontrado, eliminar la fila
            fila.remove();
            productoEliminado = true;
        }
    });

    // Verificar si se eliminó algún producto
    if (productoEliminado) {
        alert(`Producto con ID ${idProducto} eliminado de la tabla.`);
    } else {
        alert(`Producto con ID ${idProducto} no encontrado en la tabla.`);
    }
}