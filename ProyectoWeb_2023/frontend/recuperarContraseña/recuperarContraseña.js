

window.onload = function () {
    const cajaRecuperar = document.getElementById("cajaRecuperar");
      cajaRecuperar.innerHTML = `

      <label class="label" for="recuperarContraseña">Ingrese su correo electronico de recuperacion</label>
      <input style="margin-top: 70px;width: 600px;" id="recuperarContraseña" type="email" required>
      <button class="boton" type="submit">Enviar</button>

      `;


    }