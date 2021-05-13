import * as THREE from '../libs/three.module.js'
import { Ficha } from './Ficha.js'
class Dama extends Ficha {
  constructor(tablero,color) {
    super();
    
    // Puntos
    this.points = [];
    this.points.push (new THREE.Vector2 (0, 0, 0));
    this.points.push (new THREE.Vector2 (2, 0, 0));
    this.points.push (new THREE.Vector2 (2, 0.5, 0));
    this.points.push (new THREE.Vector2 (1.2, 0.5, 0));

    this.points.push (new THREE.Vector2 (0.7, 4.6, 0));
    this.points.push (new THREE.Vector2 (1, 4.6, 0));
    this.points.push (new THREE.Vector2 (1, 4.7, 0));
    this.points.push (new THREE.Vector2 (0.6, 5, 0));
    this.points.push (new THREE.Vector2 (0.8, 5.1, 0));
    this.points.push (new THREE.Vector2 (0.6, 5.2, 0));

    this.points.push (new THREE.Vector2 (0.5, 5.8, 0));
    this.points.push (new THREE.Vector2 (0.6, 5.9, 0));
    this.points.push (new THREE.Vector2 (0.5, 6, 0));


    this.points.push (new THREE.Vector2 (0.9, 6.9, 0));
    this.points.push (new THREE.Vector2 (0.7, 7, 0));

    this.points.push (new THREE.Vector2 (0.3, 6.6, 0));
    this.points.push (new THREE.Vector2 (0.4, 6.7, 0));
    
    this.points.push (new THREE.Vector2 (0.4, 7, 0));
    this.points.push (new THREE.Vector2 (0.3, 7.1, 0));
    this.points.push (new THREE.Vector2 (0.2, 7.2, 0));
    this.points.push (new THREE.Vector2 (0.1, 7.25, 0));
    this.points.push (new THREE.Vector2 (0.0, 7.25, 0));

    this.points.push (new THREE.Vector2 (0.1, 7.3, 0));
    this.points.push (new THREE.Vector2 (0.2, 7.4, 0));
    this.points.push (new THREE.Vector2 (0.1, 7.5, 0));
    this.points.push (new THREE.Vector2 (0.00, 7.5, 0));
    

    
    
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

export { Dama };
