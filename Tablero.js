import * as THREE from '../libs/three.module.js'
import { Peon } from './Peon.js'
import { Torre } from './Torre.js';
import { Caballo } from './Caballo.js';
import { Alfil } from './Alfil.js';
import { Rey } from './Rey.js';
import { Dama } from './Dama.js';
class Tablero extends THREE.Object3D {
  constructor(gui,titleGui) {
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
    


    this.inicializarTablero();

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
          this.add(this.casillas[i][j]);
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
    var torre1 = new Torre(this,1);
    var caballo1 = new Caballo(this,1);
    var alfil1 = new Alfil(this,1);
    var torre2 = new Torre(this,1);
    var caballo2 = new Caballo(this,1);
    var alfil2 = new Alfil(this,1);
    var rey = new Rey(this,1);
    var dama = new Dama(this,1);

    //Incluimos las fichas en casilla
    this.moverFicha(torre1,7,0);
    this.moverFicha(caballo1,7,1);
    this.moverFicha(alfil1,7,2);
    this.moverFicha(dama,7,3);
    this.moverFicha(rey,7,4);
    this.moverFicha(alfil2,7,5);
    this.moverFicha(caballo2,7,6);
    this.moverFicha(torre2,7,7);
    
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
