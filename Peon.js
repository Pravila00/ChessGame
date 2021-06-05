import * as THREE from '../libs/three.module.js'
import { Ficha } from './Ficha.js'
class Peon extends Ficha {
  constructor(tablero,color,fila,columna) {
    super(tablero,color,"Peon");
    
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
    
    var revolGeom = new THREE.LatheGeometry( this.points, 16, 0, 2*Math.PI );

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
    var vacio = true;

    //Si es blanco el peon va hacia delante en el tablero
    if(this.color===0){
        //Primero el movimiento normal
        if (this.fila<=6){
            if(this.tablero.hayFichaEnLaCasilla(this.fila+1,this.columna,this.color) === 0){
                var mov = this.createMovimiento(this.fila+1,this.columna);
                if (mov != null){
                    movimientos.add(mov);
                    vacio = false;
                }
                
            }
            //Comer
            if (this.columna>=1){
                if(this.tablero.hayFichaEnLaCasilla(this.fila+1,this.columna-1,this.color) === 1){
                    var mov = this.createMovimiento(this.fila+1,this.columna-1);
                if (mov != null){
                    movimientos.add(mov);
                    vacio = false;
                }
                    
                }
            }
            if (this.columna<=6){
                if(this.tablero.hayFichaEnLaCasilla(this.fila+1,this.columna+1,this.color) === 1){
                    var mov = this.createMovimiento(this.fila+1,this.columna+1);
                    if (mov != null){
                        movimientos.add(mov);
                        vacio = false;
                    }
                    
                }
            }
        }
        if (this.fila === 1){
            if(this.tablero.hayFichaEnLaCasilla(this.fila+1,this.columna,this.color) === 0 && this.tablero.hayFichaEnLaCasilla(this.fila+2,this.columna,this.color) === 0){
                var mov = this.createMovimiento(this.fila+2,this.columna);
                if (mov != null){
                    movimientos.add(mov);
                    vacio = false;
                }
                
            }
        }
    }
    //Si es negro el peon va hacia atras en el tablero
    else{
        if (this.fila>=1){
            if(this.tablero.hayFichaEnLaCasilla(this.fila-1,this.columna,this.color) === 0){
                var mov = this.createMovimiento(this.fila-1,this.columna);
                if (mov != null){
                    movimientos.add(mov);
                    vacio = false;
                }
                
            }
            //Comer
            if (this.columna>=1){
                if(this.tablero.hayFichaEnLaCasilla(this.fila-1,this.columna-1,this.color) === 1){
                    var mov = this.createMovimiento(this.fila-1,this.columna-1);
                    if (mov != null){
                        movimientos.add(mov);
                        vacio = false;
                    }
                    
                }
            }
            if (this.columna<=6){
                if(this.tablero.hayFichaEnLaCasilla(this.fila-1,this.columna+1,this.color) === 1){
                    var mov = this.createMovimiento(this.fila-1,this.columna+1);
                    if (mov != null){
                        movimientos.add(mov);
                        vacio = false;
                    }
                    
                }
            }
        }
        if (this.fila === 6){
            if(this.tablero.hayFichaEnLaCasilla(this.fila-1,this.columna,this.color) === 0 && this.tablero.hayFichaEnLaCasilla(this.fila-2,this.columna,this.color) === 0){
                var mov = this.createMovimiento(this.fila-2,this.columna);
                if (mov != null){
                    movimientos.add(mov);
                    vacio = false;
                }
                
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

export { Peon };
