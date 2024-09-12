/*function escogerHorario () {
    const horario = document.getElementById('horario');
    const seccion2 = document.getElementById('seccion2');

    horarioSeleccionado = Array.from(horario.selectedOptions);
    
    horarioSeleccionado.forEach(horario => {
        horario.appendChild(horario, seccion2);
    })
}*/



function moverCurso() {

    const seccion1 = document.getElementById('seccion1');
    const horario = document.getElementById('horario');

    //const list = [];
    //const list2=[];

    const cursosSeleccionados = Array.from(seccion1.selectedOptions);
    const horarioSeleccionado = Array.from(horario.selectedOptions);
    const contenedor = document.getElementById('seccion2');


    cursosSeleccionados.forEach(curso => {
        contenedor.appendChild(curso);
    })
    horarioSeleccionado.forEach(horario => {
        contenedor.appendChild(horario);
    })

    

    //contenedor.appendChild(seccion1);
    //contenedor.appendChild(horario);
}

function borrarCurso() {

    const seccion1 = document.getElementById('seccion1');
    const seccion2 = document.getElementById('seccion2');
    const horario = document.getElementById('horario');

    const cursosSeleccionados = Array.from(seccion2.selectedOptions);

    cursosSeleccionados.forEach(curso => {
        seccion2.removeChild(curso);
        seccion1.appendChild(curso);   
    })
}