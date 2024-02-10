// Un juego de Phaser se configura mediante una variable de tipo JSON

        //COMENTAMOS la siguiente linea porque si no, no se visualizan las imagenes (NO LA BORREN)
//const Phaser = require("phaser");
        //↑La linea anterior se utiliza para importar el framework de juego Phaser en tu script de JavaScript.

// La variable config es un objeto
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
             gravity: { y: 300},
             debug: false
        }
    },
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

                // Plataformas que va a tener ciertas fisicas y serán estaticas.
        platforms = this.physics.add.staticGroup();
        
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        // PERSONAJE
        player = this.physics.add.sprite(100, 450, 'dude');

        // Con esta linea ↓ haremos que el personaje respete los limites de nuestro juego y no caiga al vacio
        player.setCollideWorldBounds(true);
        player.setBounce(0.2); // Hacemos que el personaje rebote un poco al caer

        // Animaciones del personaje
        this.anims.create({
                key: 'left', // Se mueve a la IZQ    // Empezara en el fotograma 0 y acabará en el fotograma 3
                frame: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
                frameRete: 10, // Se va a estar ejecutando a una velocidad de 10 fotogramas por segundos
                repeat: -1, // Le indicamos que la animacion volverá a empezar cuando termine
        });

        this.anims.create({
                key: 'turn',                    // Cuando el personaje esté quieto
                frame: [{ key: 'dude', frame: 4}],
                frameRete: 20, // Ejecutando a una velocidad de 20 fotogramas por segundos
        });

        this.anims.create({
                key: 'right', // Se mueve a la DER    // Empezara en el fotograma 5 y acabará en el fotograma 8
                frame: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
                frameRete: 10, // Se va a estar ejecutando a una velocidad de 10 fotogramas por segundos
                repeat: -1, // Le indicamos que la animacion volverá a empezar cuando termine
        });

        // Gravedad del PJ y Colisiones
        player.body.setGravityY(300);// Gravedad con la que cae el PJ

        this.physics.add.collider(player, platforms);
        // Monitoriza si hay contacto entre el PJ y alguna plataforma para que de esta manera colisione
        // y no lo traspase

}
        // En la Función update es para ir viendo si el jugador se está moviendo hasta la izq, der, saltando...
        // se actualizará cada segundo para captar todo lo que hace el usuario
function update() {
    
}