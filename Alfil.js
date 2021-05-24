import * as THREE from '../libs/three.module.js'
import { Ficha } from './Ficha.js'
 
class Alfil extends Ficha {
  constructor(tablero,color) {
    super(tablero,color,"Alfil");
    
    // Puntos
    this.points = [];
    this.points.push (new THREE.Vector2 (0, 0, 0));
    this.points.push (new THREE.Vector2 (2, 0, 0));
    this.points.push (new THREE.Vector2 (2, 0.5, 0));
    this.points.push (new THREE.Vector2 (1.2, 0.5, 0));

    this.points.push (new THREE.Vector2 (0.5, 4.6, 0));
    this.points.push (new THREE.Vector2 (1, 4.6, 0));
    this.points.push (new THREE.Vector2 (1, 4.7, 0));
    this.points.push (new THREE.Vector2 (0.5, 4.8, 0));
    this.points.push (new THREE.Vector2 (0.7, 4.9, 0));
    this.points.push (new THREE.Vector2 (0.5, 5, 0));

    this.points.push (new THREE.Vector2 (0.5, 5.3, 0));
    this.points.push (new THREE.Vector2 (0.8, 5.3, 0));

    this.points.push (new THREE.Vector2 (0.2, 6.8, 0));
    this.points.push (new THREE.Vector2 (0.3, 6.9, 0));
    this.points.push (new THREE.Vector2 (0.4, 7, 0));
    this.points.push (new THREE.Vector2 (0.3, 7.1, 0));
    this.points.push (new THREE.Vector2 (0.2, 7.2, 0));
    this.points.push (new THREE.Vector2 (0, 7.2, 0));
    
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

    //Arriba izquierda
    var hayFichaEnElCamino = false;
    var fila=this.fila+1;
    var columna=this.columna-1;
    while(fila<8 && columna>=0 && !hayFichaEnElCamino){
      var fichaEnCasilla = this.tablero.hayFichaEnLaCasilla(fila,columna,this.color);
      switch(fichaEnCasilla){
        //No hay ficha
        case 0:
          movimientos.add(this.createMovimiento(fila,columna));
        break;
        //Hay ficha enemiga
        case 1:
          movimientos.add(this.createMovimiento(fila,columna));
          hayFichaEnElCamino=true;
        break;
        //Hay ficha aliada
        case 2:
          hayFichaEnElCamino=true;
        break;
      }
      fila++;
      columna--;
    }

    //Arriba derecha
    var hayFichaEnElCamino = false;
    var fila=this.fila+1;
    var columna=this.columna+1;
    while(fila<8 && columna<8 && !hayFichaEnElCamino){
      var fichaEnCasilla = this.tablero.hayFichaEnLaCasilla(fila,columna,this.color);
      switch(fichaEnCasilla){
        //No hay ficha
        case 0:
          movimientos.add(this.createMovimiento(fila,columna));
        break;
        //Hay ficha enemiga
        case 1:
          movimientos.add(this.createMovimiento(fila,columna));
          hayFichaEnElCamino=true;
        break;
        //Hay ficha aliada
        case 2:
          hayFichaEnElCamino=true;
        break;
      }
      fila++;
      columna++;
    }

    //Abajo izquierda
    var hayFichaEnElCamino = false;
    var fila=this.fila-1;
    var columna=this.columna-1;
    while(fila>=0 && columna>=0 && !hayFichaEnElCamino){
      var fichaEnCasilla = this.tablero.hayFichaEnLaCasilla(fila,columna,this.color);
      switch(fichaEnCasilla){
        //No hay ficha
        case 0:
          movimientos.add(this.createMovimiento(fila,columna));
        break;
        //Hay ficha enemiga
        case 1:
          movimientos.add(this.createMovimiento(fila,columna));
          hayFichaEnElCamino=true;
        break;
        //Hay ficha aliada
        case 2:
          hayFichaEnElCamino=true;
        break;
      }
      fila--;
      columna--;
    }

    //Abajo derecha
    var hayFichaEnElCamino = false;
    var fila=this.fila-1;
    var columna=this.columna+1;
    while(fila>=0 && columna<8 && !hayFichaEnElCamino){
      var fichaEnCasilla = this.tablero.hayFichaEnLaCasilla(fila,columna,this.color);
      switch(fichaEnCasilla){
        //No hay ficha
        case 0:
          movimientos.add(this.createMovimiento(fila,columna));
        break;
        //Hay ficha enemiga
        case 1:
          movimientos.add(this.createMovimiento(fila,columna));
          hayFichaEnElCamino=true;
        break;
        //Hay ficha aliada
        case 2:
          hayFichaEnElCamino=true;
        break;
      }
      fila--;
      columna++;
    }
    
    return movimientos;
  }

}

export { Alfil };
