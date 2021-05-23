import * as THREE from '../libs/three.module.js'
import { Peon } from './Peon.js'
import { Torre } from './Torre.js';
import { Caballo } from './Caballo.js';
import { Alfil } from './Alfil.js';
import { Rey } from './Rey.js';
import { Dama } from './Dama.js';
import { Ficha } from './Ficha.js';
import { MyScene } from './MyScene.js' 
import { ThreeBSP } from '../libs/ThreeBSP.js';
class Tablero extends THREE.Object3D {
  constructor(scene, aWidth, aDeep) {
    super();
    
   //Creamos la matriz de casillas
  this.casillas = [
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null]
   ];
   
    this.fichas = new THREE.Object3D();
    this.scene = scene;
    this.width = aWidth;
    this.deep = aDeep;

    //Empiezan los blancos
    this.turno = 0;

    this.raycaster = new THREE.Raycaster ();

    this.inicializarTablero();

    this.setMensaje("Turno: Blancas");

    this.add(this.fichas);
  }

  setMensaje(str){
    document.getElementById("Messages").innerHTML="<h2>"+str +"</h2>";
  }

  inicializarTablero(){
    //Creamos las fichas blancas y las posicionamos
    this.createFichasBlancas();

    //Creamos las fichas negras y las posicionamos
    this.createFichasNegras();
    
    //Añadimos todas las fichas al modelo
    for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        if(this.casillas[i][j] !== null){
          this.fichas.add(this.casillas[i][j]);
        }
      }
    }

  }

  createFichasNegras(){
    //Creamos las fichas
    var peones=[];
    for(var i=0;i<8;i++){
        peones.push(new Peon(this,1));
    }
    var torre1_negro = new Torre(this,1);
    var caballo1_negro = new Caballo(this,1);
    var alfil1_negro = new Alfil(this,1);
    var torre2_negro = new Torre(this,1);
    var caballo2_negro = new Caballo(this,1);
    var alfil2_negro = new Alfil(this,1);
    var rey_negro = new Rey(this,1);
    var dama_negro = new Dama(this,1);

    this.moverFicha(torre1_negro,7,0);
    this.moverFicha(caballo1_negro,7,1);
    this.moverFicha(alfil1_negro,7,2);
    this.moverFicha(dama_negro,7,3);
    this.moverFicha(rey_negro,7,4);
    this.moverFicha(alfil2_negro,7,5);
    this.moverFicha(caballo2_negro,7,6);
    this.moverFicha(torre2_negro,7,7);
    
    for(var i=0;i<8;i++){
      this.moverFicha(peones[i],6,i);
    }
  }

  createFichasBlancas(){
    //Creamos las fichas
    var peones=[];
    for(var i=0;i<8;i++){
      peones.push(new Peon(this,0));
    }
    var torre1 = new Torre(this,0);
    var caballo1 = new Caballo(this,0);
    var alfil1 = new Alfil(this,0);
    var torre2 = new Torre(this,0);
    var caballo2 = new Caballo(this,0);
    var alfil2 = new Alfil(this,0);
    var rey = new Rey(this,0);
    var dama = new Dama(this,0);

    //Incluimos las fichas en casilla
    this.moverFicha(torre1,0,0);
    this.moverFicha(caballo1,0,1);
    this.moverFicha(alfil1,0,2);
    this.moverFicha(dama,0,3);
    this.moverFicha(rey,0,4);
    this.moverFicha(alfil2,0,5);
    this.moverFicha(caballo2,0,6);
    this.moverFicha(torre2,0,7);
    
    for(var i=0;i<8;i++){
      this.moverFicha(peones[i],1,i);
    }
  }

  moverFicha(ficha,nuevaFila,nuevaColumna){
    ficha.mover(nuevaFila,nuevaColumna);
    this.casillas[ficha.getFila()][ficha.getColumna()] = null;
    this.casillas[nuevaFila][nuevaColumna] = ficha;
    
  }

  mostrarPosiblesCasillas(event, action){
    
  }

  getMouse (event) {
    var mouse = new THREE.Vector2 ();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = 1 - 2 * (event.clientY / window.innerHeight);
    return mouse;
  }

  moverFichaRaton(event,action){
    console.log(action);
    var mouse = this.getMouse (event);
    this.raycaster.setFromCamera (mouse, this.scene.getCamera());
    switch (action) {
      case 'SELECT_FICHA' :
        this.remove(this.movimientos);
        var pickedObjects = this.raycaster.intersectObjects (this.fichas.children,true);
        if (pickedObjects.length > 0) {
          this.fichaSeleccionada = pickedObjects[0].object.parent;
          if (this.fichaSeleccionada.getColor() === this.turno){
            this.movimientos = this.fichaSeleccionada.getMovimientos();
            this.add(this.movimientos);
            this.scene.setApplicationMode('SELECT_FICHA');
          }
          else{
            this.scene.setApplicationMode('NO_ACTION');
          }
          
        }

      break;
      case 'SELECT_MOVIMIENTO':
        var pickedObjects = this.raycaster.intersectObjects (this.movimientos.children,true);
        if (pickedObjects.length > 0) {
          var movimiento = pickedObjects[0].object;
          var posicion = movimiento.position;
          var fila = Math.round(this.fichaSeleccionada.getFilaConPosicion(posicion));
          var columna = Math.round(this.fichaSeleccionada.getColumnaConPosicion(posicion));
          this.casillas[this.fichaSeleccionada.getFila()][this.fichaSeleccionada.getColumna()] = null;
          //Si hay una ficha en la casilla a la que vamos la matamos
          if(this.casillas[fila][columna] !== null){
            this.fichas.remove(this.casillas[fila][columna]);
          }
          this.casillas[fila][columna] = this.fichaSeleccionada;
          
          this.fichaSeleccionada.mover(fila,columna);

          this.remove(this.movimientos);
          this.scene.setApplicationMode('NO_ACTION');
          //Cambia de turno
          this.turno===0?this.turno=1:this.turno=0;

          //Turno blancas
          if(this.turno===0){
            this.setMensaje("Turno: Blancas");
          }
          //Turno negras
          else{
            this.setMensaje("Turno: Negras");
          }
        }
        else{
          this.fichaSeleccionada = null;
          this.remove(this.movimientos);
          var pickedObjects = this.raycaster.intersectObjects (this.fichas.children,true);
          if (pickedObjects.length > 0) {
            this.fichaSeleccionada = pickedObjects[0].object.parent;
            if (this.fichaSeleccionada.getColor() === this.turno){
              this.movimientos = this.fichaSeleccionada.getMovimientos();
              this.add(this.movimientos);
              this.scene.setApplicationMode('SELECT_FICHA');
            }
            else{
              this.scene.setApplicationMode('NO_ACTION');
            }
          }
        }
      break;

    }
    
  }

  hayFichaEnLaCasilla(fila,columna,color){ //Devuelve 0--> No hay ficha, 1-->Hay ficha enemiga, 2-->Hay ficha aliada
    var result = -1;
    var casilla = this.casillas[fila][columna];
    if (casilla !== null){
        if(casilla.getColor() === color){
            result = 2;
        }
        else{
            result = 1;
        }
    }
    else{
        result = 0;
    }
    return result;
  }

  getPosiblesMovimientos(ficha){
    return ficha.getPosiblesMovimientos();
  }

  getFicha(event){
    var mouse = this.getMouse (event);
    this.raycaster.setFromCamera (mouse, this.scene.getCamera());
    var surfaces = [this.ground];
    var pickedObjects = this.raycaster.intersectObjects (surfaces);
    if (pickedObjects.length > 0) {
      return new THREE.Vector2 (pickedObjects[0].point.x, pickedObjects[0].point.z);
    } else
      return null;

  }

  getTurno(){
    return this.turno;
  }



  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;
      
      this.posX = 0.0;
      this.posY = 0.0;
      this.posZ = 0.0;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;
        
        this.posX = 0.0;
        this.posY = 0.0;
        this.posZ = 0.0;
      }
    } 
    
  }

  update () {
    for(var i=0;i<8;i++){
      for(var j=0;j<8;j++){
        if(this.casillas[i][j] !== null){
          (this.casillas[i][j]).update();
        }
      }
    }
}
}

export { Tablero };
