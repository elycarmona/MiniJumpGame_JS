// Un juego de Phaser se configura mediante una variable de tipo JSON

        //COMENTAMOS la siguiente linea porque si no, no se visualizan las imagenes (NO LA BORREN)
//const Phaser = require("phaser");
        //↑La linea anterior se utiliza para importar el framework de juego Phaser en tu script de JavaScript.

// La variable config es un objeto
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);

        // En la Función preload meteremos todo lo que se va a cargar antes de inicializar el juego
function preload() {
        this.load.image('sky', 'assets/sky.png'); // cielo
        this.load.image('ground', 'assets/platform.png'); // suelo
        this.load.image('star', 'assets/star.png'); // estrella
        this.load.image('bomb', 'assets/bomb.png'); // bomba
        // Cargamos el personaje ↓
        this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48})
}
        // En la Función create añadir los distintos objetos (plataformas, fondo..)
function create() {
        this.add.image(400, 300, 'sky'); // x px, y px, nombre
}
        // En la Función update es para ir viendo si el jugador se está moviendo hasta la izq, der, saltando...
        // se actualizará cada segundo para captar todo lo que hace el usuario
function update() {
    
}