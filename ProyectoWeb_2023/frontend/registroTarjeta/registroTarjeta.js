
window.onload = function() {
  const formulario=document.getElementById("formulario");
  formulario.addEventListener("submit",enviarFormulario);
};


async function enviarFormulario(evento) {
  evento.preventDefault();
  try { 
      const nombre = document.getElementById("nombre").value;
      const numero = document.getElementById("numero").value;
      const fecha = document.getElementById("fecha").value;
      const year = document.getElementById("year").value;
      const codigo = document.getElementById("codigo").value;

      if (nombre === "" || numero === "" ||  fecha === "" || year === "" || codigo === "") {
          alert("Faltan datos");
          return;
      }

      const respuesta = await fetch("http://localhost:3000/tarjetas", {
          method: "POST",
          headers: {
              "Content-Type": "application/json" 
          },
          body: JSON.stringify({
              nombre: nombre,
              numero: numero,
              fecha: fecha,
              year: year, // undefined
              codigo: codigo,

          })  
      }); 

      if (respuesta.status === 201) {
          alert("Usuario creado");
      }

  } catch (error) {
      alert("Error al crear el usuario");
      console.error(error);
  }



}

