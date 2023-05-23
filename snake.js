const SnakeDirection = {
	Up:    0,
	Down:  1,
	Left:  2,
	Right: 3
}

class Snake {
  constructor(width, height, cellSize, snakeLength = 3) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;

    this.cells = [];
    this.food = null;
    this.dir = SnakeDirection.Right;

    let sx = floor(width / 2);
    let sy = floor(height / 2);
    for(let i = snakeLength; i > 0; i--) this.cells.push(new Point(sx - i, sy));

    this.insertFood();
  }

  update() {
    if(this.moveCanBeDone()) {
      let currentHead = this.getHead();
      switch (this.dir) {
        case SnakeDirection.Up:    this.cells.push(new Point(currentHead.x,     currentHead.y - 1)); break;
        case SnakeDirection.Down:  this.cells.push(new Point(currentHead.x,     currentHead.y + 1)); break;
        case SnakeDirection.Left:  this.cells.push(new Point(currentHead.x - 1, currentHead.y    )); break;
        case SnakeDirection.Right: this.cells.push(new Point(currentHead.x + 1, currentHead.y    )); break;
      }
      currentHead = this.getHead();
      if(this.food.x == currentHead.x && this.food.y == currentHead.y) {
        this.insertFood();
      } else {
        this.cells = this.cells.slice(1);
      }
    } else {
      this.gameOver();
    }
  }
  insertFood() {
    if(this.cells.length >= this.width * this.height) this.gameOver();
    let pointWithoutSnake = Point.RandomPoint(this.width, this.height);
    while(true) {
      let needReroll = false;
      for(let i = 0; i < this.cells.length; i++) {
        if(pointWithoutSnake.x == this.cells[i].x && pointWithoutSnake.y == this.cells[i].y) {
            needReroll = true;
            break;
        }
      }
      if(needReroll) pointWithoutSnake = Point.RandomPoint(this.width, this.height);
      else break;
    }
    this.food = pointWithoutSnake;
  }
  keyPressed(keyCode) {
    if     (keyCode == 38 && this.dir != SnakeDirection.Down)  this.dir = SnakeDirection.Up;
    else if(keyCode == 39 && this.dir != SnakeDirection.Left)  this.dir = SnakeDirection.Right;
    else if(keyCode == 40 && this.dir != SnakeDirection.Up)    this.dir = SnakeDirection.Down;
    else if(keyCode == 37 && this.dir != SnakeDirection.Right) this.dir = SnakeDirection.Left;
  }
  show() {
    noStroke();
    fill(38, 102, 38);
    for(let i = 0; i < this.cells.length - 1; i++) rect(this.cells[i].x * this.cellSize + 2, this.cells[i].y * this.cellSize + 2, this.cellSize - 4, this.cellSize - 4);
    fill(100,  255, 100);
    rect(this.getHead().x * this.cellSize, this.getHead().y * this.cellSize, this.cellSize, this.cellSize);

    fill(255, 50,  50);
    rect(this.food.x * this.cellSize, this.food.y * this.cellSize, this.cellSize, this.cellSize);

  }

  gameOver() {
    console.log("GAME OVER :(");
    noLoop();
  }
  getHead() {
    return this.cells[this.cells.length - 1];
  }

  moveCanBeDone() {
    let value = this.getHead().x > -1 && this.getHead().x < this.width | this.getHead().y > -1 && this.getHead().y < this.height;

    // snake check
    for(let i = 0; i < this.cells.length - 1; i++) if(this.cells[i].x == this.getHead().x && this.cells[i].y == this.getHead().y) return false;
    return value;
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static RandomPoint(maxX, maxY) {
    let x = floor(random(maxX));
    let y = floor(random(maxY));
    return new Point(x, y);
  }
}
