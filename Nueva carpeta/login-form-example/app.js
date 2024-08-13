const botonRegistrarse = document.getElementById('registrarse');
const botonIniciarSesion = document.getElementById('iniciarSesion');
const contenedor = document.getElementById('contenedor');

// Evento para abrir formulario de registro
botonRegistrarse.addEventListener('click', () =>
  contenedor.classList.add('panel-derecha-activa')
);

// Evento para regresar al formulario de iniciar sesión
botonIniciarSesion.addEventListener('click', () =>
  contenedor.classList.remove('panel-derecha-activa')
);