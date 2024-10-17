window.onload = function () {
    mostrarReservas(); // Llama a la función para mostrar las reservas
};

async function mostrarReservas() {
    try {
        // Obtén las reservas desde la API (puedes ajustar la URL según tu estructura)
        const respuesta = await fetch('http://localhost:3000/reservas');
        const reservas = await respuesta.json();

        const listaReservas = document.getElementById("listaNegocios");

        listaReservas.innerHTML = "";

        // Verificar si hay reservas para mostrar
        if (reservas.length === 0) {
            const mensajeSinReservas = document.createElement('li');
            mensajeSinReservas.textContent = 'No hay reservas disponibles.';
            listaReservas.appendChild(mensajeSinReservas);
        } else {
            // Iterar sobre las reservas y agregarlas a la lista
            reservas.forEach(reserva => {
                const reservaElemento = document.createElement("li");
                reservaElemento.classList.add("reserva"); // Puedes usar una clase diferente para las reservas si lo prefieres

                const nombreNegocio = document.createElement("h2");
                nombreNegocio.textContent = `${reserva.nombreNegocio}`;

                const descripcion = document.createElement("h3");
                descripcion.textContent = `${reserva.descripcion}`;

                const provincia = document.createElement("h4");
                provincia.textContent = `${reserva.provincia}`;

                const categoria = document.createElement("h4");
                categoria.textContent = `${reserva.categoria}`;

                const contacto = document.createElement("h4");
                contacto.textContent = `${reserva.contacto}`;

                // Puedes agregar más detalles según la estructura de datos de tus reservas

                reservaElemento.appendChild(nombreNegocio);
                reservaElemento.appendChild(descripcion);
                reservaElemento.appendChild(provincia);
                reservaElemento.appendChild(categoria);
                reservaElemento.appendChild(contacto);

                listaReservas.appendChild(reservaElemento);
            });
        }
    } catch (error) {
        console.error("Error al obtener y mostrar las reservas:", error);
    }
}