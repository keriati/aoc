export const isValid = (password: string, policy: string) => {
  const [, minS, maxS, policyLetter] = policy.match(/(\d+)-(\d+) (\w)/);
  const minOccurrence = parseInt(minS, 10);
  const maxOccurrence = parseInt(maxS, 10);
  let occurrence = 0;

  for (const letterOfPassword of password.split("")) {
    if (letterOfPassword === policyLetter) {
      occurrence++;
    }
  }

  return minOccurrence <= occurrence && occurrence <= maxOccurrence;
};

export const getValidPasswords = (input) => {
  const lines = input.split("\n");

  return lines.reduce((sum, line) => {
    const [policy, password] = line.split(": ");
    return isValid(password, policy) ? sum + 1 : sum;
  }, 0);
};

export const isValidTobogan = (password: string, policy: string) => {
  const [, pos1S, pos2S, policyLetter] = policy.match(/(\d+)-(\d+) (\w)/);
  const pos1 = parseInt(pos1S, 10);
  const pos2 = parseInt(pos2S, 10);
  let occurrence = 0;

  if (password[pos1 - 1] === policyLetter) occurrence++;
  if (password[pos2 - 1] === policyLetter) occurrence++;

  return occurrence === 1;
};

export const getValidTobogganPasswords = (input) => {
  const lines = input.split("\n");

  return lines.reduce((sum, line) => {
    const [policy, password] = line.split(": ");
    return isValidTobogan(password, policy) ? sum + 1 : sum;
  }, 0);
};
