//Create the socket
let socket = io();

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



//Función para llamada de imagenes en el codigo
function preload() {
    imagenDisplayPantalla1 = new loadImage('data/pantalla 1 (publicidad del juego).png');
    imagenDisplayPantalla2 = new loadImage('data/pantalla 2 (instrucciones de lo que debe hacer el jugador en su celular).png');
    imagenDisplayPantalla3 = new loadImage('data/pantalla 3 (contador de juego para que se prepare para jugar).png');
    imagenDisplayPantalla4 = new loadImage('data/pantalla 4 (espacio donde se va a ver el juego) aqui sucede la magia.png');
    imagenDisplayPantalla5 = new loadImage('data/pantalla 5 (pantalla que indica que el juego terminó).png');
}

function setup() { 
    ancho = 20;
    timer = 3;
    pantalla = 0;
    frameRate(60);
    createCanvas(1920, 1080);
    
}

function draw() {
    switch(pantalla){
       //pantalla 1
        //En esta pantalla va a estar la publicidad junto con el codigo QR
        case 0:
            
            image(imagenDisplayPantalla1, 0, 0);

            break;
    //---------------------------------------------------
       //pantalla 2
        //En esta pantalla se van a mostrar las instrucciones del juego
        case 1:
            
            image(imagenDisplayPantalla2, 0, 0);
            
            break;

    //---------------------------------------------------
        //pantalla 3
        //En esta pantalla va a haber un contador del 3 - 1 para indicar al jugador cuando va a comenzar la experiencia
        case 2:
            image(imagenDisplayPantalla3, 0, 0);

            fill(255);
            textSize(80);
            text(timer, 1920/2-20, 1080/2);

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
                    /* socket.emit('cambio3' )*/
                    pantalla = 3;
                    }
            }

            break;

    //---------------------------------------------------
        //pantalla 4
        //En esta pantalla se va a desarrollar toda la experiencia del juego
        case 3:
            image(imagenDisplayPantalla4, 0, 0);
            text(contador, 1920/2-20, 1080/2)

            break;

    //---------------------------------------------------
        //pantalla 5
        //En esta pantalla se le indica al jugador el fin del juego y se le agradece por jugar
        case 4:
            image(imagenDisplayPantalla5, 0, 0);

            break;
    }
    
}


//aqui se llama el contador de cliks que realiza el usuario
socket.on('tapinformation', (tapInformations)  => {
    contador +=1;
    console.log(contador);
    if(contador >= 101){
        pantalla = 4
    }
    })

//aqui se va a hacer el llamado del cambio de pantalla de la publicidad a las instrucciones del juego
socket.on('cambio1', (cambioPantalla1) => {
    pantalla = 1;
    })

//Aqui se hace el cambio de la pantalla de las instrucciones al juego
socket.on('cambio2', (cambioPantalla1) => {
    pantalla = 2;
    })
/*
Listen to the event and use the directions
You may want to use switch-case structure
*/

    socket.on('position', (movement)=> {

        switch (movement) {
            case 'UP': 
            character.y -= speed;
                
                break;
        
                case 'DOWN': 
            character.y += speed;
                
                break;
    
                case 'RIGHT': 
            character.x += speed;
                
                break;
    
                case 'LEFT': 
            character.x -= speed;
                
                break;
            
        }
        
    })
    



/* socket.on('positions', (character) => {
    character.x, character.y = character;
}); */