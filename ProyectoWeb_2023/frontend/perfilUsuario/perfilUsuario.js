window.onload = function () {
  // Llamar a esta función para obtener y llenar los datos del perfil del usuario al cargar la página
  obtenerDatosPerfilUsuario();
};

async function obtenerDatosPerfilUsuario() {
  try {
    // Obtener datos del perfil del usuario desde el servidor
    const correoElectronico = localStorage.getItem("usuario");
    const respuestaPerfilUsuario = await fetch(`http://localhost:3000/users/email/${correoElectronico}/perfil`);
    const perfilUsuario = await respuestaPerfilUsuario.json();

    // Verificar si obtuviste un objeto del perfil del usuario
    if (perfilUsuario && perfilUsuario.nombre) {
      // Llenar los campos del formulario con los datos del perfil del usuario
      document.getElementById("name").value = perfilUsuario.nombre || "";
      document.getElementById("lastname").value = perfilUsuario.apellido || "";
      document.getElementById("usuario").value = perfilUsuario.usuario || "";
      document.getElementById("email").value = perfilUsuario.correoElectronico || "";

      // Agregar el botón de cierre de sesión
      const cerrarSesionButton = document.createElement("button");
      cerrarSesionButton.textContent = "Cerrar Sesión";
      cerrarSesionButton.addEventListener("click", cerrarSesion);
      document.getElementById("formulario").appendChild(cerrarSesionButton);
    } else {
      console.error("No se encontró ningún perfil de usuario registrado.");
    }
  } catch (error) {
    console.error("Error al obtener datos del perfil del usuario:", error);
  }
}

function cerrarSesion() {
  // Elimina el usuario del almacenamiento local u realiza cualquier otra acción necesaria
  localStorage.removeItem("usuario");
  
  // Redirige a la página de inicio de sesión
  window.location.href = "../landingPage/landingProducto.html";
}
