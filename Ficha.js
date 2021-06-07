import * as THREE from '../libs/three.module.js'
import { Tablero } from './Tablero.js';

class Ficha extends THREE.Object3D {
  constructor(tablero,color,tipoFicha) {
    super();
    this.fila = 5;
    this.columna = 5;
    this.tablero = tablero;
    this.color = color;
    this.tipoFicha = tipoFicha;
  }
  
  mover(nuevaFila,nuevaColumna){
    this.fila = nuevaFila;
    this.columna = nuevaColumna;
  }

  getTipoFicha(){
    return this.tipoFicha;
  }

  isPeon(){
    return this.getTipoFicha().localeCompare("Peon") == 0;
  }

  update () {
    this.position.set(-22 + this.columna * 6.3 ,0,22 + this.fila * -6.3);
  }

  getFilaConPosicion(posicion){
    return Math.abs(posicion.z - 22) / 6.3;
  }

  getColumnaConPosicion(posicion){
    return Math.abs(posicion.x + 22) / 6.3;
  }


  getFila(){
    return this.fila;
  }

  getColumna(){
    return this.columna;
  }

  createMovimiento(fila,columna){

    var matriz = this.tablero.convertToString();

    matriz[fila][columna] = matriz[this.fila][this.columna];
    matriz[this.fila][this.columna] = "*2";
    
    

    if(this.tablero.checkJaque(this.color, matriz)){
        return null;
    }
    else{
      var materialAmarillo = new THREE.MeshPhongMaterial({
        color: 0xFFFF00,
        side: THREE.DoubleSide,
        flatShading: true, //Sombreado plano
      });
      var movimiento = new THREE.Mesh(new THREE.BoxGeometry(6.2,0.01,6.2),materialAmarillo);
      movimiento.position.set(-22 + columna * 6.3 ,0.1,22 + fila * -6.3);

      return movimiento;
    }
    
  }

  

  getMovimientos(){
    
  }

  getColor(){
    return this.color;
  }


  
}

export { Ficha };
