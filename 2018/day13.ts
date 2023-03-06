const CARTS = ["<", ">", "^", "v"];

const BACKSLASHMAP = {
  0: 270,
  90: 180,
  180: 90,
  270: 0,
};

const SLASHMAP = {
  0: 90,
  90: 0,
  180: 270,
  270: 180,
};

class Cart {
  pos: [number, number];

  direction: number;

  turnCycle: number;

  constructor(position: [number, number], direction: string) {
    this.pos = position;

    this.turnCycle = 1;

    switch (direction) {
      case "^":
        this.direction = 0;
        break;
      case ">":
        this.direction = 90;
        break;
      case "v":
        this.direction = 180;
        break;
      case "<":
        this.direction = 270;
        break;
      default:
        throw new Error("Invalid direction!");
    }
  }

  nextIntersection() {
    this.turnCycle++;
    if (this.turnCycle > 3) this.turnCycle = 1;
  }

  turn(deg: number) {
    this.direction += deg;
    if (this.direction > 359) this.direction -= 360;
    if (this.direction < 0) this.direction += 360;
  }
}

class CartMap {
  map: string[][];

  carts: Cart[];

  crashedCarts: Cart[];

  constructor(input: string) {
    this.map = input.split("\n").map((line) => line.split(""));
    this.carts = this.parseCarts();
    this.crashedCarts = [];
  }

  getPos([x, y]) {
    return this.map[y][x];
  }

  parseCarts() {
    const carts: Cart[] = [];

    for (let y = 0; y < this.map.length; y++) {
      const row = this.map[y];
      for (let x = 0; x < row.length; x++) {
        if (CARTS.includes(this.map[y][x])) {
          carts.push(new Cart([x, y], this.map[y][x]));

          if (["<", ">"].includes(this.map[y][x])) {
            this.map[y][x] = "-";
          }
          if (["^", "v"].includes(this.map[y][x])) {
            this.map[y][x] = "|";
          }
        }
      }
    }

    return carts;
  }

  display() {
    const carts = {};

    for (const { pos } of this.carts) {
      if (typeof carts[pos[1]] !== "object") carts[pos[1]] = {};
      carts[pos[1]][pos[0]] = true;
    }

    let screen = "";

    for (let y = 0; y < this.map.length; y++) {
      screen += "\n";
      for (let x = 0; x < this.map[y].length; x++) {
        if (typeof carts[y] === "object" && typeof carts[y][x] === "boolean") {
          screen += "o";
        } else {
          screen += this.map[y][x];
        }
      }
    }
    return screen;
  }
}

const moveCarts = (cartMap: CartMap) => {
  cartMap.carts.sort((a, b) =>
    a.pos[1] === b.pos[1] ? a.pos[0] - b.pos[0] : a.pos[1] - b.pos[1]
  );

  for (const cart of cartMap.carts) {
    const nextPosition: [number, number] = [null, null];

    switch (cart.direction) {
      case 0:
        [nextPosition[0]] = cart.pos;
        nextPosition[1] = cart.pos[1] - 1;
        break;
      case 90:
        nextPosition[0] = cart.pos[0] + 1;
        [, nextPosition[1]] = cart.pos;
        break;
      case 180:
        [nextPosition[0]] = cart.pos;
        nextPosition[1] = cart.pos[1] + 1;
        break;
      case 270:
        nextPosition[0] = cart.pos[0] - 1;
        [, nextPosition[1]] = cart.pos;
        break;
      default:
        throw new Error("Invalid direction!");
    }

    const nextPosTile = cartMap.getPos(nextPosition);

    switch (nextPosTile) {
      case "|":
      case "-":
        cart.pos = nextPosition;
        break;
      case "\\":
        cart.pos = nextPosition;
        cart.direction = BACKSLASHMAP[cart.direction];
        break;
      case "/":
        cart.pos = nextPosition;
        cart.direction = SLASHMAP[cart.direction];
        break;
      case "+":
        cart.pos = nextPosition;
        if (cart.turnCycle === 1) cart.turn(-90);
        if (cart.turnCycle === 3) cart.turn(90);
        cart.nextIntersection();
        break;
      default:
        throw new Error("Invalid map tile!");
    }

    const cartPositions = {};

    for (const cart of cartMap.carts) {
      const pos = `${cart.pos[0]},${cart.pos[1]}`;
      if (!cartPositions[pos]) {
        cartPositions[pos] = [];
        cartPositions[pos].push(cart);
      } else {
        cartMap.crashedCarts.push(cart, ...cartPositions[pos]);
      }
    }
  }

  cartMap.carts = cartMap.carts.filter(
    (cart) => !cartMap.crashedCarts.includes(cart)
  );
};

export const getFirstCrashPosition = (input: string) => {
  const cartMap = new CartMap(input);

  while (true) {
    moveCarts(cartMap);

    if (cartMap.crashedCarts.length > 0) {
      return cartMap.crashedCarts[0].pos;
    }
  }
};

export const getLastCartPosition = (input: string) => {
  const cartMap = new CartMap(input);

  while (true) {
    moveCarts(cartMap);

    if (cartMap.carts.length < 2) {
      return cartMap.carts[0].pos;
    }
  }
};
