async function obtenerTodosLosUsuariosYNegocios() {
    try {
        // Obtener usuarios
        const respuestaUsuarios = await fetch("http://localhost:3000/users");
        const usuarios = await respuestaUsuarios.json();

        // Obtener negocios
        const respuestaNegocios = await fetch("http://localhost:3000/negocios");
        const negocios = await respuestaNegocios.json();

        // Aquí puedes manipular la respuesta, por ejemplo, agregarlos a una tabla HTML
        const tablaUsuarios = document.getElementById("tablaUsuarios");

        // Limpiar la tabla antes de agregar nuevos datos
        tablaUsuarios.innerHTML = "";

        // Agregar los títulos
        const titulos = document.createElement("tr");
        titulos.innerHTML = `
            <th class="checkbox"><input type="checkbox" name="" id=""></th>
            <th>Usuarios</th>
            <th>Negocios</th>
        `;
        tablaUsuarios.appendChild(titulos);

        // Calcular el número máximo de filas entre usuarios y negocios
        const numeroMaximoFilas = Math.max(usuarios.length, negocios.length);

        // Agregar filas según el número máximo de filas
        for (let i = 0; i < numeroMaximoFilas; i++) {
            const fila = document.createElement("tr");

            // Puedes agregar más columnas según tus necesidades
            const columnaCheckbox = document.createElement("td");
            columnaCheckbox.innerHTML = '<input type="checkbox" name="" id="">';

            // Agregar información de usuarios si hay una fila correspondiente
            const columnaUsuario = document.createElement("td");
            if (i < usuarios.length) {
                columnaUsuario.textContent = usuarios[i].usuario;
            } else {
                columnaUsuario.textContent = ''; // Rellenar con vacío si no hay datos
            }

            // Agregar información de negocios si hay una fila correspondiente
            const columnaNegocios = document.createElement("td");
            if (i < negocios.length) {
                columnaNegocios.textContent = negocios[i].nombreNegocio;
            } else {
                columnaNegocios.textContent = ''; // Rellenar con vacío si no hay datos
            }

            fila.appendChild(columnaCheckbox);
            fila.appendChild(columnaUsuario);
            fila.appendChild(columnaNegocios);

            // Agregar la fila a la tabla
            tablaUsuarios.appendChild(fila);
        }
    } catch (error) {
        console.error("Error al obtener usuarios y negocios:", error);
    }
}

// Llamar a la función para obtener y mostrar todos los usuarios y negocios


obtenerTodosLosUsuariosYNegocios();

