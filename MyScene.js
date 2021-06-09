
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

    //Se inicializa el tiempoAnterior para calcular el movimiento de la camara
    this.tiempoAnterior = Date.now();

    //Posicion inicial de la camara
    this.cameraX = 0;
    this.cameraZ = 100;

    //Velocidad de la camara
    this.velocidadGiro=300;
    
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

    // Se actualiza la posición de la cámara según su controlador
    this.trackballControls.update();
    
    // Se actualiza el resto del modelo
    this.tablero.update()
    
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    /*****************************************************/
    //MOVIMIENTO DE LA CAMARA

    //La velocidad de la camara usa e = v * t
    var tiempoActual = Date.now();
    var segundos = (tiempoActual - this.tiempoAnterior)/1000;
    var espacio = segundos * this.velocidadGiro;

    //Si el turno es de las fichas blancas
    if (this.tablero.getTurno() === 0){
        var movimientoZ = this.cameraZ + espacio;
        var movimientoX = 0;
        
        //Se calcula la rotacion en X
        if(this.empiezaGiro){
          movimientoX = this.cameraX + espacio;
        }     
        else{
          movimientoX = this.cameraX - espacio;
        }
            

        //Se comprueba que la rotacion X no pase de 75
        this.cameraX = movimientoX;
        if (this.cameraX >= 75){
            this.cameraX = 75;
            this.empiezaGiro = false;
        }

        //Se comprueba que la rotacion Z no pase de 75
        this.cameraZ = movimientoZ;
        if (this.cameraZ >= 75){
            this.cameraZ = 75;
        }

        //Se comprueba que la rotacion X no pase por debajo de 0º
        this.cameraX = movimientoX;
        if(this.cameraX <= 0){
          this.cameraX = 0;
        }

        //Asignacion de las coordenadas de la camara
        this.camera.position.set (this.cameraX, 75, this.cameraZ);    
    }
    //Si el turno es de las fichas negras
    else{
        var movimientoZ = this.cameraZ - espacio;
        var movimientoX = 0;

        //Se calcula la rotacion de X teniendo en cuenta si esta en el primer recorrido
        //o en el segundo del giro de la camara
        if(!this.empiezaGiro)
            movimientoX = this.cameraX + espacio;
        else
            movimientoX = this.cameraX - espacio;

        if (movimientoX <= -75){
            this.cameraX = -75;
            this.empiezaGiro = false;
        }
        else{
            this.cameraX = movimientoX;
        }

        //Se comprueba que la rotacion X no pase por debajo de -75º
        this.cameraZ = movimientoZ;
        if (movimientoZ <= -75){
          this.cameraZ = -75;
        }

        //Se comprueba que la rotacion X no pase por encima de 0º
        this.cameraX = movimientoX;
        if (movimientoX >= 0){
            this.cameraX = 0;
        }

        //Asignacion de las coordenadas de la camara
        this.camera.position.set (this.cameraX, 75, this.cameraZ);        

    }

    //Actualizamos el tiempo anterior
    this.tiempoAnterior = tiempoActual;
    /*****************************************************/



    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())

    document.getElementById("botonRendirse").onclick = function() {rendirse()};

    function rendirse() {
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