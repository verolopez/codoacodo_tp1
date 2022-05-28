/**  funcionalidad que simula la interaccion visual del la pagina Test.htm a efectos de maquetado
 ** REVISAR OPTIMIZAR PARA EL DESARROLLO DE LOS COMPONENTES EN REACT/VUE
 ** AGREGAR CONTROL Y VALIDACION DE ERROR**
 ***********************************************************************/

//array para guardar datos de configuracion
var answer_level_values = [];
/*inicia carga de pagina*/


inicia();


/**
 * Carga los datos de las conductas a evaluar de un json (fake api) hosteado en NPOINT
 * no necesita token de acceso
 * **/

async function inicia() {
    const newLocal = 'https://api.npoint.io/5a56ba98eb1289830f12/questions';
    let ItemsHtml = '';
    fetch(newLocal)
      .then(response => response.json())
      .then(items => {
         ItemsHtml = getTestHTM(items);
         let iTemsObj = document.getElementById('test')
         iTemsObj.innerHTML = ItemsHtml;
      })
      .catch(err => {
         console.log(err)
      })
  }
  

  function getCachedData() {
  
    //Solo lo busco la primera vez en conf.js
    if (answer_level_values.length == 0) {
        answer_level_values = Object.entries(answerlevel).map(function (entry) {
        key = entry[0];
        value = entry[1];
        nested_object = value;
        nested_object.key = key;
        return nested_object;
      });
    }
  }  
  /**Arma el HTML dinamico en funcion de los datos de la fake Api 
   * 
   * **/
  function getTestHTM(question) {
    
    let tempHtml = '';
    //Ordeno las preguntas por categoria para simplificar la recoleccion de respuestas
    const obj = sortData(question);
  
    //Cargo el array de categorias de preguntas con el objeto de cargarlos una solo vez de configuracion
    getCachedData();
    // Armo el HTML 
    for (let i = 0; i < obj.length; i++) {
       tempHtml = tempHtml + getQuestion(i + 1, obj[i].question, obj[i].type, obj.length);
    }
    return (tempHtml);
  }  
  /**
   * Genera HTNML pregunats solo es visible la primera
   * 
   * **/

  function getQuestion(num, question, type, total) {
  
    let display = '';
    let btnbackdisplay = '';
    let btnNextDisplay = '';
    let btnDisabled = '';/*para las prubas no deshabilito, default disabled*/
  
    if (num > 1) {
        display = 'display';
        btnDisabled = '';/** disabled aqui */
    } else {
        btnbackdisplay = 'display';
    }
    if (num == total) {
        btnNextDisplay = 'display';
        btnDisabled = '';
    }
    return (`<div id="test_container${num}" class="${display}">
    <div class="question" id="question_${num}">
       <h3>Pregunta #${num} de #${total}</h3>
       <span class="q-progress-container">
       <label for="file"></label>
       <progress id="file" value="${num}" max="${total}">1 </progress>
       </span>
       <p class="q-text">${question}</p>
    </div>` + getAnswerTypeTemplate(num, type) +
      `<div class="test-nav btn">
         <button class="btn btn-back ${btnbackdisplay}" id="btn_back${num}" onClick="btnBackOnClick(${num})">Prev</button>
         <button class="btn btn-continue ${btnNextDisplay}" id="btn_Next${num}" onClick="btnNextOnClick(${num})">Next</button>
         <button class="btn btn-response " ${btnDisabled} id="btn_Send" onClick="DrawChart()">Send</button>
    </div></div>            
  `);
  }
  /**
   * genera las opciones de respuestas por cada pregunta
   * 
   * **/
  function getAnswerTypeTemplate(num, type)  {
    let answer_level_html = `<div class="answer" id="answer_${num}"><p>Desacuerdo</p>`;
    answer_level_values.forEach(key => {
      answer_level_html = answer_level_html + `<a href="#" alt="${key.value}"
       title="${key.value}"><span class="${key.class} t_${type}" id="${key.pref}${num}" 
       value="${key.id}" onClick="setAnswer(this,${num})"></span></a>`
    });
    answer_level_html = answer_level_html + `<p>Acuerdo</p></div>`
    return (answer_level_html);
  }


  /***
   * Navegacion de preguntas
   * Back
   * **/
  function btnBackOnClick(num) {
    var qActual = document.getElementById(`test_container${num}`);
    qActual.classList.add('display');
    var qNext = document.getElementById(`test_container${num - 1}`);
    qNext.classList.remove('display');
  }
/**
 * Next
 * 
 * **/
  function btnNextOnClick(num) {

    var qActual = document.getElementById(`test_container${num}`);
    qActual.classList.add('display');
    var qNext = document.getElementById(`test_container${num + 1}`);
    qNext.classList.remove('display');

  }  
  
  /**
   * Calcula los resultados
   * @returns array con % por categoria para poder graficar
   * Obs:revisar calculos /
   */
  
  function senData() {
     let arrayData = [];
     for (var i = 1; i < 8; i++) {
        var obj = document.getElementsByClassName(`selected t_${i}`);
        var valor = 0;
      for (let j = 0; j < obj.length; j++) {
         var item = obj[j];
         valor = valor + parseInt(item.getAttribute('value'));
         if (j == obj.length - 1) {
            valor = (valor / obj.length) * 30;
         }
      }
      var data = {};
      data.type = i;
      data.valor = parseInt(valor);
      console.log(data.type + ' - ' + data.valor);
      arrayData.push({ ...data });
    }
    return arrayData;
  }
  
/**
 * resetea la respuesta seleccionada
 * 
 * 
*/

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
   * 
   * Setea la clase a la respuesta respuesta seleccionada  
   */
  
    function setValue(object, className) {
      var obj = document.getElementById(object);
      let arr = className.split(',');
      arr.forEach(c => {
          obj.classList.add(c);
       })
     }     
/*** 
 * Setea y resetea el icono segun corresponda la opcion elegida
 * 
 */

  function setAnswer(object, num) {

    switch (object.id) {
      case `Q_MD_${num}`:
        object.classList.toggle('selected');
        object.classList.toggle('answer-icon-vd');
        resetValue(`Q_D_${num}`, 'answer-icon-d,selected');
        resetValue(`Q_PA_${num}`, 'answer-icon-n,selected');
        resetValue(`Q_A_${num}`, 'answer-icon-a,selected');
        resetValue(`Q_MA_${num}`, 'answer-icon-va,selected');
        break;
      case `Q_D_${num}`:
        object.classList.toggle('selected');
        object.classList.toggle('answer-icon-d');
        resetValue(`Q_MD_${num}`, 'answer-icon-vd,selected');
        resetValue(`Q_PA_${num}`, 'answer-icon-n,selected');
        resetValue(`Q_A_${num}`, 'answer-icon-a,selected');
        resetValue(`Q_MA_${num}`, 'answer-icon-va,selected');
        break;
      case `Q_PA_${num}`:
        resetValue(`Q_MD_${num}`, 'answer-icon-vd,selected');
        resetValue(`Q_D_${num}`, 'answer-icon-d,selected');
        object.classList.toggle('selected');
        object.classList.toggle('answer-icon-n');
        resetValue(`Q_A_${num}`, 'answer-icon-a,selected');
        resetValue(`Q_MA_${num}`, 'answer-icon-va,selected');
        break;
      case `Q_A_${num}`:
        object.classList.toggle('selected');
        object.classList.toggle('answer-icon-a');
        resetValue(`Q_MD_${num}`, 'answer-icon-vd,selected');
        resetValue(`Q_D_${num}`, 'answer-icon-d,selected');
        resetValue(`Q_PA_${num}`, 'answer-icon-n,selected');
        resetValue(`Q_MA_${num}`, 'answer-icon-va,selected');
        break;
      case `Q_MA_${num}`:
        object.classList.toggle('selected');
        object.classList.toggle('answer-icon-va');
        resetValue(`Q_MD_${num}`, 'answer-icon-vd,selected');
        resetValue(`Q_D_${num}`, 'answer-icon-d,selected');
        resetValue(`Q_PA_${num}`, 'answer-icon-n,selected');
        resetValue(`Q_A_${num}`, 'answer-icon-a,selected');
        break;
      default:
        break;
    }
  }
  /****
   * 
   *ORDENO PARA PODER HACER LOS CALCULOS MAS SIMPLES
   */
  function sortData(test) {
  
    test.sort((o1, o2) => {
      if (o1.type < o2.type) {
        return -1;
      } else if (o1.type > o2.type) {
        return 1;
      } else {
        return 0;
      }
    })
    return test;
  }  
 
  /***
   * Dibujo el espectro manualmente
   * cambiar por Graficador 
   */

  function DrawChart() {
    /**
     * levantar de confuguracion los niveles del espectro
     * **/

    let catEspectro=['Hiperactividad','Impulsividad','Desatencion','Olvido','R. Desarollo','Inflexibilidad','D. Emocional']
    let colores=['Hiperactividad','Impulsividad','Desatencion','Olvido','R. Desarollo','Inflexibilidad','D. Emocional']
    let answer = senData();
    
    let i = 0;
    
    let graphContainer = document.querySelector('.inner-circle');
  
    answer.forEach(item => {
    
      let width = item.valor;
      i = i + 1;
      let obj1 = document.createElement('div');
      obj1.setAttribute('class', `progress-circle${i}`);
      graphContainer.appendChild(obj1);
      
      setStyleChart(width, i);
  
    })
    return graphContainer;
  
  }

  function setStyleChart(size, id) {

     /*convieto de px a rem*/
    document.querySelector(`.progress-circle${id}`).style.width = `${size/16}rem`;
    document.querySelector(`.progress-circle${id}`).style.height = `${size/16}rem`;
    document.querySelector(`.progress-circle${id}`).style.margin = `-${size / 32}rem 0px 0px -${size / 32}rem`;
    /*muestro grafico*/
    document.getElementById('testResult').classList.remove('display');
    document.getElementById('resulttitle').classList.remove('display');
    document.getElementById('testResult').classList.add('display-graph');
    /**oculto test */
    document.getElementById('tdahdesc').classList.add('display');
    document.getElementById('test').classList.add('display');

  }

 