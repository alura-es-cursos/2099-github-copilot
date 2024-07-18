let imagenPelota;
let imagenRaqueta;
let imagenComputadora;
let imagenFondo;
let sonidoRaqueta;
let sonidoGol;

let puntosJugador = 0;
let puntosComputadora = 0;


class Pelota {
    constructor(x, y, diameter, vx, vy) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        //velocidad el sentido inicial de la pelota sea un valor aleatorio, utiliza la función math.random()
        this.vx = vx;
        this.vy = vy;
        this.reset();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        //aumente la roatación de la pelota con la velocidad en el eje x y la velocidad en el eje y
        this.rotation += this.vx + this.vy;

        if (this.x > width - this.diameter / 2 || this.x < this.diameter / 2) {
            sonidoGol.play();
            if (this.x < width / 2) {
                puntosComputadora++;
            } else {
                puntosJugador++;
            }
            narrarPuntos();    
            this.reset();
        }

        if (this.y > height - this.diameter / 2 || this.y < this.diameter / 2) {
            this.vy *= -1;
        }

        //si colisiona con la raqueta del jugador o la computadora, invierte el sentido y aumenta la velocidad en 10%
        if (colision(this.x, this.y, this.diameter, raqueta.x, raqueta.y, raqueta.width, raqueta.height) || colision(this.x, this.y, this.diameter, computadora.x, computadora.y, computadora.width, computadora.height)) {
            sonidoRaqueta.play();
            this.vx *= -1;
            this.vx *= 1.1;
            this.vy *= 1.1;
        }

    }        

    reset() {
        this.x = 400;
        this.y = 200;
        this.vx = 5 * (Math.random() < 0.5 ? -1 : 1);
        this.vy = 5 * (Math.random() < 0.5 ? -1 : 1);
        //rotación actual de la pelota
        this.rotation = 0;
    }

    draw() {
        //dibuja la pelota como una imagen en lugar de un círculo
        //rotaciona la pelota antes de dibujarla
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        image(imagenPelota, -this.diameter / 2, -this.diameter / 2, this.diameter, this.diameter);
        pop();
        //circle(this.x, this.y, this.diameter);
    }
}

class Raqueta {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    update() {
        //raqueta del jugador se mueva con el mouse
        //identifa si la raqueta es la del jugador, raqueta jugadod es la de la izquierda
        if (this.x < width / 2) {
            this.y = mouseY;
        } else {
            //raqueta de la computadora se mueva siguiendo la pelota
            if (pelota.y > this.y) {
                this.y += this.speed;
            } else {
                this.y -= this.speed;
            }
        }
        //limitar el movimiento de la raqueta, para que no se salga de la pantalla
        this.y = constrain(this.y, 0, height - this.height);
    }

    draw() {
        //si raqueta jugador dibuja la raqueta con la imagen de la raqueta del jugador
        if (this.x < width / 2) {
            image(imagenRaqueta, this.x, this.y, this.width, this.height);
        } else {
            //si raqueta computadora dibuja la raqueta con la imagen de la raqueta de la computadora
            image(imagenComputadora, this.x, this.y, this.width, this.height);
        }       
        //rect(this.x, this.y, this.width, this.height);
    }
}

let pelota;
let raqueta;
let computadora;

//verificar la colisión entre una circunferencia y un rectángulo
//circunferencia cx, cy, diametro
//rectángulo rx, ry, width, height
function colision(cx, cy, diameter, rx, ry, rw, rh) {
    //Si el circulo esta a la izquierda del rectángulo
    if (cx + diameter / 2 < rx) {
        return false;
    }
    //Si el circulo esta arriba del rectángulo
    if (cy + diameter / 2 < ry) {
        return false;
    }
    //Si el circulo esta a la derecha del rectángulo
    if (cx - diameter / 2 > rx + rw) {
        return false;
    }
    //Si el circulo esta abajo del rectángulo
    if (cy - diameter / 2 > ry + rh) {
        return false;
    }
    return true;
}

function preload() {
    imagenPelota = loadImage('pelota.png');
    imagenRaqueta = loadImage('raqueta1.png');
    imagenComputadora = loadImage('raqueta2.png');
    imagenFondo = loadImage('fondo2.png');
    sonidoRaqueta = loadSound('446100__justinvoke__bounce.wav');
    sonidoGol = loadSound('274178__littlerobotsoundfactory__jingle_win_synth_02.wav');
}


function setup() {
    createCanvas(800, 400);
    pelota = new Pelota(400, 200, 50,5,5);
    raqueta = new Raqueta(20, 150, 20, 100, 5);
    computadora = new Raqueta(760, 150, 20, 100, 5);
}

function narrarPuntos() {
    //Narra los puntos utilizando la api speechapi
    //Narra utilizando español de México
    let puntos = "El marcador está Jugador" + puntosJugador + " a Computadora" + puntosComputadora;
    let mensaje = new SpeechSynthesisUtterance(puntos);
    mensaje.lang = 'es-MX'; 
    speechSynthesis.speak(mensaje);
}


function draw() {
    //background(0);
    //dibujar el fondo
    image(imagenFondo, 0, 0, width, height);
    pelota.update();
    pelota.draw();
    raqueta.update();
    raqueta.draw();
    computadora.update();
    computadora.draw();
}
