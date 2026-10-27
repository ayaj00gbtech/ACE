import { useImperativeHandle, useRef } from 'react';
import { smooth } from '../lib/motion';
import { FRAMES } from '../data/content';

/* Nested layer frames; the whole set zooms toward the core as the phase progresses. */
export default function AssessVisualization({ active, layer, ref }) {
  const diverRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      update(a) {
        const scale = 1 + 0.5 * smooth((a - 0.22) / 0.26) + 1.15 * smooth((a - 0.56) / 0.3);
        diverRef.current.style.transform = `scale(${scale})`;
      },
    }),
    [],
  );

  return (
    <div className="grp" style={{ opacity: active ? 1 : 0 }}>
      <div className="diver" ref={diverRef}>
        {FRAMES.map((f, i) => (
          <div key={f.name} className={i === layer ? 'fr on' : 'fr'} style={f.box}>
            <div className="lb" style={f.labelPos}>
              <small style={f.tagSize ? { fontSize: f.tagSize } : undefined}>{f.tag}</small>
              <b style={{ fontSize: f.nameSize }}>{f.name}</b>
            </div>
          </div>
        ))}
        <div className="core"></div>
      </div>
    </div>
  );
}
