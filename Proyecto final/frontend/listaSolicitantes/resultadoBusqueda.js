// app.js

// Función para obtener los solicitantes desde la API y mostrarlos
async function cargarSolicitantes() {
  try {
      const respuesta = await fetch("http://localhost:3000/solicitantes", {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      });

      if (respuesta.ok) {
          const solicitantes = await respuesta.json();
          mostrarSolicitantes(solicitantes);
      } else {
          console.error("Error al obtener los solicitantes", respuesta.status);
      }
  } catch (error) {
      console.error("Error en la solicitud", error);
  }
}

// Función para mostrar los solicitantes en la lista
function mostrarSolicitantes(solicitantes) {
  const lista = document.getElementById("solicitantes");
  lista.innerHTML = ""; // Limpia la lista antes de agregar los solicitantes

  solicitantes.forEach((solicitante) => {
      const item = document.createElement("li");

      const nombre = document.createElement("h3");
      nombre.textContent = `${solicitante.nombre} ${solicitante.apellidos}`;

      const email = document.createElement("p");
      email.textContent = `Correo electrónico: ${solicitante.correoElectronico}`;

      const telefono = document.createElement("p");
      telefono.textContent = `Teléfono: ${solicitante.numContacto}`;

      const direccion = document.createElement("p");
      direccion.textContent = `Dirección: ${solicitante.direccion}`;

      item.appendChild(nombre);
      item.appendChild(email);
      item.appendChild(telefono);
      item.appendChild(direccion);
      lista.appendChild(item);
  });
}

// Llamar a la función cargarSolicitantes cuando la página cargue
window.onload = function () {
  cargarSolicitantes();

  // Actualizar la lista cada cierto tiempo para que refleje los cambios
  setInterval(cargarSolicitantes, 5000); // Actualiza cada 5 segundos
};
