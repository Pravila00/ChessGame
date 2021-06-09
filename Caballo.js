import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'
import { Ficha } from './Ficha.js'
import { OBJLoader } from '../libs/OBJLoader.js'
import { MTLLoader } from '../libs/MTLLoader.js'
class Caballo extends Ficha {
  constructor(tablero,color) {
    super(tablero,color,"Caballo");

   //Se establece el material
   if (color === 0){
        this.mat = new THREE.MeshPhongMaterial({color: 0xffffff});
    }
    else{
        this.mat = new THREE.MeshPhongMaterial({color: 0x2D2C2C});
    }

    //Creamos el modelo del caballo
    var that = this;
    var objectLoader = new OBJLoader();
    objectLoader.load('./models/horse.obj',
        function(object){
            object.traverse( function ( obj ) {
              if ( obj instanceof THREE.Mesh ) {
                  obj.material = that.mat;
                  that.modelo = obj;
                }
              } 
            );
            
            that.add (that.modelo);
        }, 
        null, 
        null
    );

    //Rotaciones
    this.rotation.x=+Math.PI/2;
    //Si la ficha es blanca
    if(color == 0){
        this.rotation.y=-Math.PI;
    }
    //Si la ficha es negra
    else{
        this.rotation.z = Math.PI;
        this.rotation.y=Math.PI;

    }
    //Escalado
    this.scale.x = 1.75;
    this.scale.y = 1.75;
    this.scale.z = 1.75;
    

  }

  getColor(){
      return this.color;
  }

  //Devuelve un Object3D con los movimientos amarillos
  getMovimientos(){
    var movimientos = new THREE.Object3D();
    var vacio = true;

    if (this.fila+2 <=7  && this.columna+1 <=7){
        if(this.tablero.hayFichaEnLaCasilla(this.fila+2,this.columna+1,this.color) !== 2){
            var mov = this.createMovimiento(this.fila+2,this.columna+1);
          if (mov != null){
            movimientos.add(mov);
            vacio = false;
          }
        }
    }
    if (this.fila+1 <=7  && this.columna+2 <=7){
        if(this.tablero.hayFichaEnLaCasilla(this.fila+1,this.columna+2,this.color) !== 2){
            var mov = this.createMovimiento(this.fila+1,this.columna+2);
            if (mov != null){
                movimientos.add(mov);
                vacio = false;
            }
        }
    }
    if (this.fila-1 >=0  && this.columna+2 <=7){
        if(this.tablero.hayFichaEnLaCasilla(this.fila-1,this.columna+2,this.color) !== 2){
            var mov = this.createMovimiento(this.fila-1,this.columna+2);
            if (mov != null){
                movimientos.add(mov);
                vacio = false;
            }
        }
    }
    if (this.fila-2 >=0  && this.columna+1 <=7){
        if(this.tablero.hayFichaEnLaCasilla(this.fila-2,this.columna+1,this.color) !== 2){
            var mov = this.createMovimiento(this.fila-2,this.columna+1);
            if (mov != null){
                movimientos.add(mov);
                vacio = false;
            }
            
        }
    }

    if (this.fila+2 <=7  && this.columna-1 >=0){
        if(this.tablero.hayFichaEnLaCasilla(this.fila+2,this.columna-1,this.color) !== 2){
            var mov = this.createMovimiento(this.fila+2,this.columna-1);
            if (mov != null){
                movimientos.add(mov);
                vacio = false;
            }
            
        }
    }
    if (this.fila+1 <=7  && this.columna-2 >=0){
        if(this.tablero.hayFichaEnLaCasilla(this.fila+1,this.columna-2,this.color) !== 2){
            var mov = this.createMovimiento(this.fila+1,this.columna-2);
            if (mov != null){
                movimientos.add(mov);
                vacio = false;
            }
            
        }
    }
    if (this.fila-1 >=0  && this.columna-2 >=0){
        if(this.tablero.hayFichaEnLaCasilla(this.fila-1,this.columna-2,this.color) !== 2){
            var mov = this.createMovimiento(this.fila-1,this.columna-2);
            if (mov != null){
                movimientos.add(mov);
                vacio = false;
            }
            
        }
    }
    if (this.fila-2 >=0  && this.columna-1 >=0){
        if(this.tablero.hayFichaEnLaCasilla(this.fila-2,this.columna-1,this.color) !== 2){
            var mov = this.createMovimiento(this.fila-2,this.columna-1);
            if (mov != null){
                movimientos.add(mov);
                vacio = false;
            }
            
        }
    }
    
    if (vacio){
        return null;
    }else{
        return movimientos;
    }
  }

}

export { Caballo };
