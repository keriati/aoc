const DEGREE_MAP = {
  0: "N",
  90: "E",
  180: "S",
  270: "W",
};

export const getResult = (input) => {
  const instructions = input.split("\n");
  let facing = 90;

  let x = 0;
  let y = 0;

  instructions.forEach((ins) => {
    const val = parseInt(ins.substring(1), 10);
    let action = ins[0];

    if (action === "F") {
      action = DEGREE_MAP[facing];
    }

    if (action === "N") y += val;
    if (action === "S") y -= val;
    if (action === "E") x += val;
    if (action === "W") x -= val;

    if (action === "R") {
      facing += val;
      if (facing > 270) facing -= 360;
    }

    if (action === "L") {
      facing -= val;
      if (facing < 0) facing += 360;
    }
  });

  return Math.abs(x) + Math.abs(y);
};

export const getResult2 = (input) => {
  const instructions = input.split("\n");

  let x = 0;
  let y = 0;
  let wx = 10;
  let wy = 1;

  instructions.forEach((ins) => {
    const val = parseInt(ins.substring(1), 10);
    const action = ins[0];

    if (action === "F") {
      x += val * wx;
      y += val * wy;
    }

    if (action === "N") wy += val;
    if (action === "S") wy -= val;
    if (action === "E") wx += val;
    if (action === "W") wx -= val;

    if (action === "R") {
      for (let i = 0; i < val / 90; i++) {
        const t = wx;
        wx = wy;
        wy = -1 * t;
      }
    }

    if (action === "L") {
      for (let i = 0; i < val / 90; i++) {
        const t = wx;
        wx = -1 * wy;
        wy = t;
      }
    }
  });

  return Math.abs(x) + Math.abs(y);
};
