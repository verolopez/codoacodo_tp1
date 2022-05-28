/**  funcionalidad que simula la interaccion visual del login/logout a efectos 
 del maquetado del formulario que se accede desde la foto de perfil en el header
 ** REVISAR OPTIMIZAR PARA EL DESARROLLO DE LOS COMPONENTES EN REACT/VUE
 ** AGREGAR CONTROL Y VALIDACION DE ERROR**
 ***********************************************************************/
var mail='';
    
function setUserLoged() {
  // Get the button that opens the modal
  var btn = document.getElementById("user");
  var modalid = 'modal-logout';
  var i = 1;
  if (btn.classList.contains('userlogout')) {
    var modalid = 'modal-logout';
    i = 1;//btnclose 1
  } else {
    modalid = 'modal-login';
    i = 0; 
  }
  var modal = document.getElementById(modalid);
  var span = document.getElementsByClassName("close")[i];
  modal.style.display = "block";
       
  span.onclick = function () {
    modal.style.display = "none";
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
/** Cambie el icono de usuario logged/logout
 *   cambiando de clase css
 * **/
function setClass(object, className)  {

  var obj = document.getElementById(object);
  
  let arr = className.split(',');
  
  arr.forEach(c => {
    obj.classList.toggle(c);
  })
}

//me loguee
function toggleLog(modalid) {
  var modal = document.getElementById(modalid);
  modal.style.display = "none";    
}
/*************************************************
 * valida formato de mail con expresiones regulares
 * Agregar en eventos on key up , onclick 
 * ************************************************/

function validarEmail(valor) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valor)) {
    obj = document.getElementById('lblerr');
    obj.innerText = '';
    objbtn = document.getElementById('btnLogin').removeAttribute('disabled');
    return true
  } else {
    obj = document.getElementById('lblerr');
    obj.innerText = 'La direccion de email es incorrecta.';
    objbtn = document.getElementById('btnLogin').setAttribute('disabled', 'true');
    return false
  }
}

