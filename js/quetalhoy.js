/**  funcionalidad que simula la interaccion visual del la pagina Quetalhoy  a efectos 
 del maquetado del formulario que se accede desde la foto de perfil en el header
 ** REVISAR OPTIMIZAR PARA EL DESARROLLO DE LOS COMPONENTES EN REACT/VUE
 ** AGREGAR CONTROL Y VALIDACION DE ERROR**
 ***********************************************************************/


var logros = 0;
/** Cuando se completan las 16 preguntas automaticamente envia los resultados
 *  y despliega el pop up. 
 *  
 * 
 */

window.addEventListener("click", function () {
    senData();
})
/**
 * Carga los datos de las conductas a evaluar de un json (fake api) hosteado en NPOINT
 * no necesita token de acceso
 * **/

async function inicia() {
    const newLocal = 'https://api.npoint.io/4f37f4cd335b1cbca819/items';
    let ItemHtml = '';
    fetch(newLocal)
        .then(response => response.json())
        .then(items => {
            items.forEach(item => {
                ItemHtml = ItemHtml + loadItemHtml(item);
            })
            let iTemsObj = document.getElementById('items')
            iTemsObj.innerHTML = ItemHtml;
        })
        .catch(err => {
            console.log(err)
        })
}
/**
 * Arma el HTML dinamicamente, con los datos de la la Fake Api
 * 
 * **/
function loadItemHtml(item) {
    let itemTemplateHTML =
        `<div class="item borderimg2" style="background-image:url('images/${item.pref}')">
            <div class="img-overlay">
              <img class="icon"  id="quest_${item.id}">
            </div>
            <div class="overlay">
                <div class="text">${item.value}</div>
                <div class="img-overlay">
                  <img class="icon-frown red" src="images/baddaytrans.png" id="frown_${item.id}" onClick="setValue(this,'${item.id}')">
                  <img class="icon-meh yellow"src="images/sadtrans.png" id="meh_${item.id}" onClick="setValue(this,'${item.id}')")>
                  <img class="icon-laugh green" src="images/goodtrans.png" id="laugh_${item.id}" onClick="setValue(this,'${item.id}')">
                </div> 
            </div>
          </div>`
    return itemTemplateHTML;
}
/****
 *Cambia el icono y va guardando los valores correspondienyes
 * 
 *  
 ****/

function setValue(object, num) {

    let questDef = '';
    resetValue(`quest_${num}`, "");
    if (object.classList.contains('selected')) {
        questDef = 'icon';
    }
    object.classList.toggle('selected');

    switch (object.id) {
        case `frown_${num}`:
            resetValue(`meh_${num}`, 'selected');
            resetValue(`laugh_${num}`, 'selected');
            setClass(`quest_${num}`, questDef == '' ? 'red,icon' : questDef);
            break;
        case `meh_${num}`:
            resetValue(`laugh_${num}`, 'selected');
            resetValue(`frown_${num}`, 'selected');
            setClass(`quest_${num}`, questDef == '' ? 'yellow,icon' : questDef);
            break;
        case `laugh_${num}`:
            resetValue(`frown_${num}`, 'selected');
            resetValue(`meh_${num}`, 'selected');
            setClass(`quest_${num}`, questDef == '' ? "green,icon" : questDef);
            break;
        default:
            break;
    }
}
/**
 * Reset del icono 
 * 
 * */  
function resetValue(object, className) {
    var obj = document.getElementById(object);
    if (className != '') {
        let classlist = className.split(',');
        classlist.forEach(clas => {
            if (obj.classList.contains(clas)) {
                obj.classList.remove(clas);
            }
        })
        obj.classList.remove('selected');
    } else {
        obj.classList.remove(...obj.classList);
    }
}
/**
 * Agrega un array las clases css 
 * 
 * ***/

function setClass(object, className) {
    var obj = document.getElementById(object);
    let arr = className.split(',');
    arr.forEach(c => {
        obj.classList.add(c);
    })
}
/**
 * 
 * **/

function senData() {
    
    var objSelected = document.getElementsByClassName('selected');
    //var objFrown = document.getElementsByClassName('selected red');
    //var objMeh = document.getElementsByClassName('selected yellow');
    var objLoudgh = document.getElementsByClassName('selected green');
    
    var openmodal = document.getElementById('openmodal');
    
    if (objSelected.length == 16) {
        document.getElementById('logros').textContent = objLoudgh.length;
        openmodal.click();
    }
}
/** *
call carga de pagina
**/
inicia();