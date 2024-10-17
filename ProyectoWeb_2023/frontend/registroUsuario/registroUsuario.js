function redirectToHomePage() {
    window.location.href = "../inicioSesion/inicioSesion.html";
}


window.onload = function() {
  const formulario=document.getElementById("formulario");
  formulario.addEventListener("submit",enviarFormulario);
};


async function enviarFormulario(evento) {
  evento.preventDefault();
  try { 
      const correoElectronico = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const nombre = document.getElementById("name").value;
      const apellido = document.getElementById("lastname").value;
      const usuario = document.getElementById("usuario").value;

      if (correoElectronico === "" || password === "" || nombre === "" || apellido === "" || usuario === "" ) {
          alert("Faltan datos");
          return;
      }

      const respuesta = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
              "Content-Type": "application/json" 
          },
          body: JSON.stringify({
              correoElectronico: correoElectronico,
              password: password, // undefined
              nombre: nombre,
              apellido: apellido, 
              usuario: usuario,

          })  
      }); 

      if (respuesta.status === 201) {
          alert("Usuario creado");
          window.location.href = "../inicioSesion/inicioSesion.html";
        }

  } catch (error) {
      alert("Error al crear el usuario");
      console.error(error);
  }

}

