import * as THREE from '../libs/three.module.js'
import { Ficha } from './Ficha.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'
 
class Rey extends Ficha {
  constructor(tablero,color) {
    super(tablero,color);
    
    // Puntos
    this.points = [];
    this.points.push (new THREE.Vector2 (0, 0, 0));
    this.points.push (new THREE.Vector2 (2, 0, 0));
    this.points.push (new THREE.Vector2 (2, 0.5, 0));
    this.points.push (new THREE.Vector2 (1.2, 0.5, 0));

    this.points.push (new THREE.Vector2 (0.7, 4.8, 0));
    this.points.push (new THREE.Vector2 (1, 4.8, 0));
    this.points.push (new THREE.Vector2 (1, 4.9, 0));
    this.points.push (new THREE.Vector2 (0.6, 5.2, 0));
    this.points.push (new THREE.Vector2 (0.8, 5.3, 0));
    this.points.push (new THREE.Vector2 (0.6, 5.4, 0));

    this.points.push (new THREE.Vector2 (0.5, 6, 0));
    this.points.push (new THREE.Vector2 (0.6, 6.1, 0));
    this.points.push (new THREE.Vector2 (0.5, 6.2, 0));

    this.points.push (new THREE.Vector2 (0.8, 7.1, 0));
    this.points.push (new THREE.Vector2 (0.0, 7.1, 0));

    var revolGeom = new THREE.LatheGeometry( this.points, 24, 0, 2*Math.PI );

    var cruz1 = new THREE.CubeGeometry(0.2,1,0.2);
    var cruz2 = new THREE.CubeGeometry(0.6,0.2,0.2);

    cruz1.translate(0,7.6,0);
    cruz2.translate(0,7.7,0);

    var cruz1BSP = new ThreeBSP(cruz1);
    var cruz2BSP = new ThreeBSP(cruz2);
    var revolGeomBSP = new ThreeBSP(revolGeom);

    var aux = cruz1BSP.union(cruz2BSP);
    var aux2 = aux.union(revolGeomBSP);
    

    if (color === 0){
      var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
    }
    else{
      var mat = new THREE.MeshPhongMaterial({color: 0x2D2C2C});
    }
    // Para crear una línea visible, como en el vídeo

    this.rey = aux2.toMesh(mat);

    this.add (this.rey);

  }

}

export { Rey };
