let cursosSeleccionados = []; // Arreglo para almacenar los cursos seleccionados y sus horarios

// Función para escoger un curso
function agregarCurso() {
    const cursoSelect = document.getElementById('curso');
    const cursoSeleccionado = cursoSelect.options[cursoSelect.selectedIndex];

    // Validación para seleccionar un curso
    if (!cursoSeleccionado) {
        Swal.fire('Por favor, selecciona un curso');
        return;
    }

    // Ventana emergente para seleccionar el horario
    Swal.fire({
        title: 'Selecciona un horario',
        input: 'select',
        inputOptions: {
            'Mañana': 'Mañana',
            'Tarde': 'Tarde',
            'Noche': 'Noche'
        },
        inputPlaceholder: 'Selecciona un horario',
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
        preConfirm: (horario) => {
            if (!horario) {
                Swal.showValidationMessage('Debes seleccionar un horario');
            }
            return horario;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const horarioSeleccionado = result.value;
            agregarACursosSeleccionados(cursoSeleccionado.text, horarioSeleccionado); // Pasar el texto del curso
        }
    });
}

// Función para agregar un curso seleccionado
function agregarACursosSeleccionados(curso, horario) {
    const listaCursos = document.getElementById('cursosSeleccionados');

    // Crear un nuevo elemento de lista para el curso y horario
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    li.textContent = `${curso} / Horario: ${horario}`;

    // Crear botón de eliminar con margen a la izquierda
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add('btn', 'btn-danger');

    // Establecer el margen izquierdo
    botonEliminar.style.marginLeft = '10px';

    botonEliminar.onclick = function () {
        listaCursos.removeChild(li);
        mostrarCurso(curso); // Volver a mostrar el curso en la lista original
        cursosSeleccionados = cursosSeleccionados.filter(cursoObj => cursoObj.curso !== curso); // Eliminar del array
    };

    li.appendChild(botonEliminar);
    listaCursos.appendChild(li);

    // Ocultar el curso una vez agregado
    ocultarCurso(curso);

    // Guardar curso y horario en el array de cursos seleccionados
    cursosSeleccionados.push({ curso: curso, horario: horario });
}

// Función para ocultar un curso
function ocultarCurso(curso) {
    const cursoSelect = document.getElementById('curso');
    for (let option of cursoSelect.options) {
        if (option.text === curso) {
            option.style.display = 'none'; // Ocultar el curso seleccionado
        }
    }
}

// Función para mostrar un curso
function mostrarCurso(curso) {
    const cursoSelect = document.getElementById('curso');
    for (let option of cursoSelect.options) {
        if (option.text === curso) {
            option.style.display = ''; // Volver a mostrar el curso
        }
    }
}

function finalizarMatricula() {
    // Verificar si hay cursos seleccionados
    if (cursosSeleccionados.length > 0) {
        // Crear una cadena HTML para la lista de cursos seleccionados con su horario en verde
        const listaHTML = cursosSeleccionados.map(cursoObj => 
            `<li>${cursoObj.curso} - <span style="color: green;">(${cursoObj.horario})</span></li>`
        ).join('');

        // Mostrar la lista de cursos seleccionados en una ventana emergente
        Swal.fire({
            title: 'Cursos Seleccionados',
            html: `<ol style="text-align: left;">${listaHTML}</ol>`, // Agregar la lista de cursos en formato HTML
            icon: 'info',
            confirmButtonText: 'OK'
        }).then(() => {
            // Mostrar mensaje final de matrícula finalizada después de mostrar los cursos seleccionados
            Swal.fire({
                title: 'Matrícula Finalizada',
                text: '¡Gracias por completar tu matrícula!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Recargar la página cuando el usuario confirma la matrícula finalizada
                window.location.reload();
            });
        });
    } else {
        // Mostrar mensaje si no hay cursos seleccionados
        Swal.fire({
            title: 'No hay cursos seleccionados',
            icon: 'warning'
        });
    }
}
