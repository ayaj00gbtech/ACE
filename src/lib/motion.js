export const clamp = (v) => Math.max(0, Math.min(1, v));

/* Smoothstep on a clamped input. */
export const smooth = (a) => {
  a = clamp(a);
  return a * a * (3 - 2 * a);
};

export const fract = (v) => v - Math.floor(v);

/* 0 when the section's top reaches the viewport top, 1 when its bottom reaches the viewport bottom. */
export function sectionProgress(el) {
  const top = el.getBoundingClientRect().top;
  const span = el.offsetHeight - window.innerHeight;
  return clamp(-top / span);
}
