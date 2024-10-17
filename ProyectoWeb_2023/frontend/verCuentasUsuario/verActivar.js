async function obtenerDatosUsuarios() {
    try {
        // Obtener usuarios
        const respuestaUsuarios = await fetch("http://localhost:3000/users/cuentas");
        const usuarios = await respuestaUsuarios.json();

        // Llenar la tabla con los datos de los usuarios
        const tablaUsuarios = document.getElementById("tablaUsuarios");

        // Crear titulos si no existen
        if (!tablaUsuarios.querySelector("tr")) {
            const titulos = document.createElement("tr");
            titulos.innerHTML = `
                <th class="checkbox"><input type="checkbox" name="" id=""></th>
                <th>Correo Electrónico</th>
                <th>Password</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Usuario</th>
            `;
            tablaUsuarios.appendChild(titulos);
        }

        usuarios.forEach((usuario) => {
            const nuevaFila = document.createElement("tr");

            const columnaCheckbox = document.createElement("td");
            columnaCheckbox.innerHTML = '<input type="checkbox" name="" id="">';
            nuevaFila.appendChild(columnaCheckbox);

            // Iterar sobre los campos del usuario y crear celdas
            const campos = ['correoElectronico', 'password', 'nombre', 'apellido', 'usuario'];

            campos.forEach((campo) => {
                const nuevaColumna = document.createElement("td");
                nuevaColumna.textContent = usuario[campo] || '';
                nuevaFila.appendChild(nuevaColumna);
            });

            // Agregar la nueva fila a la tabla
            tablaUsuarios.appendChild(nuevaFila);
        });
    } catch (error) {
        console.error("Error al obtener datos de usuarios:", error);
    }
}

// Llamar a la función para llenar la tabla con datos de usuarios
obtenerDatosUsuarios();