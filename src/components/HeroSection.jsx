import { useRef } from 'react';
import useFrame from '../hooks/useFrame';
import { HERO } from '../data/content';

export default function HeroSection() {
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  // Parallax: the grid and ghost letters drift down, the content drifts up.
  useFrame(
    () => ({ y: window.scrollY, vh: window.innerHeight }),
    ({ y, vh }) => {
      if (y >= vh * 1.2) return;
      bgRef.current.style.transform = `translateY(${y * 0.45}px)`;
      contentRef.current.style.transform = `translateY(${y * -0.12}px)`;
    },
  );

  return (
    <header className="hero" id="hero">
      <div className="hero-bg" ref={bgRef} aria-hidden="true">
        <div className="grid"></div>
        <div className="ghost">ACE</div>
      </div>
      <div className="hero-in" ref={contentRef}>
        <div>
          <div className="kick mono">{HERO.kicker}</div>
          <h1 className="ace" aria-label="Assess, Co-create, Execute">
            {HERO.lines.map((line) => (
              <span className="ln" key={line.initial}>
                <span>
                  <i>{line.initial}</i>
                  {line.rest}
                </span>
              </span>
            ))}
          </h1>
        </div>
        <div className="hero-side">
          <p>
            <strong>{HERO.lead}</strong>
            {HERO.body}
          </p>
          <div className="hint mono">
            <i></i>
            {HERO.hint}
          </div>
        </div>
      </div>
    </header>
  );
}
