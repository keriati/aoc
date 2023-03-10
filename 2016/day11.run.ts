import { getMinElevatorRides } from "./day11";

const main = () => {
  const input = `The first floor contains a elerium generator, a elerium-compatible microchip, a dilithium generator, a dilithium-compatible microchip, a strontium generator, a strontium-compatible microchip, a plutonium generator, and a plutonium-compatible microchip.
The second floor contains a thulium generator, a ruthenium generator, a ruthenium-compatible microchip, a curium generator, and a curium-compatible microchip.
The third floor contains a thulium-compatible microchip.
The fourth floor contains nothing relevant.`;

  const startTime = Date.now();
  const result = getMinElevatorRides(input);

  console.log(`Result found: ${result}. Time: ${Date.now() - startTime}ms`);
};

main();
