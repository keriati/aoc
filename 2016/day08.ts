export class Display {
  private h: number;

  private w: number;

  pixels: boolean[][] = [];

  constructor(sw: number, sh: number) {
    this.w = sw;
    this.h = sh;
    for (let h = 0; h < sh; h++) {
      this.pixels[h] = [];
      for (let w = 0; w < sw; w++) {
        this.pixels[h][w] = false;
      }
    }
  }

  run(command) {
    if (command.startsWith("rect")) {
      const [w, h] = command.split(" ")[1].split("x");
      this.rect(Number(w), Number(h));
    }

    if (command.startsWith("rotate column")) {
      const [col, amount] = command.split("=")[1].split(" by ");
      this.rotCol(Number(col), Number(amount));
    }

    if (command.startsWith("rotate row")) {
      const [row, amount] = command.split("=")[1].split(" by ");
      this.rotRow(Number(row), Number(amount));
    }
  }

  print() {
    const result = [];
    for (let h = 0; h < this.h; h++) {
      result.push("\n");
      for (let w = 0; w < this.w; w++) {
        result.push(this.pixels[h][w] ? "#" : " ");
      }
    }

    return result.join("");
  }

  getLitCount() {
    let result = 0;

    for (let h = 0; h < this.h; h++) {
      for (let w = 0; w < this.w; w++) {
        if (this.pixels[h][w]) result++;
      }
    }

    return result;
  }

  rect(a: number, b: number) {
    for (let h = 0; h < b; h++) {
      for (let w = 0; w < a; w++) {
        this.pixels[h][w] = true;
      }
    }
  }

  rotRow(row, amount) {
    for (let i = 0; i < amount; i++) {
      this.pixels[row].unshift(this.pixels[row].pop());
    }
  }

  rotCol(col, amount) {
    for (let a = 0; a < amount; a++) {
      const lastRowPixel = this.pixels[this.h - 1][col];

      for (let i = this.h - 1; i > 0; i--) {
        this.pixels[i][col] = this.pixels[i - 1][col];
      }

      this.pixels[0][col] = lastRowPixel;
    }
  }
}

export const getPixelCount = (input, w, h) => {
  const display = new Display(w, h);

  input.split("\n").forEach((com) => {
    display.run(com);
  });

  return display.getLitCount();
};

export const getCode = (input, w, h) => {
  const display = new Display(w, h);

  input.split("\n").forEach((com) => {
    display.run(com);
  });

  return display.print();
};
