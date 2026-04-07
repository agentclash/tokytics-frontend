export const C = (dark) => (v) => dark ? `rgba(255,255,255,${v})` : `rgba(0,0,0,${v})`;
export const V = (dark) => (v) => dark ? `rgba(255,255,255,${Math.min(v * 2, 1)})` : `rgba(0,0,0,${Math.min(v * 2.2, 1)})`;
