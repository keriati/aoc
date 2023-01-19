export const getFuelRequired = (input) =>
  input
    .split("\n")
    .map((n) => parseInt(n, 10))
    .reduce((sum, mass) => sum + Math.floor(mass / 3) - 2, 0);

export const getTotalFuelRequired = (input) =>
  input
    .split("\n")
    .map((n) => parseInt(n, 10))
    .reduce((sum, mass) => {
      const fuelForMass = Math.floor(mass / 3) - 2;
      let fuelForFuel = fuelForMass;
      let totalFuel = fuelForMass;

      while (fuelForFuel > 0) {
        fuelForFuel = Math.floor(fuelForFuel / 3) - 2;
        totalFuel += fuelForFuel > 0 ? fuelForFuel : 0;
      }

      return sum + totalFuel;
    }, 0);
