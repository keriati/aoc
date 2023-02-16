export const getTLSCount = (input) => {
  const lines = input.split("\n");

  let hasTLS = 0;

  lines.forEach((line) => {
    let isHS = false;
    let hadHSAbba = false;
    let hadAbba = false;

    for (let i = 0; i < line.length; i++) {
      if (typeof line[i + 3] === "undefined") continue;

      if (line[i] === "[") {
        isHS = true;
        continue;
      }

      if (line[i] === "]") {
        isHS = false;
        continue;
      }

      if (
        line[i] === line[i + 3] &&
        line[i + 1] === line[i + 2] &&
        line[i] !== line[i + 1]
      ) {
        if (isHS) {
          hadHSAbba = true;
        } else {
          hadAbba = true;
        }
      }
    }

    if (hadAbba && !hadHSAbba) hasTLS++;
  });

  return hasTLS;
};

export const getSSLCount = (input) => {
  const lines = input.split("\n");

  let hasSSL = 0;

  lines.forEach((line) => {
    let isHS = false;
    const ABACounter = new Set<string>();
    const ABACounterHS = new Set<string>();

    for (let i = 0; i < line.length; i++) {
      if (typeof line[i + 2] === "undefined") break;

      if (line[i] === "[") {
        isHS = true;
        continue;
      }

      if (line[i] === "]") {
        isHS = false;
        continue;
      }

      if (line[i] === line[i + 2] && line[i] !== line[i + 1]) {
        if (isHS) {
          ABACounterHS.add(line[i + 1] + line[i] + line[i + 1]);
        } else {
          ABACounter.add(line[i] + line[i + 1] + line[i + 2]);
        }
      }
    }

    for (const aba of ABACounter) {
      if (ABACounterHS.has(aba)) {
        hasSSL++;
        break;
      }
    }
  });

  return hasSSL;
};
