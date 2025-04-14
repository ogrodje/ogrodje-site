const range = function (hash: number, min: number, max: number) {
  const diff = max - min;
  const x = ((hash % diff) + diff) % diff;
  return x + min;
};

export interface Options {
  count?: number,
  hue?: [number, number],
  sat?: [number, number],
  lit?: [number, number],
  shift?: number
}

export function strToColors(str: string, opts: Options = {}) {
  if (!str) return [];

  const options = {
    count: opts.count || 3,
    hue: opts.hue || [0, 360],
    sat: opts.sat || [75, 100],
    lit: opts.lit || [40, 60],
    shift: opts.shift || 60
  };

  // Generate initial hash from string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  // Generate array of colors
  const colors = [];
  for (let i = 0; i < options.count; i++) {
    // Shift the hue for each subsequent color while keeping sat and lit consistent
    const currentHash = hash + (i * options.shift);

    const h = range(currentHash, options.hue[0], options.hue[1]);
    const s = range(hash, options.sat[0], options.sat[1]); // Using original hash for consistency
    const l = range(hash, options.lit[0], options.lit[1]); // Using original hash for consistency

    colors.push(`hsl(${h}, ${s}%, ${l}%)`);
  }

  return colors;
}

export function strToColor(str: string, ops: Options = {}) {
  return strToColors(str, ops)[0];
}

export function strToSecondColor(str: string, ops: Options = {}) {
  return strToColors(str, ops)[1];
}

export function strToThirdColor(str: string, ops: Options = {}) {
  return strToColors(str, ops)[2];
}

