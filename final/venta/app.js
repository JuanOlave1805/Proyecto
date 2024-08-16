import { pedidos } from "../Modulos JS/config.js"; 
import  solicitud  from "../Modulos JS/listar.js";


// Eventos
document.addEventListener("DOMContentLoaded", function() {
    validarSesion();
    listar();
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



const dom = document;
const tablaVentas = dom.querySelector("#tableVentas");

const listar = async () => {
    const fragmento = dom.createDocumentFragment();
    const data = await solicitud(pedidos);

    // Crear el tbody
    const tbody = dom.createElement('tbody');

    data.forEach((element) => {
        // Crear una nueva fila
        const fila = dom.createElement('tr');

        // Crear y agregar las 4 celdas con los datos
        const celda1 = dom.createElement('td');
        celda1.textContent = element.fechaPedido;
        fila.appendChild(celda1);

        const celda2 = dom.createElement('td');
        celda2.textContent = element.idCliente;
        fila.appendChild(celda2);

        const celda3 = dom.createElement('td');
        celda3.textContent = element.idUsuario;
        fila.appendChild(celda3);

        const celda4 = dom.createElement('td');
        celda4.textContent = element.total;
        fila.appendChild(celda4);

        // Agregar la fila al fragmento
        fragmento.appendChild(fila);
    });

    // Agregar el fragmento al tbody
    tbody.appendChild(fragmento);

    tablaVentas.appendChild(tbody);
};