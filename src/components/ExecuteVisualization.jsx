import { COLUMN_HEIGHTS } from '../data/content';
import { fract } from '../lib/motion';

/* 144 squares: a deterministic scatter, and their slot in a bar chart of 3-wide columns. */
const DOTS = (() => {
  const dots = [];
  let column = 0;
  let index = 0;
  for (let k = 0; k < 144; k++) {
    const rows = COLUMN_HEIGHTS[column] / 3;
    const level = Math.floor(index / 3);
    dots.push({
      scattered: {
        left: Math.round(12 + fract(Math.sin(k * 12.9898) * 43758.5) * 650),
        top: Math.round(12 + fract(Math.sin(k * 78.233) * 43758.5) * 420),
        background: k % 11 === 0 ? '#E23A44' : k % 3 === 0 ? '#4A4A4A' : '#D9D9D9',
      },
      structured: {
        left: Math.round(24 + column * 54 + (index % 3) * 14),
        top: Math.round(420 - level * 14),
        background: level === rows - 1 ? '#E23A44' : '#F2F2F2',
      },
    });
    index++;
    if (index >= COLUMN_HEIGHTS[column]) {
      column++;
      index = 0;
    }
  }
  return dots;
})();

/* Scattered signals that fall into structure (staggered 5ms per square) once the phase is under way. */
export default function ExecuteVisualization({ active, structured }) {
  return (
    <div className="grp" style={{ opacity: active ? 1 : 0 }}>
      <div className="base" style={{ opacity: structured ? 1 : 0 }}></div>
      <div className="live" style={{ opacity: structured ? 1 : 0 }}>
        <span className="rec"></span>LIVE
      </div>
      {DOTS.map((dot, k) => (
        <div
          key={k}
          className="sq"
          style={{
            ...(structured ? dot.structured : dot.scattered),
            transitionDelay: `${structured ? k * 5 : 0}ms`,
          }}
        ></div>
      ))}
    </div>
  );
}
