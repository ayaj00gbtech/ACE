import { useImperativeHandle, useRef } from 'react';
import { clamp } from '../lib/motion';
import { BOUNDS, PHASES } from '../data/content';

/* Bottom step bar of the pinned story; each red line fills with its phase's progress. */
export default function PhaseNavigation({ active, onSelect, ref }) {
  const fills = useRef([]);

  useImperativeHandle(
    ref,
    () => ({
      setProgress(p) {
        fills.current.forEach((el, i) => {
          el.style.transform = `scaleX(${clamp((p - BOUNDS[i]) / (BOUNDS[i + 1] - BOUNDS[i]))})`;
        });
      },
    }),
    [],
  );

  return (
    <nav className="steps" aria-label="Jump to a phase">
      {PHASES.map((phase, i) => (
        <button
          key={phase.title}
          type="button"
          className={i === active ? 'on' : undefined}
          aria-current={i === active ? 'step' : undefined}
          onClick={() => onSelect(i)}
        >
          <i
            ref={(el) => {
              fills.current[i] = el;
            }}
          ></i>
          <b>{String(i + 1).padStart(2, '0')}</b>
          <em>{phase.title}</em>
        </button>
      ))}
    </nav>
  );
}
