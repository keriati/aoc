class Firewall {
  layers = new Map<number, number>();

  position: number;

  layersCount = 0;

  caughtLayers = [];

  delay = 0;

  constructor(input: string) {
    for (const l of input.split("\n")) {
      const [a, b] = l.split(": ");
      const layerPos = Number(a);
      const layerDepth = Number(b);

      this.layers.set(layerPos, layerDepth);

      this.layersCount = Number(a);
    }

    this.position = -1;
  }

  reset() {
    this.caughtLayers = [];
    this.position = -1;
  }

  cross() {
    this.position++;

    if (!this.layers.has(this.position)) {
      return;
    }

    const positionDepth = this.layers.get(this.position);
    const roundLength = (positionDepth - 1) * 2;

    if ((this.position + this.delay) % roundLength === 0) {
      this.caughtLayers.push([this.position, positionDepth]);
    }
  }
}

export const getSeverity = (input) => {
  const myFireWall = new Firewall(input);

  while (myFireWall.position < myFireWall.layersCount) {
    myFireWall.cross();
  }

  return myFireWall.caughtLayers.reduce(
    (sum, [pos, depth]) => sum + pos * depth,
    0
  );
};

export const getDelayToPass = (input) => {
  const myFireWall = new Firewall(input);
  let delay = 0;

  while (true) {
    myFireWall.reset();
    myFireWall.delay = delay;

    while (
      myFireWall.position < myFireWall.layersCount &&
      myFireWall.caughtLayers.length === 0
    ) {
      myFireWall.cross();
    }

    if (myFireWall.caughtLayers.length === 0) {
      return delay;
    }
    delay++;
  }
};
