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
                frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
                frameRate: 10, // Se va a estar ejecutando a una velocidad de 10 fotogramas por segundos
                repeat: -1, // Le indicamos que la animacion volverá a empezar cuando termine
        });

        this.anims.create({
                key: 'turn',                    // Cuando el personaje esté quieto
                frames: [{ key: 'dude', frame: 4}],
                frameRate: 20, // Ejecutando a una velocidad de 20 fotogramas por segundos
        });

        this.anims.create({
                key: 'right', // Se mueve a la DER    // Empezara en el fotograma 5 y acabará en el fotograma 8
                frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
                frameRate: 10, // Se va a estar ejecutando a una velocidad de 10 fotogramas por segundos
                repeat: -1, // Le indicamos que la animacion volverá a empezar cuando termine
        });

        // Gravedad del PJ y Colisiones
        //player.body.setGravityY(300);// Gravedad con la que cae el PJ

        this.physics.add.collider(player, platforms);
        // Monitoriza si hay contacto entre el PJ y alguna plataforma para que de esta manera colisione
        // y no lo traspase

        // CONTROLES DEL PERSONAJE
        // Esta linea ↓ crea el objeto cursors con 4 propiedades (arriba, abajo, izq y der)
        cursors = this.input.keyboard.createCursorKeys();

        // AGREGAMOS LAS ESTRELLAS
        stars = this.physics.add.group({
                key: 'star',
                repeat: 11, // Repite la estrella 11 veces
                setXY: {x: 12, y: 0, stepX: 70 } // X= 12+70= 82 y asi se irá incrementando
                // ↑ Posición de los 12 elementos
        })

        stars.children.iterate(function(child){
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
                // Recorre todos los elementos del grupo y le da a cada uno un valor de rebote en Y aleatorio entre 0.4 y 0.8
        })

        // COLISIÓN DE LAS ESTRELLAS CON LAS PLATAFORMAS
        this.physics.add.collider(stars, platforms);
}

        // En la Función update es para ir viendo si el jugador se está moviendo hasta la izq, der, parado o saltando.
        // se actualizará cada segundo para captar todo lo que hace el usuario    
function update() {
        // CONFIGURACIÓN DE CONTROLES
    // cuando el usuario esté presionando la tecla izq
    if(cursors.left.isDown){
        player.setVelocityX(-160); // Se aplica una velocidad horizontal negativa
        player.anims.play('left', true);
    }

    // cuando el usuario esté presionando la tecla der
    else if(cursors.right.isDown){
        player.setVelocityX(160);
        player.anims.play('right', true);
    }

    // Si el jugador no pulsa ninguna tecla mantendrá el pj quieto y no se bugueará.
    else{
        player.setVelocityX(0); // Se aplica una velocidad horizontal de 0
        player.anims.play('turn');
    }

    // Si pulsamos la tecla arriba el personaje saltará y se verifica que esté tocando el suelo 
    // para que que no salte tambien estando en el aire
    if(cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-330); // Se aplica una velocidad vertical de -330
    }
}