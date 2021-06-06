
// Clases de la biblioteca

import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'
// Clases de mi proyecto
import { Tablero } from './Tablero.js';


class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();

    this.applicationMode = 'NO_ACTION';  

    this.tiempo = new THREE.Vector2(0,1);
    this.tiempoAnterior = Date.now();

    this.cameraX = 0;
    this.cameraZ = 100;
    this.velocidadGiro=120;
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    //this.gui = this.createGUI ();

    this.trackballControls = null;
    
    this.createLights ();
    
    this.createCamera ();
    
    this.createGround();

    //Interaccion

    this.mouseDown = false;

    this.tablero = new Tablero(this,300,300);

    this.add(this.tablero);
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (0, 75, 75);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    
    
    this.trackballControls = new TrackballControls (this.camera, this.renderer.domElement);
    this.trackballControls.rotateSpeed = 5;
    this.trackballControls.zoomSpeed = -2;
    this.trackballControls.panSpeed = 0.5;
    this.trackballControls.target = look;
    this.trackballControls.enabled = false;


    this.add (this.camera);
  }
  
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    /*this.guiControls = new function() {
      // En el contexto de una función   this   alude a la función
      this.lightIntensity = 0.5;
      this.axisOnOff = true;
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
    
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');*/
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, 0.5 );
    this.spotLight.position.set( 0, 200, 0 );
    this.add (this.spotLight);
  }

  createGround () {
    // El suelo es un Mesh, necesita una geometría y un material.
    
    // La geometría es una caja con muy poca altura
    var geometryGround = new THREE.BoxGeometry (50,0.2,50);
    
    // El material se hará con una textura de madera
    var texture = new THREE.TextureLoader().load('./imgs/textura-ajedrezada.jpg');
    var materialGround = new THREE.MeshPhongMaterial ({map: texture});
    
    // Ya se puede construir el Mesh
    var ground = new THREE.Mesh (geometryGround, materialGround);
    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    ground.position.y = -0.1;
    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (ground);
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMap.enabled = true;
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }

  onMouseDown(event){
    if (event.button === 0) {   // Left button
      this.mouseDown = true;
      switch (this.applicationMode) {
        //Seleccionar ficha
        
        case 'NO_ACTION':
          this.moverFichaRaton(event,'SELECT_FICHA');
          break;
        //Seleccionar movimiento
        case 'SELECT_FICHA' :
          this.moverFichaRaton(event, 'SELECT_MOVIMIENTO');
        break;
        default :
          this.applicationMode = 'NO_ACTION';
        break;
      }
    } else {
      this.applicationMode = 'NO_ACTION';
    }
  }

  mostrarPosiblesCasillasPosiblesCasillas(event, action){
    this.tablero.mostrarPosiblesCasillas(event,action);
  }

  moverFichaRaton(event,action){
    this.tablero.moverFichaRaton(event,action)
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }

  setApplicationMode(action){
    this.applicationMode=action;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  // It returns the camera controls
  getCameraControls () {
    return this.trackballControls;
  }

  setInicioCambio(){
      this.empiezaGiro = true;
  }

  update () {
    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
    //this.spotLight.intensity = this.guiControls.lightIntensity;
    
    // Se muestran o no los ejes según lo que idique la GUI
    
    // Se actualiza la posición de la cámara según su controlador
    this.trackballControls.update();
    
    // Se actualiza el resto del modelo
    this.tablero.update()
    
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());



    var tiempoActual = Date.now();
    var segundos = (tiempoActual - this.tiempoAnterior)/1000;
    var vel = segundos * this.velocidadGiro;


    if (this.tablero.getTurno() === 0){
        var rotacionZ = this.cameraZ + vel;
        var rotacionX = 0;
        
        if(this.empiezaGiro)
            rotacionX = this.cameraX + vel;
        else
            rotacionX = this.cameraX - vel;

        if (rotacionZ >= 75){
            this.cameraZ = 75;
        }
        else{
            this.cameraZ = rotacionZ;
        }

        if (rotacionX >= 75){
            this.cameraX = 75;
            this.empiezaGiro = false;
        }
        else{
            this.cameraX = rotacionX;
        }

        if (rotacionX <= 0){
            this.cameraX = 0;
        }
        else{
            this.cameraX = rotacionX;
        }

        this.camera.position.set (this.cameraX, 75, this.cameraZ);    
    }
    else{
        var rotacionZ = this.cameraZ - vel;
        var rotacionX = 0;

        if(!this.empiezaGiro)
            rotacionX = this.cameraX + vel;
        else
            rotacionX = this.cameraX - vel;

        if (rotacionZ <= -75){
            this.cameraZ = -75;
        }
        else{
            this.cameraZ = rotacionZ;
        }

        if (rotacionX <= -75){
            this.cameraX = -75;
            this.empiezaGiro = false;
        }
        else{
            this.cameraX = rotacionX;
        }

        if (rotacionX >= 0){
            this.cameraX = 0;
        }
        else{
            this.cameraX = rotacionX;
        }

        this.camera.position.set (this.cameraX, 75, this.cameraZ);        

    }

    this.tiempoAnterior = tiempoActual;

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())

    document.getElementById("botonRendirse").onclick = function() {myFunction()};

    function myFunction() {
        $('#rendicion').modal('show');
    }
        

    }
}

/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

   // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
   window.addEventListener ("resize", () => scene.onWindowResize());
   window.addEventListener ("mousedown", (event) => scene.onMouseDown(event), true);
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});

export { MyScene };