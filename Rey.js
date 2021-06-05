import * as THREE from '../libs/three.module.js'
import { Ficha } from './Ficha.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'
 
class Rey extends Ficha {
  constructor(tablero,color) {
    super(tablero,color,"Rey");

    this.haMovido = false;
    
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

    var revolGeom = new THREE.LatheGeometry( this.points, 16, 0, 2*Math.PI );

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

  mover(nuevaFila,nuevaColumna){
    this.fila = nuevaFila;
    this.columna = nuevaColumna;

    if (!((nuevaFila == 0 && nuevaColumna == 4) || (nuevaFila == 7 && nuevaColumna == 4)))
        this.haMovido = true;
  }

  getMovimientos(){
    var movimientos = new THREE.Object3D();

    for (var i=-1 ; i<2 ; i++){
        for (var j= -1 ; j<2; j++){
            if (i !== 0 || j!==0){
                if (this.fila+i <= 7 && this.fila+i >=0 && this.columna+j <=7 && this.columna+j >=0){
                    if(this.tablero.hayFichaEnLaCasilla(this.fila+i,this.columna+j,this.color) !== 2){
                        var mov = this.createMovimiento(this.fila+i,this.columna+j);
                        if (mov != null){
                            movimientos.add(mov);
                        }
                        
                    }
                }
            }
        }
    }

    //Enroque corto


    if (this.haMovido === false){
        var ficha = this.tablero.getObjetoFicha(this.fila,7)
        if (ficha !== null)
        if (ficha.getTipoFicha().localeCompare("Torre") == 0){
            if (!ficha.getHaMovido()){
                var posible= true;
                for (var i= this.columna+1 ; i<7 && posible; i++){
                    if (this.tablero.hayFichaEnLaCasilla(this.fila,i) !== 0){
                        posible = false;
                    }
                }
                if (posible){
                    
                    var mov = this.createMovimiento(this.fila,this.columna+2);
                    if (mov != null){
                        movimientos.add(mov);
                    }
                }
            }
        }

    //Enroque Largo

        var ficha = this.tablero.getObjetoFicha(this.fila,0)
        if (ficha !== null)
        if (ficha.getTipoFicha().localeCompare("Torre") == 0){
            if (!ficha.getHaMovido()){
                var posible= true;
                for (var i= this.columna-1 ; i>1 && posible; i--){
                    if (this.tablero.hayFichaEnLaCasilla(this.fila,i) !== 0){
                        posible = false;
                    }
                }
                if (posible){
                    var mov = this.createMovimiento(this.fila,this.columna-2);
                    if (mov != null){
                        movimientos.add(mov);
                    }
                    
                }
            }
        }
    }

    

    

    return movimientos;
  }

  getHaMovido(){
    return this.haMovido;
}

}

export { Rey };
