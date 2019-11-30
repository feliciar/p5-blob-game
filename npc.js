class NPC {
    constructor() {
        this.position = createVector(random(15, width-15), random(15, height-15));
        this.center = this.position.copy().add(15, 15);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.speed = 5;
        this.maxSpeed = 5;
        this.speedIncrease = 1.5;
        this.minSpeed = 0.5;
    }

    draw() {
        ellipse(this.position.x, this.position.y, 30, 30);
    }

    move (mainBlob, npcs) {
        let closestDistance = this.getClosestDistance(this.center, mainBlob, npcs);
        if ( closestDistance > 50) {
            this.velocity = createVector(mainBlob.getCenter().x - this.center.x, mainBlob.getCenter().y - this.center.y);
            this.velocity.limit(this.speed);
            let newCenter = this.center.copy().add(this.velocity);
            let newClosestDistance = this.getClosestDistance(newCenter, mainBlob, npcs);
            if (newClosestDistance > 49.9 ) {
                this.position.add(this.velocity);
                this.center.add(this.velocity);
                this.speed = min(this.speed * this.speedIncrease, this.maxSpeed);
            } else {
                this.speed = this.minSpeed;
            }
        } else {
            // Move away from blob
            let closestDistance = this.getClosestDistance(this.center, mainBlob, npcs);

            let newCenter = this.center.copy().add(this.velocity);
            let newClosestDistance = this.getClosestDistance(newCenter, mainBlob, npcs);

            if (newClosestDistance > closestDistance) {
                this.position.add(this.velocity);
                this.center.add(this.velocity);
                this.speed = min(this.speed * this.speedIncrease, this.maxSpeed);
                return;
            }


            let bestClosestDistance = -10000;
            for (let i=0; i<10; i++) {
                let velocity = createVector(random(-10, 10), random (-10, 10));
                velocity.limit(this.speed);
                newCenter = this.center.copy().add(velocity);
                newClosestDistance = this.getClosestDistance(newCenter, mainBlob, npcs);
                
                if (newClosestDistance > bestClosestDistance) {
                    bestClosestDistance = newClosestDistance;
                    this.velocity = velocity;
                }
            }
            
            if (bestClosestDistance > closestDistance) {
                this.position.add(this.velocity);
                this.center.add(this.velocity);
                this.speed = min(this.speed * this.speedIncrease, this.maxSpeed);
            } else {
                this.speed = this.minSpeed;
            }
        }
    }

    getClosestDistance(center, mainBlob, npcs) {
        let closestDistance = 100000;

        npcs.forEach(npc => {
            if (npc.center.dist(center) <= closestDistance) {
                closestDistance = npc.center.dist(center);
            }
        });
        if (mainBlob.getCenter().dist(center) <= closestDistance) {
            closestDistance = mainBlob.getCenter().dist(center);
        }
        return closestDistance;
    }
}