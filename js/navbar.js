/**Ajusta la barra de navegacion a medida que se resizea el browser 
 * <640 barra oculta se accede a traves del menu
 * >640 <1024 barra pequena (70px)
 * >1024 barra abierta 180
 * Depende de si la barra esta abierta o no cuando se produjo el resize
 * 
 * **/
//
window.addEventListener("resize", function () {
  TogleNav();
})

function TogleNav() {
  // is open-lg 180 open-xs 70 or closed 0 //
  let sidebarwidth = document.getElementById("sidenav").style.width;
     //resol <640
 if (window.matchMedia("(max-width: 640px)").matches){
    if (sidebarwidth === "0px") {
      sidebarwidth = '70px';
    } else  { //estabierto mini sidebar
      sidebarwidth = '0px';
    }
  }
  else if (window.matchMedia("(max-width: 1024px)").matches) {
    //1024
    if (sidebarwidth === "180px") {
        sidebarwidth = '70px';
    } else if (sidebarwidth === "70px") { //estabierto mini sidebar
        sidebarwidth = '0px';
      }else {
       sidebarwidth = '70px';
      }
  }else  {
    //> 1024px
    if (sidebarwidth === "70px") {
        sidebarwidth = '180px';
    } else if (sidebarwidth === "180px") {
        sidebarwidth = '0px';
    }
    else {
       sidebarwidth = '180px';
    }
  }

  document.getElementById("sidenav").style.width = sidebarwidth;
  document.getElementById("header").style.marginLeft = sidebarwidth;
  document.getElementById("footer").style.marginLeft = sidebarwidth;
  document.getElementById("main").style.marginLeft = sidebarwidth;
}

