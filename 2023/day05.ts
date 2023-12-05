const parseInput = (input: string): [number[], number[][][]] => {
  const lines = input.split("\n");
  const maps = {};

  const seeds = lines.shift().split(": ")[1].split(/ +/).map(Number);

  lines.shift();

  let mapName = "";

  lines.forEach((line) => {
    if (/\d/.test(line[0])) {
      maps[mapName].push(line.split(" ").map(Number));
    } else {
      [mapName] = line.split(":");
      if (mapName !== "") {
        maps[mapName] = [];
      }
    }
  });

  return [seeds, Object.values(maps)];
};

export const getNearestLocation = (input: string) => {
  const [seeds, allMaps] = parseInput(input);

  let minLocation = Number.MAX_SAFE_INTEGER;

  for (let seedIndex = 0; seedIndex < seeds.length; seedIndex++) {
    let location = seeds[seedIndex];

    for (let mapsIndex = 0; mapsIndex < allMaps.length; mapsIndex++) {
      const maps = allMaps[mapsIndex];

      for (let mapIndex = 0; mapIndex < maps.length; mapIndex++) {
        const map = maps[mapIndex];
        const destination = map[0];
        const source = map[1];
        const length = map[2];

        if (location >= source && location < source + length) {
          location += destination - source;
          break;
        }
      }
    }

    if (location < minLocation) minLocation = location;
  }

  return minLocation;
};

export const getNearestLocationP2 = (input: string) => {
  const [seedsRaw, allMaps] = parseInput(input);

  let minLocation = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < seedsRaw.length; i += 2) {
    let seedStart = seedsRaw[i];
    let seedEnd = seedsRaw[i] + seedsRaw[i + 1];

    for (let seed = seedStart; seed < seedEnd; seed++) {
      let location = seed;

      for (let mapsIndex = 0; mapsIndex < allMaps.length; mapsIndex++) {
        const maps = allMaps[mapsIndex];

        for (let mapIndex = 0; mapIndex < maps.length; mapIndex++) {
          const map = maps[mapIndex];
          const destination = map[0];
          const source = map[1];
          const length = map[2];

          if (location >= source && location < source + length) {
            location += destination - source;
            break;
          }
        }
      }

      if (location < minLocation) minLocation = location;
    }
  }

  return minLocation;
};
