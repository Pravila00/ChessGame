import * as THREE from '../libs/three.module.js'
import { Ficha } from './Ficha.js'
class Peon extends Ficha {
  constructor(tablero,color,fila,columna) {
    super(tablero,color);
    
    // Puntos
    this.points = [];
    this.points.push (new THREE.Vector2 (0, 0, 0));
    this.points.push (new THREE.Vector2 (2, 0, 0));
    this.points.push (new THREE.Vector2 (2, 0.5, 0));
    this.points.push (new THREE.Vector2 (1.1, 0.5, 0));

    
    //this.points.push (new THREE.Vector2 (1, 1.8, 0));

    this.points.push (new THREE.Vector2 (0.75, 2.1, 0));

    this.points.push (new THREE.Vector2 (0.5, 2.6, 0));
    this.points.push (new THREE.Vector2 (0.8, 2.7, 0));
    this.points.push (new THREE.Vector2 (0.5, 2.8, 0));
    
    this.points.push (new THREE.Vector2 (0.8, 3.1, 0));
    this.points.push (new THREE.Vector2 (1, 3.6, 0));
    this.points.push (new THREE.Vector2 (1, 4.1, 0));
    this.points.push (new THREE.Vector2 (0.8, 4.4, 0));
    this.points.push (new THREE.Vector2 (0.7, 4.5, 0));
    
    this.points.push (new THREE.Vector2 (0.5, 4.7, 0));
    this.points.push (new THREE.Vector2 (0, 4.7, 0));
    
    var revolGeom = new THREE.LatheGeometry( this.points, 24, 0, 2*Math.PI );

    if (color === 0){
      var revolMat = new THREE.MeshPhongMaterial({color: 0xffffff});
    }
    else{
      var revolMat = new THREE.MeshPhongMaterial({color: 0x2D2C2C});
    }

    // Para crear una línea visible, como en el vídeo
    this.revol = new THREE.Mesh(revolGeom, revolMat); 
    this.add (this.revol);

  }

  getMovimientos(){
    var movimientos = new THREE.Object3D();

    //Si es blanco el peon va hacia delante en el tablero
    if(this.color===0){
        //Primero el movimiento normal
        if(this.tablero.hayFichaEnLaCasilla(this.fila+1,this.columna,this.color) === 0){
            movimientos.add(this.createMovimiento(this.fila+1,this.columna));
        }
    }
    //Si es negro el peon va hacia atras en el tablero
    else{
      movimientos.add(this.createMovimiento(this.fila,this.columna-1));
    }

    return movimientos;
  }

}

export { Peon };
