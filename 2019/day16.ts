import { Deque } from "@blakeembrey/deque";

const patternCache = new Map<number, number[]>();

const getPattern = (phase: number) => {
  if (patternCache.has(phase)) return patternCache.get(phase);

  const basePattern = new Deque([0, 1, 0, -1]);
  const pattern = [];

  for (let j = 0; j <= phase * basePattern.size; j++) {
    if (j === 0) continue;
    pattern.push(basePattern.peek(0));
    if (j % phase === 0) basePattern.rotate(-1);
  }

  patternCache.set(phase, pattern);
  return pattern;
};

function fft(signal: number[]) {
  const resultSignal = [];

  for (let i = 0; i < signal.length; i++) {
    let result = 0;
    const pattern = getPattern(i + 1);

    for (let j = 0; j < signal.length; j++) {
      const patIndex = (j + 1) % pattern.length;
      result += signal[j] * pattern[patIndex];
    }

    resultSignal.push(Math.abs(result % 10));
  }

  return resultSignal;
}

export const getSignalStart = (signal: string, phases: number) => {
  let signalNumbers = signal.split("").map(Number);

  for (let phase = 0; phase < phases; phase++) {
    signalNumbers = fft(signalNumbers);
  }

  return signalNumbers.join("").substring(0, 8);
};

export const getEmbeddedMessage = (signalStr: string, phases: number) => {
  const offset = Number(signalStr.substring(0, 7));
  let signal = signalStr.repeat(10000).split("").map(Number).slice(offset);
  const newSignal = [];

  for (let phase = 0; phase < phases; phase++) {
    let val = 0;
    for (let i = signal.length - 1; i >= 0; i--) {
      val = (val + signal[i]) % 10;
      newSignal[i] = val;
    }
    signal = [...newSignal];
  }

  return signal.join("").substring(0, 8);
};
