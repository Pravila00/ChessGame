import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'
import { Ficha } from './Ficha.js'
 
class Caballo extends Ficha {
  constructor(tablero,color) {
    super(tablero,color,"Caballo");

    var base = new THREE.CylinderGeometry(2,2,0.5,16,16);
    var cuerpo = new THREE.CylinderGeometry(0.7,1.3,4.8,16,16);
    var curva = new THREE.CylinderGeometry(2,2,2,16,16);
    var cabeza = new THREE.SphereGeometry(1.2,16,16);
    var cresta = new THREE.CylinderGeometry(1.2,1.2,0.5,12,12);
    var cresta2 = new THREE.CylinderGeometry(1.2,1.2,0.5,12,12);
    var crestaresta = new THREE.CylinderGeometry(2,2,2,12,12);
    var boca = new THREE.CubeGeometry(2,2,2);

    base.translate(0,0.25,0);
    cuerpo.translate(0,2.7,0);
    curva.rotateZ(Math.PI/2);
    curva.rotateY(Math.PI/2);
    curva.translate(2.4,2.5,0);
    cabeza.scale(1.7,1,0.7);
    cabeza.translate(-0.3,5.6,0);
    cabeza.rotateZ(-Math.PI/16);
    cresta.scale(1.7,1.3,0.7);
    cresta.rotateX(Math.PI/2);
    cresta.translate(1,6.8,0);
    cresta2.scale(1.7,1.3,0.7);
    cresta2.rotateX(Math.PI/2);
    cresta2.rotateZ(Math.PI/2);
    cresta2.translate(-0.8,5,0);
    crestaresta.rotateX(Math.PI/2);
    crestaresta.translate(3.5,5.5,0);
    boca.rotateZ(Math.PI/4);
    boca.scale(4,0.3,1);
    boca.rotateZ(-Math.PI/40);
    boca.translate(7,5,0);

    
    

    var baseBSP = new ThreeBSP(base);
    var cuerpoBSP = new ThreeBSP(cuerpo);
    var curvaBSP = new ThreeBSP(curva);
    var cabezaBSP = new ThreeBSP(cabeza);
    var crestaBSP = new ThreeBSP(cresta);
    var crestaBSP2 = new ThreeBSP(cresta2);
    var crestarestaBSP = new ThreeBSP(crestaresta);
    var bocaBSP = new ThreeBSP(boca);

    var cresta = crestaBSP.union(crestaBSP2);
    var crestaF = cresta.subtract(crestarestaBSP);

    var aux = baseBSP.union(cuerpoBSP);
    var aux2 = aux.subtract(curvaBSP);
    var aux3 = aux2.union(cabezaBSP);
    var aux4 = aux3.union(crestaF);
    var aux5 = aux4.subtract(bocaBSP);

    if (color === 0){
    var mat = new THREE.MeshPhongMaterial({color: 0xffffff});
    this.rotation.y=Math.PI/2;
    }
    else{
    var mat = new THREE.MeshPhongMaterial({color: 0x2D2C2C});
    this.rotation.y=-Math.PI/2;;
    }

    var caballo = aux5.toMesh(mat);
    this.add(caballo);

  }

  getMovimientos(){
    var movimientos = new THREE.Object3D();

    if (this.fila+2 <=7  && this.columna+1 <=7){
        if(this.tablero.hayFichaEnLaCasilla(this.fila+2,this.columna+1,this.color) !== 2){
            var mov = this.createMovimiento(this.fila+2,this.columna+1);
          if (mov != null){
            movimientos.add(mov);
          }
        }
    }
    if (this.fila+1 <=7  && this.columna+2 <=7){
        if(this.tablero.hayFichaEnLaCasilla(this.fila+1,this.columna+2,this.color) !== 2){
            var mov = this.createMovimiento(this.fila+1,this.columna+2);
            if (mov != null){
                movimientos.add(mov);
            }
        }
    }
    if (this.fila-1 >=0  && this.columna+2 <=7){
        if(this.tablero.hayFichaEnLaCasilla(this.fila-1,this.columna+2,this.color) !== 2){
            var mov = this.createMovimiento(this.fila-1,this.columna+2);
            if (mov != null){
                movimientos.add(mov);
            }
        }
    }
    if (this.fila-2 >=0  && this.columna+1 <=7){
        if(this.tablero.hayFichaEnLaCasilla(this.fila-2,this.columna+1,this.color) !== 2){
            var mov = this.createMovimiento(this.fila-2,this.columna+1);
            if (mov != null){
                movimientos.add(mov);
            }
            
        }
    }

    if (this.fila+2 <=7  && this.columna-1 >=0){
        if(this.tablero.hayFichaEnLaCasilla(this.fila+2,this.columna-1,this.color) !== 2){
            var mov = this.createMovimiento(this.fila+2,this.columna-1);
            if (mov != null){
                movimientos.add(mov);
            }
            
        }
    }
    if (this.fila+1 <=7  && this.columna-2 >=0){
        if(this.tablero.hayFichaEnLaCasilla(this.fila+1,this.columna-2,this.color) !== 2){
            var mov = this.createMovimiento(this.fila+1,this.columna-2);
            if (mov != null){
                movimientos.add(mov);
            }
            
        }
    }
    if (this.fila-1 >=0  && this.columna-2 >=0){
        if(this.tablero.hayFichaEnLaCasilla(this.fila-1,this.columna-2,this.color) !== 2){
            var mov = this.createMovimiento(this.fila-1,this.columna-2);
            if (mov != null){
                movimientos.add(mov);
            }
            
        }
    }
    if (this.fila-2 >=0  && this.columna-1 >=0){
        if(this.tablero.hayFichaEnLaCasilla(this.fila-2,this.columna-1,this.color) !== 2){
            var mov = this.createMovimiento(this.fila-2,this.columna-1);
            if (mov != null){
                movimientos.add(mov);
            }
            
        }
    }

    return movimientos;
  }

}

export { Caballo };
