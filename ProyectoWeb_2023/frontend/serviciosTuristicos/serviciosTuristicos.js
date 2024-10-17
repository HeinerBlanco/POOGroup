window.onload = function () {
  mostrarResultados("Servicios Turisticos"); // Llama a la función para mostrar los resultados
};

async function mostrarResultados(categoriaFiltrada) {
  try {
      // Obtén los negocios desde la API (puedes ajustar la URL según tu estructura)
      const respuesta = await fetch('http://localhost:3000/negocios');
      const negocios = await respuesta.json();

      const listaNegocios = document.getElementById("listaNegocios");

      listaNegocios.innerHTML = "";

      // Filtrar negocios por categoría
      const negociosFiltrados = categoriaFiltrada ?
          negocios.filter(negocio => negocio.categoria === categoriaFiltrada) :
          negocios;

      // Agregar cada negocio a la lista
      negociosFiltrados.forEach((negocio) => {
          const negocioElemento = document.createElement("li");
          negocioElemento.classList.add("negocio");

          const nombreNegocio = document.createElement("h2");
          nombreNegocio.textContent = negocio.nombreNegocio;

          const descripcion = document.createElement("h3");
          descripcion.textContent = negocio.descripcion;

          const provincia = document.createElement("h4");
          provincia.textContent = `Ubicacion: ${negocio.provincia}`;

          const categoria = document.createElement("h4");
          categoria.textContent = `Categoria: ${negocio.categoria}`;

          const contacto = document.createElement("h4");
          contacto.textContent = `Contacto: ${negocio.contacto}`;

          const buttonReservar = document.createElement("button");
          buttonReservar.textContent = "RESERVAR";

          buttonReservar.addEventListener("click", () => reservarNegocio(
              nombreNegocio.textContent,
              descripcion.textContent,
              provincia.textContent,
              categoria.textContent,
              contacto.textContent
          ));
          negocioElemento.appendChild(nombreNegocio);
          negocioElemento.appendChild(descripcion);
          negocioElemento.appendChild(provincia);
          negocioElemento.appendChild(categoria);
          negocioElemento.appendChild(contacto);
          negocioElemento.appendChild(document.createElement("hr"));
          negocioElemento.appendChild(buttonReservar);
          listaNegocios.appendChild(negocioElemento);
      });
  } catch (error) {
      console.error("Error al obtener y mostrar los negocios:", error);
  }
}

async function reservarNegocio(nombreNegocio,descripcion,provincia,categoria,contacto ) {
  try {
      //  objeto con la información de la reserva
      const reserva = {
          nombreNegocio: nombreNegocio,
          descripcion: descripcion,
          provincia: provincia,
          categoria: categoria,
          contacto: contacto,
      };

      // Realiza la solicitud al servidor para almacenar la reserva
      const respuesta = await fetch('http://localhost:3000/reserva', {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(reserva)
      });

      if (respuesta.ok) {
          alert("Negocio reservado con éxito");
      } else {
          alert("Error al reservar el negocio");
          console.error(respuesta.statusText);
      }
  } catch (error) {
      alert("Error al reservar el negocio");
      console.error(error);
  }
};