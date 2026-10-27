import { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';
import useFrame from '../hooks/useFrame';
import useReducedMotion from '../hooks/useReducedMotion';
import { clamp, sectionProgress } from '../lib/motion';
import { BOUNDS, CAM_DONE, CAM_IDLE, PHASES } from '../data/content';
import AssessVisualization from './AssessVisualization';
import CoCreateVisualization from './CoCreateVisualization';
import ExecuteVisualization from './ExecuteVisualization';
import PhaseNavigation from './PhaseNavigation';

const STAGE_WIDTH = 680;

const sceneAt = (p) => (p < BOUNDS[1] ? 0 : p < BOUNDS[2] ? 1 : 2);
const layerAt = (a) => (a < 0.34 ? 0 : a < 0.67 ? 1 : 2);
const coStepAt = (c) => (c < 0.36 ? 0 : c < 0.66 ? 1 : 2);
const chipLevelAt = (e) => (e < 0.18 ? -1 : Math.min(3, Math.floor((e - 0.18) / 0.2)));

function PhaseList({ items, active }) {
  return (
    <ol className="lst">
      {items.map((item, i) => (
        <li key={item.k} className={i === active ? 'on' : undefined}>
          <span className="k">{item.k}</span>
          <span className="n">{item.n}</span>
          <span className="d">{item.d}</span>
        </li>
      ))}
    </ol>
  );
}

/*
 * The pinned three-phase story. Scroll progress through the 640vh section is eased
 * (lerp .14) and split by BOUNDS into Assess / Co-create / Execute; each phase only
 * advances while it is the active scene, exactly as in the source page.
 */
function StorySection({ onCamLabel }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const letterRef = useRef(null);
  const copiesRef = useRef(null);
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const assessRef = useRef(null);
  const coCreateRef = useRef(null);
  const navRef = useRef(null);

  const [scene, setScene] = useState(0);
  const [layer, setLayer] = useState(0);
  const [coStep, setCoStep] = useState(0);
  const [structured, setStructured] = useState(false);
  const [chipLevel, setChipLevel] = useState(-1);
  // Values the frame loop compares against so React state only changes on real transitions.
  const sim = useRef({ eased: 0, scene: 0, layer: 0, coStep: 0, structured: false, chipLevel: -1, cam: CAM_IDLE });

  // Scale the fixed 680×460 illustration to the wrapper width.
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const fit = () => {
      stageRef.current.style.transform = `scale(${wrap.clientWidth / STAGE_WIDTH})`;
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  useFrame(
    () => {
      const el = sectionRef.current;
      const rect = el.getBoundingClientRect();
      return { target: sectionProgress(el), top: rect.top, bottom: rect.bottom };
    },
    ({ target, top, bottom }, t) => {
      const s = sim.current;
      s.eased += reduce ? target - s.eased : (target - s.eased) * 0.14;
      if (Math.abs(target - s.eased) < 0.0004) s.eased = target;
      const p = s.eased;

      const n = sceneAt(p);
      if (n !== s.scene) {
        s.scene = n;
        setScene(n);
      }

      const label = top > 0 ? CAM_IDLE : bottom < 0 ? CAM_DONE : PHASES[n].cam;
      if (label !== s.cam) {
        s.cam = label;
        onCamLabel(label);
      }

      const local = clamp((p - BOUNDS[n]) / (BOUNDS[n + 1] - BOUNDS[n]));
      if (n === 0) {
        assessRef.current.update(local);
        const L = layerAt(local);
        if (L !== s.layer) {
          s.layer = L;
          setLayer(L);
        }
      }
      if (n === 1) {
        coCreateRef.current.update(local);
        const st = coStepAt(local);
        if (st !== s.coStep) {
          s.coStep = st;
          setCoStep(st);
        }
      }
      coCreateRef.current.pulses(n === 1 && local > 0.9, t);
      if (n === 2) {
        const want = local > 0.18;
        if (want !== s.structured) {
          s.structured = want;
          setStructured(want);
        }
        const level = chipLevelAt(local);
        if (level !== s.chipLevel) {
          s.chipLevel = level;
          setChipLevel(level);
        }
      }
      navRef.current.setProgress(p);

      // Parallax depth: background letter and grid drift against the foreground.
      letterRef.current.style.transform = `translateY(${-local * 140}px)`;
      gridRef.current.style.backgroundPosition = `0 ${-p * 400}px`;
      copiesRef.current.style.transform = `translateY(${(0.5 - local) * 18}px)`;
      wrapRef.current.style.transform = `translateY(${(0.5 - local) * -26}px)`;
    },
  );

  const goToPhase = useCallback(
    (i) => {
      const el = sectionRef.current;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const span = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + span * (BOUNDS[i] + 0.02), behavior: reduce ? 'auto' : 'smooth' });
    },
    [reduce],
  );

  return (
    <section className="story" id="story" ref={sectionRef} aria-label="The three phases of ACE">
      <div className="pin">
        <div className="pin-bg" aria-hidden="true">
          <div className="grid" ref={gridRef} style={{ opacity: 0.25 }}></div>
          <div className="bgl" ref={letterRef}>
            {'ACE'[scene]}
          </div>
        </div>

        <div className="scene">
          <div className="copies" ref={copiesRef}>
            {PHASES.map((phase, i) => (
              <div key={phase.title} className={i === scene ? 'copy on' : 'copy'}>
                <div className="num mono">{phase.num}</div>
                <h2>{phase.title}</h2>
                <p className="tag">{phase.tag}</p>
                {phase.items ? (
                  <PhaseList items={phase.items} active={i === 0 ? layer : coStep} />
                ) : (
                  <div className="chips">
                    {phase.chips.map((chip, c) => (
                      <span key={chip} className={c <= chipLevel ? 'on' : undefined}>
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="wrap" ref={wrapRef}>
            <div className="stage" ref={stageRef} role="img" aria-label="Animated illustration of the current phase">
              <AssessVisualization ref={assessRef} active={scene === 0} layer={layer} />
              <CoCreateVisualization ref={coCreateRef} active={scene === 1} />
              <ExecuteVisualization active={scene === 2} structured={structured} />
            </div>
          </div>
        </div>

        <PhaseNavigation ref={navRef} active={scene} onSelect={goToPhase} />
      </div>
    </section>
  );
}

export default memo(StorySection);
