import * as THREE from '../libs/three.module.js'
 
class MyAlfil extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
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
    
    var revolGeom = new THREE.LatheGeometry( this.points, 24, 0, 2*Math.PI );
    var revolMat = new THREE.MeshPhongMaterial({color: 0xffffff});
    // Para crear una línea visible, como en el vídeo
    this.revol = new THREE.Mesh(revolGeom, revolMat); 
    this.add (this.revol);

  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;
      
      this.posX = 0.0;
      this.posY = 0.0;
      this.posZ = 0.0;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;
        
        this.posX = 0.0;
        this.posY = 0.0;
        this.posZ = 0.0;
      }
    } 
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();
 
    folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.1).name ('Posición X : ').listen();
    folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.1).name ('Posición Y : ').listen();
    folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.1).name ('Posición Z : ').listen();
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    //this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
    //this.rotation.y+=0.01;
    //this.rotation.x+=0.01;
    //this.rotation.z+=0.01;
}
}

export { MyAlfil };
