const lineMatcher =
  /p=<(-?\d+),(-?\d+),(-?\d+)>,v=<(-?\d+),(-?\d+),(-?\d+)>,a=<(-?\d+),(-?\d+),(-?\d+)>/;

class Particle {
  totalAcceleration: number;

  startingSpeed: number;

  startingPositionDistance: number;

  constructor(
    public name: number,
    public x: number,
    public y: number,
    public z: number,
    public vx: number,
    public vy: number,
    public vz: number,
    public ax: number,
    public ay: number,
    public az: number
  ) {
    this.totalAcceleration = Math.abs(ax) + Math.abs(ay) + Math.abs(az);
    this.startingSpeed = Math.abs(vx) + Math.abs(vy) + Math.abs(vz);
    this.startingPositionDistance = Math.abs(x) + Math.abs(y) + Math.abs(z);
  }
}

const parseParticles = (input: string) =>
  input
    .split("\n")
    .map((l) => l.replaceAll(" ", "").match(lineMatcher).slice(1))
    .map((x) => x.map(Number))
    .map(
      ([x, y, z, vx, vy, vz, ax, ay, az], i) =>
        new Particle(i, x, y, z, vx, vy, vz, ax, ay, az)
    );

export const getClosestParticle = (input: string) => {
  const particles = parseParticles(input);

  particles.sort((a, b) => {
    if (a.totalAcceleration !== b.totalAcceleration) {
      return a.totalAcceleration - b.totalAcceleration;
    }
    if (a.startingSpeed !== b.startingSpeed) {
      return a.startingSpeed - b.startingSpeed;
    }
    return a.startingPositionDistance - b.startingPositionDistance;
  });

  return particles[0].name;
};

const updateParticles = (particles: Particle[]) =>
  particles.map((p) => {
    p.vx += p.ax;
    p.vy += p.ay;
    p.vz += p.az;

    p.x += p.vx;
    p.y += p.vy;
    p.z += p.vz;

    return p;
  });

const getActiveParticles = (particles: Particle[]) => {
  const positions = new Map<string, Particle[]>();

  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    const position = `${particle.x},${particle.y},${particle.z}`;
    if (positions.has(position)) {
      positions.set(position, [...positions.get(position), particle]);
    } else {
      positions.set(position, [particle]);
    }
  }

  const activeParticles: Particle[] = [];

  for (const [p, particles] of positions) {
    if (particles.length === 1) {
      activeParticles.push(particles[0]);
    }
  }

  return activeParticles;
};

export const getResultPart2 = (input: string) => {
  let particles = parseParticles(input);

  for (let time = 0; time < 600; time++) {
    particles = getActiveParticles(updateParticles(particles));
  }

  return particles.length;
};
