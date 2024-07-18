class Pelota {
    constructor(x, y, diameter, vx, vy) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.vx = vx;
        this.vy = vy;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > width - this.diameter / 2 || this.x < this.diameter / 2) {
            this.reset();
        }

        if (this.y > height - this.diameter / 2 || this.y < this.diameter / 2) {
            this.vy *= -1;
        }
    }

    reset() {
        this.x = 400;
        this.y = 200;
    }

    draw() {
        circle(this.x, this.y, this.diameter);
    }
}

let pelota;

function setup() {
    createCanvas(800, 400);
    pelota = new Pelota(400, 200, 50, 5, 5);
}

function draw() {
    background(0);
    pelota.update();
    pelota.draw();
}
