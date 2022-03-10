
//Create the socket
let socket = io();

let canvas;
 
//InputEvent para que el usuario pueda poner su correo
let emailInput;

//InputEvent para que el usuario pueda poner su nombre
let nombreInput;

/* const PORT = 5050;
const IPaddress = '192.168.1.5'; */
let pantalla;

//caraga de imagenes
let pantallaPlayer1
let pantallaPlayer2
let pantallaPlayer3
let pantallaPlayer4
let pantallaPlayer5

//Contador de 3 - 1 que hace el tiempo regresivo
let timer;

//variable para barra de carga pantalla 1
let ancho;

function preload(){
    pantallaPlayer1 = new loadImage("data/pantalla 1 (tiempo de carga).png");
    pantallaPlayer2 = new loadImage("data/pantalla 2 (ingresa correo del participante).png");
    pantallaPlayer3 = new loadImage("data/pantalla 3(indicaciones del juego).png");
    pantallaPlayer4 = new loadImage("data/pantalla 4 (contador antes de comenzar el juego).png");
    pantallaPlayer5 = new loadImage("data/pantalla 6(agradecimiento por jugar).png");
}

function setup() {
    timer = 3

    pantalla = 1;

    //metodo que permite el funcionamiento del cuadro de texto para poner el correo
    emailInput = createInput('');

    //metodo que permite el funcionamiento del cuadro de texto para poner el nombre
    nombreInput = createInput('');
        

    canvas = createCanvas(428, 926);
       

    //variable necesaria para poder hacer barra de carga
    ancho = 20;
}

function draw() {
    background(255, 50);
    fill(0);
    ellipse(pmouseX, pmouseY, 50, 50);

    switch(pantalla){

    case 1:
    //pantalla inicial de carga 
    //carga imagen de la interfaz
    image(pantallaPlayer1, 0, 0); 
    
    
    //barra de carga de la primera pantalla
    fill(255);
    noStroke();
    rect(65, 468, ancho+10, 10, 8);

    //configuración frame count para barra de carga
    if(frameCount%10 == 0) {
    ancho +=40;

    if(ancho>=310) {
    pantalla = 2;
    ancho = 0;
    socket.emit('cambio1');
}
}
    break;
    

//--------------------------------------------------------------------
    //pantalla 2 registro del usuario en su telefono
        case 2:
        //Boton de entendido
        fill(255)
        rectMode(CORNER)
        rect(50,761,328, 55, 37);


        //Interfaz de las instrucciones
        image(pantallaPlayer2, 0, 0);

        
        //Ingresa el correo
        emailInput.position((windowWidth / 2) - 80, windowHeight - 100);
        emailInput.size(260);

        emailInput.position(30, 367);

        //Ingresa el nombre
        nombreInput.position((windowWidth / 2) - 80, windowHeight - 100);
        nombreInput.size(260);

        nombreInput.position(30, 478);
        
        break; 

//---------------------------------------------------------------------
    //pantalla 3 pantalla que muestra las instrucciones del juego
        case 3:
        
        //Boton para cambiar de pantalla
        fill(255)
        rectMode(CORNER)
        rect(97,344,239,240, 100);

        image(pantallaPlayer3, 0, 0)

        socket.on('cambio4', (cambioPantalla4)=>{
            pantalla = 4;
        })

        break;

        //--------------------------------------------------------------------
        //Pantalla 4, ejecucion del juego
        case 4:
            
            fill(0);
            rect(0, 0, 428, 926);

            image(pantallaPlayer4, 0, 0);

            socket.on('cambio5', (cambioPantalla5)=>{
                pantalla = 5;
            })
            

            break;
        
        //--------------------------------------------------------------------
        //Pantalla 5, agradecimiento por jugar
        case 5:
            

            image(pantallaPlayer5, 0, 0);
    
            

            break;
    }
}

function mouseClicked(){
    switch(pantalla){
        case 2:
            
            //rect(50,761,328, 55, 37);
            if(mouseX > 50 && mouseX < 378 && mouseY > 761 && mouseY < 816){
                pantalla = 3;
                console.log('se clikeó el cambio de pantalla');
                socket.emit('cambio2')
            }
            break;

        //------------------------------------------------------------------------------
        //boton pantalla 3
        case 3:
            //rect(97,344,239,240, 100);
            if(mouseX > 97 && mouseX < 336 && mouseY > 344 && mouseY < 584){
                //pantalla = 4;
                console.log('se clikeó el cambio de pantalla');
                socket.emit('cambio3')
                
            }
            break;

             //------------------------------------------------------------------------------
        //boton pantalla 5
        //En esta pantalla se da la interacción de los clicks para que el juego funcione
        case 4:
            //rect(97,344,239,240, 100);
            if(mouseX > 97 && mouseX < 336 && mouseY > 344 && mouseY < 584){
                console.log('se clikeó');
                socket.emit('tapinformation');
            }
            break;
    
    }
}



