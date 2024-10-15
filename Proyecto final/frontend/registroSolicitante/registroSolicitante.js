function redirectToHomePage() {
    window.location.href = "./registroSolicitante.html";
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
      const apellidos = document.getElementById("lastname").value;
      const fechaNacimiento = document.getElementById("date").value;
      const numContacto = document.getElementById("phone").value;
      const direccion = document.getElementById("address").value;
      const curriculum = document.getElementById("curriculum").value;
      const puesto = document.getElementById("puesto").value;

if (!correoElectronico || !password || !nombre || !apellidos || !fechaNacimiento || !numContacto || !direccion || !curriculum || !puesto) {          
    alert("Faltan datos");
          return;
      }

      const respuesta = await fetch("http://localhost:3000/solicitantes", {
          method: "POST",
          headers: {
              "Content-Type": "application/json" 
          },
          body: JSON.stringify({
              correoElectronico: correoElectronico,
              password: password, // undefined
              nombre: nombre,
              apellidos: apellidos, 
              fechaNacimiento: fechaNacimiento,
              numContacto: numContacto,
              direccion: direccion,
              curriculum: curriculum,
              puesto: puesto

          })  
      }); 

      if (respuesta.status === 201) {
          alert("Usuario creado");
          
          // borramos los datos del formulario
          document.getElementById("email").value = "";
          document.getElementById("password").value = "";
          document.getElementById("name").value = "";
          document.getElementById("lastname").value = "";
          document.getElementById("date").value = "";
          document.getElementById("phone").value = "";
          document.getElementById("address").value = "";
          document.getElementById("curriculum").value = "";
          document.getElementById("puesto").value = "";

          
          // Abrimos blank el resultado de la busqueda


          window.location.href = "../listaSolicitantes/resultadoBusqueda.html","blank";
        }

  } catch (error) {
      alert("Error al crear el usuario");
      console.error(error);
  }

}

