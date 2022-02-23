var balloon,balloonImage1,balloonImage2;
// crea aquí la base de datos y la variable de posición 
 //obtener posicion y crea base y crea position globo
 database = firebase.database();

 var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value",readPosition, showError);

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");
  }

//Función para configurar el entorno inicial
function setup() {

   database=firebase.database();

  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

// función para mostrar la interfaz de usuario UI
function draw() {
  background(bg);

   //actualiza el valor de x y y en ballon y lo updatea a la base de datos en cada if, y cambia escala en Y
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección hacia la izquierda
    balloon.x = balloon.x - 5;
    updateHeight(-5,0);
  }
  else if(keyDown(RIGHT_ARROW)){
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  //escribe el código para mover el globo aerostático en dirección hacia la derecha
  balloon.x = balloon.x + 5;
  updateHeight(5,0); 
}
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección ascendente
    balloon.scale=balloon.scale -0.005;
    balloon.y = balloon.y - 5;
    updateHeight(0,-5);
   
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección descendente
    balloon.scale=balloon.scale+0.005;
    balloon.y = balloon.y + 5;
    updateHeight(0,+5);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Utiliza las teclas de flecha para mover el globo aerostático",40,40);
}

 function updateHeight(x,y){
   database.ref('balloon/height').set({
     'x': height.x + x ,
     'y': height.y + y
   })
 }



//funsion para leer los datos de la base de datos
 function readPosition(data){
   height = data.val();
   balloon.x = height.x;
   balloon.y = height.y;
 }




function showError(){
  console.log("Error al escribir en la base de datos");
}
