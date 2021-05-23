import * as THREE from '../libs/three.module.js'
import { Ficha } from './Ficha.js'
 
class Torre extends Ficha {
  constructor(tablero,color) {
    super(tablero,color,"Torre");
    this.haMovido = false;
    
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
      var revolMat = new THREE.MeshPhongMaterial({color: 0x2D2C2C});
    }
    // Para crear una línea visible, como en el vídeo
    this.revol = new THREE.Mesh(revolGeom, revolMat); 
    this.add (this.revol);

  }

  getMovimientos(){
    var movimientos = new THREE.Object3D();

    //Recorremos las filas superiores de la torre (Arriba)
    var hayFichaEnElCamino = false;
    for(var i=this.fila+1;i<8 && !hayFichaEnElCamino;i++){
      var fichaEnCasilla = this.tablero.hayFichaEnLaCasilla(i,this.columna,this.color);
      switch(fichaEnCasilla){
        //No hay ficha
        case 0:
          movimientos.add(this.createMovimiento(i,this.columna));
        break;
        //Hay ficha enemiga
        case 1:
          movimientos.add(this.createMovimiento(i,this.columna));
          hayFichaEnElCamino=true;
        break;
        //Hay ficha aliada
        case 2:
          hayFichaEnElCamino=true;
        break;
      }
    }
      
    //Recorremos las filas inferiores de la torre (Abajo)
    hayFichaEnElCamino = false;
    for(var i=this.fila-1;i>=0 && !hayFichaEnElCamino;i--){
      var fichaEnCasilla = this.tablero.hayFichaEnLaCasilla(i,this.columna,this.color);
      switch(fichaEnCasilla){
        //No hay ficha
        case 0:
          movimientos.add(this.createMovimiento(i,this.columna));
        break;
        //Hay ficha enemiga
        case 1:
          movimientos.add(this.createMovimiento(i,this.columna));
          hayFichaEnElCamino=true;
        break;
        //Hay ficha aliada
        case 2:
          hayFichaEnElCamino=true;
        break;
      }
    }

    //Recorremos las columnas superiores de la torre (Izquierda)
    hayFichaEnElCamino = false;
    for(var i=this.columna-1;i>=0 && !hayFichaEnElCamino;i--){
      var fichaEnCasilla = this.tablero.hayFichaEnLaCasilla(this.fila,i,this.color);
      switch(fichaEnCasilla){
        //No hay ficha
        case 0:
          movimientos.add(this.createMovimiento(this.fila,i));
        break;
        //Hay ficha enemiga
        case 1:
          movimientos.add(this.createMovimiento(this.fila,i));
          hayFichaEnElCamino=true;
        break;
        //Hay ficha aliada
        case 2:
          hayFichaEnElCamino=true;
        break;
      }
    }

    //Recorremos las columnas inferiores de la torre (Derecha)
    hayFichaEnElCamino = false;
    for(var i=this.columna+1;i<8 && !hayFichaEnElCamino;i++){
      var fichaEnCasilla = this.tablero.hayFichaEnLaCasilla(this.fila,i,this.color);
      switch(fichaEnCasilla){
        //No hay ficha
        case 0:
          movimientos.add(this.createMovimiento(this.fila,i));
        break;
        //Hay ficha enemiga
        case 1:
          movimientos.add(this.createMovimiento(this.fila,i));
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

export { Torre };
