export const getResult = (sequence: string, rounds: number) => {
  let result = sequence;

  for (let i = 0; i < rounds; i++) {
    let roundState = "";
    let current = result[0];
    let counter = 1;

    for (let i = 1; i <= result.length; i++) {
      if (result[i] === current) {
        counter++;
        continue;
      }

      roundState += `${counter}${current}`;

      current = result[i];
      counter = 1;
    }

    result = roundState;
  }

  return result;
};