import { default as numeros } from '../Modulos JS/moduloSoloNumeros.js';
import { usuario } from "../Modulos JS/config.js"; 
import solicitud from "../Modulos JS/listar.js";

const $inputUsuario = document.querySelector("#username");

// Agregar manejadores para los eventos keypress y keyup
$inputUsuario.addEventListener("keyup", (event) => {
    numeros(event, $inputUsuario);
});
$inputUsuario.addEventListener("keypress", (event) => {
    numeros(event, $inputUsuario);
});



const dom = document;
const formulario = dom.querySelector("#formulario");
const inputUsuario = dom.querySelector("#username");
const inputContraseña = dom.querySelector("#password");

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombreUsuario = inputUsuario.value.trim();
    const contraseña = inputContraseña.value.trim();

    // Validación de campos vacíos
    if (!nombreUsuario || !contraseña) {
        alert("Por favor, ingrese la identificacion de usuario y la contraseña.");
        return;
    }

    // Obtener lista de usuarios
    const usuarios = await solicitud(usuario);
    
    // Buscar el usuario por nombre
    const usuarioEncontrado = usuarios.find(user => user.id === nombreUsuario);

    if (!usuarioEncontrado) {
        alert("Nombre de usuario no encontrado.");
        return;
    }

    // Validar la contraseña
    if (usuarioEncontrado.contrasena !== contraseña) {
        alert("Contraseña incorrecta.");
        return;
    }

    if(usuarioEncontrado.estado !== "ACTIVO"){
        alert("Usuario Inactivo")
    }

    // Guardo en localStorage el id se usuario
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));

    // Validar el rol y redirigir según corresponda
    if (usuarioEncontrado.rol == 2) {
        window.location.href = "../venta/ventaAdmin.html";

    } else if (usuarioEncontrado.rol == 1) { 
        console.log("hola") 
        window.location.href = "";
    } else{
        console.log("fallo");
        
    }
});

