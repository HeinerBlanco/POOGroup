async function obtenerUsuarioPorCorreo(correo) {
  try {
    const respuesta = await fetch(`http://localhost:3000/users/email/${correo}`);
    const usuario = await respuesta.json();

    document.getElementById("nombreUsuario").textContent = usuario.nombre;
    console.log(usuario);

    //Almaceno el nombre del usuario en el local storage
    localStorage.setItem("nombreUsuario", usuario.nombre);
  } catch (error) {
    console.error(error);
  }
}

async function enviarFormulario(evento) {
  evento.preventDefault();
  try {
    const correoInicioSesion = document.getElementById("correoElectronico").value;
    const passwordInicioSesion = document.getElementById("password").value;

    if (correoInicioSesion === "" || passwordInicioSesion === "") {
      alert("Por favor ingrese todos los datos");
      return;
    }

    const respuesta = await fetch(`http://localhost:3000/users/email/${correoInicioSesion}`);
    
    if (respuesta.status === 200) {
      const usuario = await respuesta.json();
      alert(`Bienvenido ${usuario.nombre} ${usuario.apellido}`);
      
      // Llama a la función para obtener el usuario por correo
      obtenerUsuarioPorCorreo(correoInicioSesion);

      localStorage.setItem("usuario", correoInicioSesion);
      localStorage.getItem("usuario");

      window.location.href = "../alojamiento/alojamiento.html";
    } else if (respuesta.status === 404) {
      alert("Correo o contraseña incorrectos");
    } else {
      alert("Correo o contraseña incorrectos");
    }
  } catch (error) {
    alert("Correo o contraseña incorrectos"); 
    console.error(error); 
  }
} 

window.onload = function () {
  const formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", enviarFormulario);
};