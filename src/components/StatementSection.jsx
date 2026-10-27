import { Fragment, useRef, useState } from 'react';
import useFrame from '../hooks/useFrame';
import { sectionProgress, smooth } from '../lib/motion';
import { STATEMENT } from '../data/content';

const WORDS = [...STATEMENT.words.map((text) => ({ text })), { text: STATEMENT.emphasis, red: true }];

export default function StatementSection() {
  const sectionRef = useRef(null);
  const [lit, setLit] = useState(0);

  // Words light up one by one across the first 80% of the section's scroll.
  useFrame(
    () => sectionProgress(sectionRef.current),
    (progress) => {
      const next = Math.floor(smooth(progress / 0.8) * (WORDS.length + 0.99));
      if (next !== lit) setLit(next);
    },
  );

  return (
    <section className="stmt" id="stmt" ref={sectionRef} aria-label="Why ACE">
      <div className="stmt-pin">
        <p>
          {WORDS.map((w, i) => {
            const cls = [w.red && 'red', i < lit && 'on'].filter(Boolean).join(' ');
            return (
              <Fragment key={i}>
                {i > 0 && ' '}
                <span className={cls || undefined}>{w.text}</span>
              </Fragment>
            );
          })}
        </p>
      </div>
    </section>
  );
}
