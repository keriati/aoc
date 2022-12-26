export const getFloorNumber = (input) =>
  input.split("").reduce((num, char) => (char === ")" ? num - 1 : num + 1), 0);

export const getBasementStep = (input) => {
  let position = 0;
  let step = 0;
  input.split("").find((char) => {
    if (position === -1) {
      return true;
    }
    position = char === ")" ? position - 1 : position + 1;
    step += 1;
    return false;
  });

  return step;
};
