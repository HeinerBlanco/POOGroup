// resultadoBusqueda.js

window.onload = function () {

  mostrarResultados(); // Llama a la función para mostrar 
  //los resultados todo bien
};
async function reservarNegocio(idNegocio) {
  try {
    // Obtén los detalles del negocio usando el ID
    const respuesta = await fetch(`http://localhost:3000/negocios/${idNegocio}`);
    const negocio = await respuesta.json();

    // Construye los datos de la reserva
    const datosReserva = {
      negocioId: negocio.id, // Ajusta esto según la estructura de tu objeto negocio
      // Otros datos de la reserva
    };

    // Realiza la solicitud para reservar
    const respuestaReserva = await fetch("http://localhost:3000/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosReserva),
    });

    if (respuestaReserva.status === 201) {
      alert("Reserva realizada con éxito");
      // Puedes realizar acciones adicionales después de hacer la reserva
    } else {
      console.error("Error al realizar la reserva:", respuestaReserva.status);
    }
  } catch (error) {
    console.error("Error al realizar la reserva:", error);
  }
}








async function mostrarResultados() {
  try {
    // Obtén el valor de la provincia seleccionada
    const provinciaSeleccionada = document.getElementById("provincia").value;

    // Construye la URL con la provincia seleccionada
    const url = `http://localhost:3000/negocios/provincia/${provinciaSeleccionada}`;

    // Realiza la solicitud a la API
    const respuesta = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verifica el estado de la respuesta
    if (respuesta.status === 200) {
      // Procesar la respuesta si la solicitud fue exitosa
      const negocios = await respuesta.json();
      console.log("Negocios encontrados", negocios);
    } else {
      // Manejar el error si la solicitud no fue exitosa
      console.error("Error al obtener negocios:", respuesta.status);
    }
  } catch (error) {
    console.error("Error al realizar la búsqueda de negocios:", error);
  }
}

async function mostrarResultados() {
  try {
    // Obtén los negocios desde la API (puedes ajustar la URL según tu estructura)
    const respuesta = await fetch("http://localhost:3000/negocios");

    const negocios = await respuesta.json();

    const listaNegocios = document.getElementById("listaNegocios");




    listaNegocios.innerHTML = "";

    // Agregar cada negocio a la lista
    negocios.forEach((negocio) => {

      const negocioElemento = document.createElement("li");
      negocioElemento.classList.add("negocio");

      const nombreNegocio = document.createElement("h2");
      nombreNegocio.textContent = negocio.nombreNegocio;

      const descripcion = document.createElement("h3");
      descripcion.textContent = negocio.descripcion; 

      const provincia = document.createElement("h4");
      provincia.textContent = `Ubicacion:  ${negocio.provincia}`;

      const button = document.createElement("button");

      const contacto = document.createElement("h4");
      contacto.textContent = `Contacto: ${negocio.contacto}`;

      const buttonReservar = document.createElement("button");
      buttonReservar.textContent = "RESERVAR";
      
      
      buttonReservar.addEventListener("click", () => reservarNegocio(negocio.id));

      negocioElemento.appendChild(nombreNegocio);
      negocioElemento.appendChild(descripcion);
      negocioElemento.appendChild(provincia);
      negocioElemento.appendChild(contacto);
      negocioElemento.appendChild(document.createElement("hr")); 
      negocioElemento.appendChild(buttonReservar);
      listaNegocios.appendChild(negocioElemento);

    });
  } catch (error) {
    console.error("Error al obtener y mostrar los negocios:", error);
  }
}

// Guarda el negocio en la base de datos con el boton de "reservar"


