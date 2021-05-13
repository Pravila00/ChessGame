import * as THREE from '../libs/three.module.js'
 
class Ficha extends THREE.Object3D {
  constructor(tablero,color) {
    super();
    this.fila = 0;
    this.columna = 0;
    this.tablero = tablero;
  }
  
  mover(nuevaFila,nuevaColumna){
    this.fila = nuevaFila;
    this.columna = nuevaColumna;
  }

  update () {
    this.position.set(-22 + this.columna * 6.3 ,0,22 + this.fila * -6.3);
  }

  getFila(){
    return this.fila;
  }

  getColumna(){
    return this.columna;
  }
}

export { Ficha };
