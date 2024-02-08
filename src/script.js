// Un juego de Phaser se configura mediante una variable de tipo JSON
const Phaser = require("phaser");

// La variable config es un objeto
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        perload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);

        // En la Función preload meteremos todo lo que se va a cargar antes de inicializar el juego
function preload() {

}
        // En la Función create añadir los distintos objetos (plataformas, fondo..)
function create() {
    
}
        // En la Función update es para ir viendo si el jugador se está moviendo hasta la izq, der, saltando...
        // se actualizará cada segundo para captar todo lo que hace el usuario
function update() {
    
}