import * as THREE from '../libs/three.module.js'
import { Ficha } from './Ficha.js'
class Dama extends Ficha {
  constructor(tablero,color) {
    super(tablero,color,"Dama");
    
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
          var mov = this.createMovimiento(fila,columna);
          if (mov != null){
            movimientos.add(mov);
          }
        break;
        //Hay ficha enemiga
        case 1:
          var mov = this.createMovimiento(fila,columna);
          if (mov != null){
            movimientos.add(mov);
          }
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
          var mov = this.createMovimiento(fila,columna);
          if (mov != null){
            movimientos.add(mov);
          }
        break;
        //Hay ficha enemiga
        case 1:
          var mov = this.createMovimiento(fila,columna);
          if (mov != null){
            movimientos.add(mov);
          }
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
          var mov = this.createMovimiento(fila,columna);
          if (mov != null){
            movimientos.add(mov);
          }
        break;
        //Hay ficha enemiga
        case 1:
          var mov = this.createMovimiento(fila,columna);
          if (mov != null){
            movimientos.add(mov);
          }
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
          var mov = this.createMovimiento(fila,columna);
          if (mov != null){
            movimientos.add(mov);
          }
        break;
        //Hay ficha enemiga
        case 1:
          var mov = this.createMovimiento(fila,columna);
          if (mov != null){
            movimientos.add(mov);
          }
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

    //Recorremos las filas superiores(Arriba)
    var hayFichaEnElCamino = false;
    for(var i=this.fila+1;i<8 && !hayFichaEnElCamino;i++){
      var fichaEnCasilla = this.tablero.hayFichaEnLaCasilla(i,this.columna,this.color);
      switch(fichaEnCasilla){
        //No hay ficha
        case 0:
          var mov = this.createMovimiento(i,this.columna);
          if (mov != null){
            movimientos.add(mov);
          }
        break;
        //Hay ficha enemiga
        case 1:
          var mov = this.createMovimiento(i,this.columna);
          if (mov != null){
            movimientos.add(mov);
          }
          hayFichaEnElCamino=true;
        break;
        //Hay ficha aliada
        case 2:
          hayFichaEnElCamino=true;
        break;
      }
    }
      
    //Recorremos las filas inferiores(Abajo)
    hayFichaEnElCamino = false;
    for(var i=this.fila-1;i>=0 && !hayFichaEnElCamino;i--){
      var fichaEnCasilla = this.tablero.hayFichaEnLaCasilla(i,this.columna,this.color);
      switch(fichaEnCasilla){
        //No hay ficha
        case 0:
          var mov = this.createMovimiento(i,this.columna);
          if (mov != null){
            movimientos.add(mov);
          }
        break;
        //Hay ficha enemiga
        case 1:
          var mov = this.createMovimiento(i,this.columna);
          if (mov != null){
            movimientos.add(mov);
          }
          hayFichaEnElCamino=true;
        break;
        //Hay ficha aliada
        case 2:
          hayFichaEnElCamino=true;
        break;
      }
    }

    //Recorremos las columnas superiores(Izquierda)
    hayFichaEnElCamino = false;
    for(var i=this.columna-1;i>=0 && !hayFichaEnElCamino;i--){
      var fichaEnCasilla = this.tablero.hayFichaEnLaCasilla(this.fila,i,this.color);
      switch(fichaEnCasilla){
        //No hay ficha
        case 0:
          var mov = this.createMovimiento(this.fila,i);
          if (mov != null){
            movimientos.add(mov);
          }
        break;
        //Hay ficha enemiga
        case 1:
          var mov = this.createMovimiento(this.fila,i);
          if (mov != null){
            movimientos.add(mov);
          }
          hayFichaEnElCamino=true;
        break;
        //Hay ficha aliada
        case 2:
          hayFichaEnElCamino=true;
        break;
      }
    }

    //Recorremos las columnas inferiores(Derecha)
    hayFichaEnElCamino = false;
    for(var i=this.columna+1;i<8 && !hayFichaEnElCamino;i++){
      var fichaEnCasilla = this.tablero.hayFichaEnLaCasilla(this.fila,i,this.color);
      switch(fichaEnCasilla){
        //No hay ficha
        case 0:
          var mov = this.createMovimiento(this.fila,i);
          if (mov != null){
            movimientos.add(mov);
          }
        break;
        //Hay ficha enemiga
        case 1:
          var mov = this.createMovimiento(this.fila,i);
          if (mov != null){
            movimientos.add(mov);
          }
          hayFichaEnElCamino=true;
        break;
        //Hay ficha aliada
        case 2:
          hayFichaEnElCamino=true;
        break;
      }
    }
    
    return movimientos;
  }

}

export { Dama };
