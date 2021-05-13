import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import { MTLLoader } from '../libs/MTLLoader.js'
import { Ficha } from './Ficha.js'
 
class Caballo extends Ficha {
  constructor(tablero,color) {
    super();

    var that = this;
    
    var objectLoader = new OBJLoader();
    objectLoader.load('./models/My_Knight.obj',
      function (object) {
          that.modelo = object;
          that.add(that.modelo);
      }, null, null);

      this.scale.set(0.15,0.15,0.15);
      this.rotation.x = 3*Math.PI/2;
      this.rotation.z = Math.PI;
      if(color == 0){
        this.rotation.y = Math.PI;
      }
  }

}

export { Caballo };
