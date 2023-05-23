let scaler = 20;

let w = 10;
let h = 10;

let snake;

function setup() {
  createCanvas(scaler * w, scaler * h);

  snake = new Snake(w, h, scaler, 5);

  frameRate(5);
}

function draw() {
  background(51);

  snake.update();
  snake.show();
}

function keyPressed() {
  snake.keyPressed(keyCode);
}
