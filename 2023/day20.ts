import { lcm } from "../util/utils";
import { graphViz } from "../util/graphviz";

type ModuleName = string;
type Pulse = "l" | "h";
type QueueItem = { pulse: Pulse; destination: ModuleName; sender: ModuleName };
type Queue = QueueItem[];
type Modules = (FlipFlop | Conjunction)[];

const mq = (
  pulse: Pulse,
  destination: ModuleName,
  sender: ModuleName
): QueueItem => ({
  pulse,
  destination,
  sender,
});

class Module {
  queue: Queue;

  destinations: Modules = [];

  constructor(public readonly name: string, queue: Queue) {
    this.queue = queue;
  }

  sq(pulse: Pulse, destination: FlipFlop | Conjunction | "output") {
    this.queue.push(
      mq(
        pulse,
        destination === "output" ? "output" : destination.name,
        this.name
      )
    );
  }
}

class FlipFlop extends Module {
  state = false;

  receive(pulse: Pulse, module: FlipFlop | Conjunction) {
    if (pulse === "h") return;

    this.state = !this.state;

    if (this.state) {
      this.destinations.forEach((destination) => this.sq("h", destination));
    } else {
      this.destinations.forEach((destination) => this.sq("l", destination));
    }
  }
}

class Conjunction extends Module {
  inputs: Map<FlipFlop | Conjunction, Pulse> = new Map();

  isHigh = () => Array.from(this.inputs.values()).every((p) => p === "h");

  receive(pulse: Pulse, sender: FlipFlop | Conjunction) {
    this.inputs.set(sender, pulse);

    if (this.isHigh()) {
      this.destinations.forEach((destination) => {
        if (destination === undefined) {
          this.sq("l", "output");
          return;
        }
        this.sq("l", destination);
      });
      return;
    }

    this.destinations.forEach((destination) => {
      if (destination === undefined) {
        this.sq("h", "output");
        return;
      }

      this.sq("h", destination);
    });
  }
}

class System {
  private queue: Queue = [];

  private starting: string[] = [];

  private modules = new Map<string, FlipFlop | Conjunction>();

  private low = 0;

  private high = 0;

  private exitModule = "";

  private cycles: Record<string, number> = {};

  private buttonPushes = 0;

  constructor(configuration: string) {
    const connections = configuration.split("\n");

    this.modules.set("output", new FlipFlop("output", this.queue));

    for (const connection of connections) {
      const [from] = connection.split(" -> ");
      const type = from[0];
      const name = from.slice(1);

      if (type === "%") {
        this.modules.set(name, new FlipFlop(name, this.queue));
      } else if (type === "&") {
        this.modules.set(name, new Conjunction(name, this.queue));
      }
    }

    for (const connection of connections) {
      const [from, to] = connection.split(" -> ");
      const name = from.slice(1);
      const receivers = to.split(", ");

      if (to === "rx") this.exitModule = name;

      if (name === "roadcaster") {
        this.starting = receivers;
        continue;
      }

      const module = this.modules.get(name);

      receivers.forEach((receiver) => {
        const next = this.modules.get(receiver);
        module.destinations.push(next);

        if (next instanceof Conjunction) {
          next.inputs.set(module, "l");
        }
      });
    }

    this.cycles = Array.from(
      (this.modules.get(this.exitModule) as Conjunction)?.inputs || []
    )
      .map(([p]) => p.name)
      .reduce((acc, curr) => {
        acc[curr] = 0;
        return acc;
      }, {});
  }

  render = () => {
    const modules: [string, string[]][] = Array.from(
      this.modules.entries()
    ).map(([name, module]) => [
      name,
      module.destinations.map((d) => d?.name ?? "output"),
    ]);

    const filtered = modules.filter((m) => m[0] !== "zh");

    graphViz(filtered).layout("circo").render("aoc2023d20");
  };

  pushButton = () => {
    this.buttonPushes++;

    this.starting.forEach((name) => {
      this.queue.push(mq("l", name, null));
    });

    this.low++;

    while (this.queue.length > 0) {
      const { pulse, destination, sender } = this.queue.shift();

      if (pulse === "l") {
        this.low++;
      } else {
        this.high++;
      }

      if (destination === this.exitModule && pulse === "h") {
        this.cycles[sender] =
          this.cycles[sender] === 0 ? this.buttonPushes : this.cycles[sender];
      }

      this.modules.get(destination).receive(pulse, this.modules.get(sender));
    }
  };

  getProduct = () => this.low * this.high;

  getRX = () => Object.values(this.cycles).reduce(lcm, 1);
}

export const getLowHighPulses = (input: string) => {
  const system = new System(input);

  for (let i = 0; i < 1000; i++) {
    system.pushButton();
  }

  return system.getProduct();
};

export const getButtonPresses = (input: string) => {
  const system = new System(input);

  // system.render();

  while (true) {
    system.pushButton();

    const rxButtonPresses = system.getRX();

    if (rxButtonPresses) return rxButtonPresses;
  }
};
