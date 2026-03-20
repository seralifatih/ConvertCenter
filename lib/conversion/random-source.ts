export type RandomSource = () => number;

export function createSeededRandom(seed: number): RandomSource {
  let state = (Number.isFinite(seed) ? Math.floor(seed) : 1) >>> 0 || 1;

  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function pickRandom<T>(items: readonly T[], random: RandomSource) {
  return items[Math.floor(random() * items.length)] ?? items[0];
}

export function randomBetween(random: RandomSource, min: number, max: number) {
  return Math.floor(random() * (max - min + 1)) + min;
}

export function shuffleWithRandom<T>(items: readonly T[], random: RandomSource) {
  const nextItems = [...items];

  for (let index = nextItems.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    const currentItem = nextItems[index];
    nextItems[index] = nextItems[swapIndex] as T;
    nextItems[swapIndex] = currentItem as T;
  }

  return nextItems;
}
