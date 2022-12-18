export const getOverlappingFull = (input) => {
  const inputArray = input.split("\n");

  let overlap = 0;

  inputArray.forEach((assignment) => {
    const elf1Assignment = assignment.split(",")[0];
    const elf2Assignment = assignment.split(",")[1];

    const elf1Start = Number.parseInt(elf1Assignment.split("-")[0], 10);
    const elf1End = Number.parseInt(elf1Assignment.split("-")[1], 10);

    const elf2Start = Number.parseInt(elf2Assignment.split("-")[0], 10);
    const elf2End = Number.parseInt(elf2Assignment.split("-")[1], 10);

    if (elf1Start <= elf2Start && elf1End >= elf2End) {
      overlap += 1;
      return;
    }

    if (elf2Start <= elf1Start && elf2End >= elf1End) {
      overlap += 1;
    }
  });

  return overlap;
};

export const getOverlapping = (input) => {
  const inputArray = input.split("\n");

  let overlap = 0;

  inputArray.forEach((assignment) => {
    const elf1Assignment = assignment.split(",")[0];
    const elf2Assignment = assignment.split(",")[1];

    const elf1Start = Number.parseInt(elf1Assignment.split("-")[0], 10);
    const elf1End = Number.parseInt(elf1Assignment.split("-")[1], 10);

    const elf2Start = Number.parseInt(elf2Assignment.split("-")[0], 10);
    const elf2End = Number.parseInt(elf2Assignment.split("-")[1], 10);

    if (elf1Start <= elf2Start && elf1End >= elf2End) {
      overlap += 1;
      return;
    }

    if (elf2Start <= elf1Start && elf2End >= elf1End) {
      overlap += 1;
      return;
    }

    if (elf1Start >= elf2Start && elf1Start <= elf2End) {
      overlap += 1;
      return;
    }

    if (elf2Start >= elf1Start && elf2Start <= elf1End) {
      overlap += 1;
      return;
    }

    if (elf1End >= elf2Start && elf1End <= elf2End) {
      overlap += 1;
      return;
    }

    if (elf2End >= elf1Start && elf2End <= elf1End) {
      overlap += 1;
    }
  });

  return overlap;
};
