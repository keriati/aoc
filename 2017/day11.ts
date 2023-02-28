export const getHexDistance = (input) => {
  const path = input.split(",");

  let vert = 0;
  let hor = 0;
  let maxDist = 0;

  for (const step of path) {
    if (step.length === 1) {
      if (step === "n") vert += 1;
      if (step === "s") vert -= 1;
    } else {
      const [v, h] = step.split("");

      if (v === "n") vert += 0.5;
      if (v === "s") vert -= 0.5;
      if (h === "e") hor += 0.5;
      if (h === "w") hor -= 0.5;
    }
    const dist = Math.abs(vert) + Math.abs(hor);

    if (dist > maxDist) maxDist = dist;
  }

  return [Math.abs(vert) + Math.abs(hor), maxDist];
};

/*
-+      +--+      +--+      +--+      +-
  \    /    \    /    \    /    \    /
   +--+      +--+      +--+      +--+
  /    \    /    \    /    \    /    \
-+      +--+      +--+      +--+      +-
  \    /    \    /    \    /    \    /
   +--+      +--+      +--+      +--+
  /    \    /    \    /    \    /    \
-+      +--+      +--+      +--+      +-
  \    /    \    /    \    /    \    /
   +--+      +--+      +--+      +--+
  /    \    /    \    /    \    /    \
-+      +--+      +--+      +--+      +-
  \    /    \    /    \    /    \    /
 */
