import { useRef, useState } from 'react';
import useFrame from '../hooks/useFrame';
import useReducedMotion from '../hooks/useReducedMotion';
import { sectionProgress } from '../lib/motion';
import { FINALE } from '../data/content';

const wordAt = (p) => (p < 0.3 ? 0 : p < 0.6 ? 1 : 2);

/*
 * Kinetic finale: one word per third of the section, each entrance covered by a red wipe.
 * Keying the letters and the wipe on the word index remounts them, which restarts their
 * CSS animations without forcing a reflow.
 */
export default function FinaleSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const [word, setWord] = useState(-1);
  const [ended, setEnded] = useState(false);

  useFrame(
    () => sectionProgress(sectionRef.current),
    (progress) => {
      const next = wordAt(progress);
      if (next !== word) setWord(next);
      const end = progress >= 0.6;
      if (end !== ended) setEnded(end);
    },
  );

  const text = word >= 0 ? FINALE.words[word] : '';

  return (
    <section className="finale" id="finale" ref={sectionRef} aria-label="From understanding to action">
      <div className="fpin">
        <span className="fnum">{`0${Math.max(word, 0) + 1}`}</span>
        <div className={ended ? 'endline' : 'endline off'}>
          <p>
            {FINALE.line} <span>{FINALE.sub}</span>
          </p>
          <a className="cta" href="#products">
            {FINALE.cta}
          </a>
        </div>
        <h2 className="word" aria-live="polite" aria-label={text || undefined}>
          {text.split('').map((ch, j) => (
            <span className="c" key={`${word}-${j}`}>
              <span
                style={{
                  animationDelay: `${reduce ? 0 : 380 + j * 40}ms`,
                  color: j === 0 ? 'var(--red-hi)' : 'var(--fg)',
                }}
              >
                {ch}
              </span>
            </span>
          ))}
        </h2>
        <div key={word} className={word >= 0 && !reduce ? 'wipe go' : 'wipe'}></div>
      </div>
    </section>
  );
}
