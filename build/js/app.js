document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
    navScroll();
    barraFija();
}

function barraFija(){
    const barra = document.querySelector('.header');  //Lo que va a quedar fijo
    const sobreFestival = document.querySelector('.sobre-festival'); // Seleccionar la posicion del bloque
    window.addEventListener('scroll', function(){
        console.log( sobreFestival.getBoundingClientRect() ); //No olvidar los parentesis (), caso contrario arrojar otros valores
        if(sobreFestival.getBoundingClientRect().bottom < 0){
            console.log('Ya has pasado el elemento');
            barra.classList.add('fijo');
        }
        else{
            barra.classList.remove('fijo');
        }
    });
}

function navScroll(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace =>{
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll );
            seccion.scrollIntoView({behavior: 'smooth'});
        });
    });

}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="../build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="../build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="../build/img/thumb/${i}.jpg" alt="imagen galeria">
        
        `;
        console.log(imagen);
        galeria.appendChild(imagen);

        imagen.onclick = function () {
            mostrarImagen(i);
        }

    }

}

function mostrarImagen(indice) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="../build/img/grande/${indice}.avif" type="image/avif">
        <source srcset="../build/img/grande/${indice}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="../build/img/grande/${indice}.jpg" alt="imagen galeria ${indice}">
        `;

    //Este codigo crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //Crear boton de cerrar imagen
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    overlay.appendChild(cerrarModal);

    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.appendChild(overlay);

        body.classList.remove('fijar-body');
        overlay.remove();

    }

    const body = document.querySelector('body');
    body.appendChild(overlay);

    body.classList.add('fijar-body');

}



