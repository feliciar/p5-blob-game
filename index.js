let mainBlob;
let npcs;

function setup(){
    createCanvas(500, 500);
    mainBlob = new Blob();
    npcs = [];
    for (let i = 0; i < 10; i++) {
        npcs.push(new NPC());

    }
}

function draw() {
    if (keyIsDown(UP_ARROW)) {
        mainBlob.up();
    }
    if (keyIsDown(DOWN_ARROW)) {
        mainBlob.down();
    }
    if (keyIsDown(LEFT_ARROW)) {
        mainBlob.left();
    }
    if (keyIsDown(RIGHT_ARROW)) {
        mainBlob.right();
    }

    for (let i = 0; i< npcs.length; i++) {
        let copy = npcs.slice();
        copy.splice(i, 1); // Remove current npc
        npcs[i].move(mainBlob, copy);
    }

    clear();

    background(0);
    mainBlob.draw();
    npcs.forEach(npc => {
        npc.draw();
    });
}
