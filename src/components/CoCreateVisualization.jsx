import { Fragment, useImperativeHandle, useRef, useState } from 'react';
import { fract, smooth } from '../lib/motion';
import { DASHBOARD_BARS, INPUTS, KPI_ROWS, SYSTEMS, WHO } from '../data/content';

const inputTop = (i) => 30 + i * 68;
const systemTop = (j) => 60 + j * 100;
const systemStart = (j) => 0.66 + j * 0.05;
const inputPath = (i) => `M178 ${inputTop(i) + 21} H202 V${60 + i * 52} H226`;
const systemPath = (j) => `M516 ${120 + j * 70} H538 V${systemTop(j) + 31} H560`;

/* Position each kept KPI moves to once the list is tailored. */
const KEPT_SLOT = KPI_ROWS.map((_, i) => KPI_ROWS.slice(0, i).filter((r) => r.keep).length);

const INITIAL_VIEW = { inputs: 0, who: 0, tailored: false, renamed: false, preview: false, systems: 0, live: false };
const viewKey = (v) => Object.values(v).join('|');

/*
 * Personalisation stage: inputs flow into the platform, generic KPIs are tailored,
 * a draft dashboard appears, then the platform wires into the client's systems.
 * Discrete stages are React state; continuous values (line draw, meter, pulses) are
 * written straight to the DOM from the frame loop.
 */
export default function CoCreateVisualization({ active, ref }) {
  const [view, setView] = useState(INITIAL_VIEW);
  const lastKey = useRef(viewKey(INITIAL_VIEW));
  const inputLinks = useRef([]);
  const systemLinks = useRef([]);
  const pulseEls = useRef([]);
  const meterRef = useRef(null);
  const pctRef = useRef(null);
  const pulsing = useRef(false);

  useImperativeHandle(
    ref,
    () => ({
      update(c) {
        inputLinks.current.forEach((path, i) => {
          path.setAttribute('stroke-dashoffset', 1 - smooth((c - (0.06 + i * 0.045)) / 0.08));
        });
        systemLinks.current.forEach((path, j) => {
          path.setAttribute('stroke-dashoffset', 1 - smooth((c - systemStart(j)) / 0.07));
        });
        const meter = smooth((c - 0.3) / 0.4);
        meterRef.current.style.transform = `scaleX(${meter})`;
        pctRef.current.textContent = `${Math.round(meter * 100)}%`;

        const next = {
          inputs: INPUTS.filter((_, i) => c > 0.02 + i * 0.045).length,
          who: Math.round(WHO.length * smooth((c - 0.12) / 0.2)),
          tailored: c > 0.4,
          renamed: c > 0.5,
          preview: c > 0.56,
          systems: SYSTEMS.filter((_, j) => c > systemStart(j) + 0.03).length,
          live: c > 0.9,
        };
        const key = viewKey(next);
        if (key !== lastKey.current) {
          lastKey.current = key;
          setView(next);
        }
      },

      /* Red packets travelling along the system links once integration is live. */
      pulses(on, t) {
        if (!on && !pulsing.current) return;
        pulsing.current = on;
        pulseEls.current.forEach((el, j) => {
          el.style.opacity = on ? 1 : 0;
          if (!on) return;
          const f = fract(t / 1400 + j * 0.25);
          const y0 = 120 + j * 70 - 3;
          const y1 = systemTop(j) + 31 - 3;
          let x, y;
          if (f < 0.3) {
            x = 513 + (f / 0.3) * 22;
            y = y0;
          } else if (f < 0.6) {
            x = 535;
            y = y0 + (y1 - y0) * ((f - 0.3) / 0.3);
          } else {
            x = 535 + ((f - 0.6) / 0.4) * 22;
            y = y1;
          }
          el.style.left = `${x}px`;
          el.style.top = `${y}px`;
        });
      },
    }),
    [],
  );

  return (
    <div className="grp" style={{ opacity: active ? 1 : 0 }}>
      <svg className="links" width="680" height="460" aria-hidden="true">
        {INPUTS.map((label, i) => (
          <path
            key={label}
            ref={(el) => {
              inputLinks.current[i] = el;
            }}
            d={inputPath(i)}
            stroke="#E23A44"
            strokeWidth="1.5"
            fill="none"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
          />
        ))}
        {SYSTEMS.map(([, name], j) => (
          <path
            key={name}
            ref={(el) => {
              systemLinks.current[j] = el;
            }}
            d={systemPath(j)}
            stroke="#E23A44"
            strokeWidth="1.5"
            fill="none"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
          />
        ))}
      </svg>

      {INPUTS.map((label, i) => (
        <div key={label} className={i < view.inputs ? 'in on' : 'in'} style={{ top: inputTop(i) }}>
          <i></i>
          {label}
        </div>
      ))}

      <div className="plat">
        <div className="hd">
          <span>ACE · BUILT FOR</span>
          <b>{WHO.slice(0, view.who)}</b>
        </div>

        {KPI_ROWS.map((row, i) => {
          const state = view.tailored ? (row.keep ? ' keep' : ' drop') : '';
          const slot = row.keep && view.renamed ? KEPT_SLOT[i] : i;
          return (
            <div key={row.name} className={`row${state}`} style={{ top: 58 + slot * 42 }}>
              <span className="ck"></span>
              <span className="tx">{view.renamed && row.keep ? row.tailored : row.name}</span>
            </div>
          );
        })}

        <div className={view.preview ? 'prev on' : 'prev'}>
          <div className="cap">YOUR DASHBOARD · DRAFT</div>
          <div className="bars">
            {DASHBOARD_BARS.map((h, i) => (
              <i
                key={i}
                className={i === DASHBOARD_BARS.length - 1 ? 'pb hi' : 'pb'}
                style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }}
              ></i>
            ))}
          </div>
        </div>

        <div className="meter">
          <div className="lbl">
            <span>PERSONALISATION</span>
            <span ref={pctRef}>0%</span>
          </div>
          <div className="tr">
            <i ref={meterRef}></i>
          </div>
        </div>
      </div>

      {SYSTEMS.map(([owner, name], j) => (
        <Fragment key={name}>
          <div
            className={'sys' + (j < view.systems ? ' on' : '') + (view.live ? ' live' : '')}
            style={{ top: systemTop(j) }}
          >
            <small>{owner}</small>
            <b>{name}</b>
          </div>
          <div
            className="pulse"
            ref={(el) => {
              pulseEls.current[j] = el;
            }}
          ></div>
        </Fragment>
      ))}
    </div>
  );
}
