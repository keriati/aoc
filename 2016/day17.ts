import crypto from "crypto";

const DOOR_OPEN = new Set(["b", "c", "d", "e", "f"]);

const getMD5 = (s: string) => crypto.createHash("md5").update(s).digest("hex");

const getNeis = (x: number, y: number, code: string) => {
  const neis: [number, number, string][] = [
    [x, y - 1, "U"],
    [x, y + 1, "D"],
    [x - 1, y, "L"],
    [x + 1, y, "R"],
  ];

  return neis.filter(
    ([x, y], i) => DOOR_OPEN.has(code[i]) && x > -1 && y > -1 && x < 4 && y < 4
  );
};

export const getShortestPath = (input: string) => {
  const q: [number, number, string][] = [[0, 0, input]];

  while (true) {
    const [x, y, passcode] = q.shift();

    if (x === 3 && y === 3) {
      return passcode.substring(input.length);
    }

    const codemd5 = getMD5(passcode);
    const neis = getNeis(x, y, codemd5);

    for (const [nx, ny, dir] of neis) {
      q.push([nx, ny, `${passcode}${dir}`]);
    }
  }
};

export const getLongestPathLength = (input: string) => {
  const q: [number, number, string][] = [[0, 0, input]];
  let maxLength = 0;

  while (q.length > 0) {
    const [x, y, passcode] = q.shift();

    if (x === 3 && y === 3) {
      const len = passcode.substring(input.length).length;
      if (len > maxLength) maxLength = len;
      continue;
    }

    const codemd5 = getMD5(passcode);
    const neis = getNeis(x, y, codemd5);

    for (const [nx, ny, dir] of neis) {
      q.push([nx, ny, `${passcode}${dir}`]);
    }
  }

  return maxLength;
};
