class Blob {
    constructor() {
        this.x = 15;
        this.y = 15;
        this.speed = 5;
    }

    draw() {
        ellipse(this.x, this.y, 30, 30);
    }

    up() {
        this.y -= this.speed;
    }

    down() {
        this.y += this.speed;
    }

    left() {
        this.x -= this.speed;
    }

    right() {
        this.x += this.speed;
    }

    getCenter() {
        return createVector(this.x + 15, this.y + 15);
    }
}