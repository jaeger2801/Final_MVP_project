

//Create the socket
let socket = io();

//Variables de incremento
let calorias;
let distancia;
let pasos;

// Variable que indica la cantidad de clicks que se realiza dentro de la interaccion
let contador = 0;

//Contador de 3 - 1 que hace el tiempo regresivo
let timer;
let ancho;

//Variable para cambiar entre pantallas dentro del juego
let pantalla;

//carga de imagenes
let imagenDisplayPantalla1
let imagenDisplayPantalla2
let imagenDisplayPantalla3
let imagenDisplayPantalla4
let imagenDisplayPantalla5
let imagenDisplayPantalla6


//carga de iconos
let iconoCalorias
let iconoDistancia
let iconoPasos

//logo de nike
let logoNikeBlanco


//Función para llamada de imagenes en el codigo
function preload() {
    imagenDisplayPantalla1 = new loadImage('data/pantalla 1 (publicidad del juego).png');
    imagenDisplayPantalla2 = new loadImage('data/pantalla 2 (registro del usuario).png');
    imagenDisplayPantalla3 = new loadImage('data/pantalla 3 (instrucciones juego).png');
    imagenDisplayPantalla4 = new loadImage('data/pantalla 4 (espacio del contador).png');
    imagenDisplayPantalla5 = new loadImage('data/corredora gif.gif');
    imagenDisplayPantalla6 = new loadImage('data/pantalla 6 (pantalla que indica que el juego terminó).png');

    //Iconos
    iconoCalorias = new loadImage('data/iconos-02.png');
    iconoDistancia = new loadImage('data/iconos-01.png');
    iconoPasos = new loadImage('data/marcas de pasos-01.png');

    //logo de nike
    logoNikeBlanco = new loadImage('data/nike.png')
}

function setup() { 
    calorias = 0;
    distancia = 0;
    pasos = 0;
    ancho = 20;
    timer = 3;
    pantalla = 1;
    frameRate(60);
    createCanvas(1920, 1080);
    
}

function draw() {
    switch(pantalla){
       //pantalla 1
        //En esta pantalla va a estar la publicidad junto con el codigo QR
        case 1:
            
            image(imagenDisplayPantalla1, 0, 0);

            break;
    //---------------------------------------------------
       //pantalla 2
        //En esta pantalla se van a mostrar el registro del usuario
        case 2:
            
            image(imagenDisplayPantalla2, 0, 0);
            
            break;

    //---------------------------------------------------
        //pantalla 3
        //En esta pantalla se muestran las instrucciones del juego
        case 3:
            image(imagenDisplayPantalla3, 0, 0);

            break;

    //---------------------------------------------------
        //pantalla 4
        //En esta pantalla va a haber un contador del 3 - 1 para indicar al jugador cuando va a comenzar la experiencia
        case 4:
            image(imagenDisplayPantalla4, 0, 0);
            
            fill(255);
            textSize(144);
            text(timer, 1920/2-35, 1080/2+80);

            if(frameCount%15 == 0) {
                ancho +=40;
            
                if(ancho>=200) {
                    timer = 2;
                }
                if(ancho >= 400){
                    timer = 1;
                }
                if(ancho >= 600){
                    timer = 0;
                    socket.emit('cambio4' )
                    pantalla = 5;
                    }
            }

            break;


    //---------------------------------------------------
        //pantalla 5
        //En esta pantalla se realiza el juego
        case 5:
            
        //Calorias
            if(frameCount%200 == 0) {
                distancia += 16
                //console.log(distancia);
            }
        //distancia
            if(frameCount%100 == 0) {
                calorias += 7
                console.log(calorias);
            }
        //pasos
            if(frameCount%32 == 0) {
                pasos += 1
                //console.log(pasos);
            }


            

            image(imagenDisplayPantalla5, 0, 0, 1920, 1080);

            //logo de nike
            image(logoNikeBlanco, -150, -300)

            //Iconos
            image(iconoCalorias, 765, 75);
            image(iconoDistancia, 1133, 75);
            image(iconoPasos, 1501, 79);

            //información de lo que ha logrado
            //info de calorias
            fill(255);
            textSize(48)
            text(calorias, 912, 160)

            //info de distancia
            textSize(48)
            text(distancia, 1262, 160)

            //info de pasos
            textSize(48)
            text(pasos, 1612, 160)

            //contador de taps que hace el usuario
            fill(255);
            textSize(180);
            text(contador, 296, 600);

            break;

    //---------------------------------------------------
        //pantalla 5
        //En esta pantalla se le indica al jugador el fin del juego y se le agradece por jugar
        case 6:
            image(imagenDisplayPantalla6, 0, 0);

            fill(255);
            textSize(48)
            text(calorias, 273, 648+50)
            text('Calorias quemadas', 273+165, 648+50)

            //info de distancia
            textSize(48)
            text(distancia, 273, 794+40)
            text('Distancia recorrida', 273+165, 794+40)
            //info de pasos
            textSize(48)
            text(pasos, 273, 940+40)
            text('Pasos', 273+165, 940+40)

            socket.emit('cambio5')
            break;
    }
    
}


//aqui se llama el contador de cliks que realiza el usuario
socket.on('tapinformation', (tapInformations)  => {
    contador +=1;
    console.log(contador);
    if(contador >= 101){
        pantalla = 6
    }
    })

//aqui se va a hacer el llamado del cambio de pantalla de la publicidad al registro
socket.on('cambio1', (cambioPantalla1) => {
    pantalla = 2;
    })

//Aqui se hace el cambio de la pantalla de registro a las instrucciones
socket.on('cambio2', (cambioPantalla2) => {
    pantalla = 3;
    })

//Aqui se hace el cambio de la pantalla de las instrucciones al conteo regresivo
socket.on('cambio3', (cambioPantalla3) => {
    pantalla = 4;
    })
