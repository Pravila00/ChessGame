import * as THREE from '../libs/three.module.js'
import { Ficha } from './Ficha.js'
 
class Torre extends Ficha {
  constructor(tablero,color) {
    super();
    
    // Puntos
    this.points = [];
    this.points.push (new THREE.Vector2 (0, 0, 0));
    this.points.push (new THREE.Vector2 (2, 0, 0));
    this.points.push (new THREE.Vector2 (2, 0.5, 0));
    this.points.push (new THREE.Vector2 (1.3, 0.5, 0));

    this.points.push (new THREE.Vector2 (1.3, 1, 0));
    this.points.push (new THREE.Vector2 (1.5, 1.2, 0));
    this.points.push (new THREE.Vector2 (1.3, 1.4, 0));

    this.points.push (new THREE.Vector2 (1.1, 4, 0));
    this.points.push (new THREE.Vector2 (1.3, 4.2, 0));
    this.points.push (new THREE.Vector2 (1.1, 4.4, 0));

    this.points.push (new THREE.Vector2 (0.9, 4.5, 0));
    this.points.push (new THREE.Vector2 (1.3, 4.7, 0));
    this.points.push (new THREE.Vector2 (1, 4.9, 0));

    this.points.push (new THREE.Vector2 (0.8, 5, 0));
    this.points.push (new THREE.Vector2 (1.5, 5, 0));
    this.points.push (new THREE.Vector2 (1.5, 6.5, 0));
    this.points.push (new THREE.Vector2 (1, 6.5, 0));
    this.points.push (new THREE.Vector2 (1, 5.8, 0));
    this.points.push (new THREE.Vector2 (0, 5.8, 0));
    
    var revolGeom = new THREE.LatheGeometry( this.points, 24, 0, 2*Math.PI );
    if (color === 0){
      var revolMat = new THREE.MeshPhongMaterial({color: 0xffffff});
    }
    else{
      var revolMat = new THREE.MeshPhongMaterial({color: 0x000000});
    }
    // Para crear una línea visible, como en el vídeo
    this.revol = new THREE.Mesh(revolGeom, revolMat); 
    this.add (this.revol);

  }


}

export { Torre };
