document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.querySelector('#formulario');
  const resultado = document.querySelector('#resultado');

  const inputs = {
    nombre: document.querySelector('#nombre'),
    correo: document.querySelector('#correo'),
    edad: document.querySelector('#edad'),
    curso: document.querySelector('#curso')
  };

  function setError(groupId, errorId, message) {
    const group = document.getElementById(groupId);
    const errorSpan = document.getElementById(errorId);
    if (group) {
      group.classList.remove('success');
      group.classList.add('error');
    }
    if (errorSpan) errorSpan.innerText = message;
  }

  function setSuccess(groupId, errorId) {
    const group = document.getElementById(groupId);
    const errorSpan = document.getElementById(errorId);
    if (group) {
      group.classList.remove('error');
      group.classList.add('success');
    }
    if (errorSpan) errorSpan.innerText = '';
  }

  // Validaciones individuales
  function validarNombre() {
    const val = inputs.nombre.value.trim();
    if (!val || val.length < 3) {
      setError('group-nombre', 'error-nombre', 'El nombre debe tener al menos 3 caracteres.');
      return false;
    }
    setSuccess('group-nombre', 'error-nombre');
    return true;
  }

  function validarCorreo() {
    const val = inputs.correo.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val || !regexEmail.test(val)) {
      setError('group-correo', 'error-correo', 'Ingrese un correo electrónico válido.');
      return false;
    }
    setSuccess('group-correo', 'error-correo');
    return true;
  }

  function validarEdad() {
    const val = inputs.edad.value.trim();
    const edad = parseInt(val, 10);
    if (!val || isNaN(edad) || edad < 14) {
      setError('group-edad', 'error-edad', 'La edad debe ser al menos 14 años.');
      return false;
    }
    setSuccess('group-edad', 'error-edad');
    return true;
  }

  function validarCurso() {
    if (!inputs.curso.value) {
      setError('group-curso', 'error-curso', 'Debe seleccionar un curso de interés.');
      return false;
    }
    setSuccess('group-curso', 'error-curso');
    return true;
  }

  function validarModalidad() {
    const modalidad = document.querySelector('input[name="modalidad"]:checked');
    if (!modalidad) {
      setError('group-modalidad', 'error-modalidad', 'Debe seleccionar una modalidad.');
      return null;
    }
    setSuccess('group-modalidad', 'error-modalidad');
    return modalidad.value;
  }

  // Escuchadores para validación en tiempo real
  inputs.nombre.addEventListener('input', validarNombre);
  inputs.correo.addEventListener('input', validarCorreo);
  inputs.edad.addEventListener('input', validarEdad);

  // Bloqueo de teclas no numéricas en el campo Edad (evita el signo menos)
  inputs.edad.addEventListener('keydown', (e) => {
    if (['-', '+', 'e', 'E', '.', ','].includes(e.key)) {
      e.preventDefault();
    }
  });

  inputs.curso.addEventListener('change', validarCurso);

  document.querySelectorAll('input[name="modalidad"]').forEach(radio => {
    radio.addEventListener('change', validarModalidad);
  });

  // Evento Submit
  formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    const vNombre = validarNombre();
    const vCorreo = validarCorreo();
    const vEdad = validarEdad();
    const vCurso = validarCurso();
    const modValue = validarModalidad();

    if (!vNombre || !vCorreo || !vEdad || !vCurso || !modValue) {
      resultado.className = 'mensaje-box error-summary';
      resultado.innerHTML = '<strong>Por favor corrige los errores señalados en rojo antes de continuar.</strong>';
      return;
    }

    const nombreVal = inputs.nombre.value.trim();
    const cursoVal = inputs.curso.value;

    resultado.className = 'mensaje-box exito';
    resultado.innerHTML = `¡Gracias, <strong>${nombreVal}</strong>! Tu inscripción al curso de <strong>${cursoVal}</strong> (${modValue}) se ha validado correctamente.`;
  });

  // Evento Reset (Botón Limpiar)
  formulario.addEventListener('reset', function() {
    resultado.className = 'mensaje-box hidden';
    resultado.innerHTML = '';
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('error', 'success');
    });
    document.querySelectorAll('.error-text').forEach(span => {
      span.innerText = '';
    });
  });
});