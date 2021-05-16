import * as THREE from '../libs/three.module.js'
 
class Ficha extends THREE.Object3D {
  constructor(tablero,color) {
    super();
    this.fila = 0;
    this.columna = 0;
    this.tablero = tablero;
    this.color = color;
  }
  
  mover(nuevaFila,nuevaColumna){
    this.fila = nuevaFila;
    this.columna = nuevaColumna;
  }

  update () {
    this.position.set(-22 + this.columna * 6.3 ,0,22 + this.fila * -6.3);
  }

  getFilaConPosicion(posicion){
    console.log(posicion);
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
    var materialAmarillo = new THREE.MeshPhongMaterial({
			color: 0xFFFF00,
			side: THREE.DoubleSide,
			flatShading: true, //Sombreado plano
		});
    var movimiento = new THREE.Mesh(new THREE.BoxGeometry(6.3,0.01,6.3),materialAmarillo);
    movimiento.position.set(-22 + columna * 6.3 ,0.1,22 + fila * -6.3)
    return movimiento;
  }

  getMovimientos(){
    var movimientos = new THREE.Object3D();

    //Si es blanco el peon va hacia delante en el tablero
    if(this.color===0){
      movimientos.add(this.createMovimiento(this.fila+1,this.columna));
    }
    //Si es negro el peon va hacia atras en el tablero
    else{
      movimientos.add(this.createMovimiento(this.fila-1,this.columna));
    }

    return movimientos;
  }

  getColor(){
    return this.color;
  }

  
}

export { Ficha };
