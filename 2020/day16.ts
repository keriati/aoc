class Rule {
  name: string;

  ranges: number[][];

  constructor(description: string) {
    const [, name, r1s, r1e, r2s, r2e] = description.match(
      /(.*)+: (\d+)-(\d+) or (\d+)-(\d+)/
    );

    this.name = name;

    this.ranges = [
      [Number(r1s), Number(r1e)],
      [Number(r2s), Number(r2e)],
    ];
  }

  isValid(field: number) {
    return (
      (field >= this.ranges[0][0] && field <= this.ranges[0][1]) ||
      (field >= this.ranges[1][0] && field <= this.ranges[1][1])
    );
  }
}

class Ticket {
  public fields: number[];

  constructor(fields: string) {
    this.fields = fields.split(",").map((n) => Number(n));
  }

  isValid(rules: Rule[]) {
    return typeof this.getInvalidField(rules) === "undefined";
  }

  getInvalidField(rules: Rule[]) {
    return this.fields.find(
      (field) =>
        typeof rules
          .reduce((res, rule) => [...res, ...rule.ranges], [])
          .find(([s, e]) => field >= s && field <= e) === "undefined"
    );
  }
}

export const getTicketScanningErrorRate = (input) => {
  const [p1Rules, , p3Tickets] = input.split("\n\n");

  const rules = p1Rules.split("\n").map((rd) => new Rule(rd));

  return p3Tickets
    .split("\n")
    .slice(1)
    .map((td) => new Ticket(td))
    .map((ticket) => ticket.getInvalidField(rules))
    .reduce((sum, n) => (n ? sum + n : sum), 0);
};

const getFieldValues = (tickets: Ticket[]): number[][] => {
  const fields = [];

  tickets.forEach((ticket) => {
    ticket.fields.forEach((field, i) => {
      if (!Array.isArray(fields[i])) fields[i] = [];
      fields[i].push(field);
    });
  });

  return fields;
};

const createRuleIndexMap = (tickets: Ticket[], rules: Rule[]) => {
  const fieldValues = getFieldValues(tickets);

  let ruleIndexMap: string[][] = [];

  // find for each index the matching rules
  fieldValues.forEach((fieldValue, i) => {
    const rule = rules
      .filter((rule) => {
        const invalidField = fieldValue.find((val) => !rule.isValid(val));

        return typeof invalidField === "undefined";
      })
      ?.map((r) => r.name);

    if (typeof rule !== "undefined") {
      if (!Array.isArray(ruleIndexMap[i])) ruleIndexMap[i] = [];
      ruleIndexMap[i].push(...rule);
    }
  });

  // Reduce matching rules to single rule
  while (true) {
    const singleMatches = ruleIndexMap
      .filter((rule) => rule.length === 1)
      .flat(1);

    if (singleMatches.length === ruleIndexMap.length) break;

    ruleIndexMap = ruleIndexMap.map((rules) => {
      if (rules.length === 1) return rules;
      return rules.filter((rule) => !singleMatches.includes(rule));
    });
  }

  return ruleIndexMap;
};

export const getDepartureFields = (input) => {
  const [p1Rules, p2MyTicket, p3Tickets] = input.split("\n\n");

  const rules = p1Rules.split("\n").map((rd) => new Rule(rd));

  const myTicket = new Ticket(p2MyTicket.split("\n")[1]);

  const validTickets = p3Tickets
    .split("\n")
    .slice(1)
    .map((td) => new Ticket(td))
    .filter((ticket: Ticket) => ticket.isValid(rules));

  const ruleIndexMap = createRuleIndexMap(validTickets, rules);

  return ruleIndexMap
    .flat(1)
    .reduce((sum: number, ruleName: string, i: number) => {
      if (!ruleName.startsWith("departure")) return sum;
      return sum * myTicket.fields[i];
    }, 1);
};
