let resolution = Math.min(window.innerWidth, window.innerHeight)
let figure = [],
    figureColors = [],
    imgCube,
    imgFigure,
    imgsC = [],
    imgsF = [];
// ideal;
const R = 1.6,
    a = 0.4,
    MULT = 40;
function preload() {
    imgCube = loadImage('./public/data/project25-01.png')
    imgFigure = loadImage('./public/data/project25-02.png')
}
function setup() {
    // console.log(imgCube.get(100,100))
    const canvas = createCanvas(resolution, resolution, WEBGL)
    canvas.parent('sketch-holder')
    // createEasyCam();
    rectMode(CENTER)
    // stroke('#f0f0f0')
    stroke('#0f0f0f')
    strokeWeight(2)
    // noStroke();
    noFill();
    // ideal = false
    figure = initFigure();
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            imgsC.push(createImage(446, 446))
            imgsC[i * 5 + j].copy(imgCube, i * 446, j * 446, 446, 446, 0, 0, 446, 446)
        }
    }
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            imgsF.push(createImage(446, 446))
            imgsF[i * 5 + j].copy(imgFigure, i * 446, j * 446, 446, 446, 0, 0, 446, 446)
        }
    }
    imageMode(CENTER)
    // noLoop()
    loaded();
}
function draw() {
    // background('#0f0f0f')
    background(255)
    let rx = Math.round(mouseY / height * 4) / 4;
    let ry = Math.round(mouseX / width * 4) / 4;
    let y = 1.5 * Math.max(Math.min(-rx + 0.5, 0.5), -0.5)
    let x = 1.5 * Math.max(Math.min(ry - 0.5, 0.5), -0.5)
    x = Math.floor(map(x, -0.75, 0.75, 0, 4.9))
    y = Math.floor(map(y, 0.75, -0.75, 0, 4.9))
    if (ideal) {
        noStroke();
        noFill();
        stroke('#0f0f0f')
        rotateX(1.5 * Math.max(Math.min(-rx + 0.5, 0.5), -0.5))
        rotateY(1.5 * Math.max(Math.min(ry - 0.5, 0.5), -0.5))
        if (selectedFigure == "Cube") {
            strokeWeight(2)
            box(100);
        }
        else if (selectedFigure == "Clover Knot") {
            strokeWeight(1)
            drawFigure();
        }

    }
    else {
        stroke('#0f0f0f')
        strokeWeight(2)
        noFill();
        if (selectedFigure == "Cube") {
            image(imgsC[x * 5 + y], 0, 0, 200, 200)
        }
        else if (selectedFigure == "Clover Knot") {
            image(imgsF[x * 5 + y], 0, 0, 200, 200)
        }
        rect(0, 0, 200, 200);
    }

}
function windowResized() {
    resolution = Math.min(window.innerWidth, window.innerHeight)
    resizeCanvas(resolution, resolution)
}

function keyPressed() {
    document.activeElement.blur();
    idealInput.checked = !idealInput.checked;
    idealChange(idealInput)
}

function initFigure() {
    let vertexList = [];
    let u = 0;
    let v = 0;
    const U_LIMIT = 12 * PI;
    const V_LIMIT = 2 * PI;
    const U_STEP = 0.5;
    const V_STEP = 1;
    for (u = 0; u < U_LIMIT - U_STEP; u += U_STEP) {
        for (v = 0; v < V_LIMIT; v += V_STEP) {
            let vect1 = createVector(x(u, v), y(u, v), z(u, v));
            let vect2 = createVector(x(u + U_STEP, v), y(u + U_STEP, v), z(u + U_STEP, v));
            vertexList.push(vect1);
            vertexList.push(vect2);
            figureColors.push(random(255))
            figureColors.push(random(255))
        }
    }
    for (let v = V_STEP; v < V_LIMIT; v += V_STEP) {
        let vect1 = createVector(x(u, v), y(u, v), z(u, v));
        let vect2 = createVector(x(0, v), y(0, v), z(0, v));
        vertexList.push(vect1);
        vertexList.push(vect2);
        figureColors.push(random(255))
        figureColors.push(random(255))
    }
    return vertexList;
}

function drawFigure() {
    // beginShape(POINTS);
    // for (let i = 0; i < figure.length; i++) {
    //     vertex(MULT * figure[i].x, MULT * figure[i].y, MULT * figure[i].z)
    // }
    // endShape();
    beginShape(TRIANGLE_STRIP);
    for (let i = 1; i < figure.length; i++) {
        // fill(figureColors[i])
        vertex(MULT * figure[i].x, MULT * figure[i].y, MULT * figure[i].z)
    }
    endShape();
}

function x(u, v) {
    return ((R + a * cos(u * 0.5)) * cos(u / 3.0) + a * cos(u / 3.0) * cos(v - PI))
}
function y(u, v) {
    return ((R + a * cos(u * 0.5)) * sin(u / 3.0) + a * sin(u / 3.0) * cos(v - PI))
}
function z(u, v) {
    return (a + sin(u * 0.5) + a * sin(v - PI))
}