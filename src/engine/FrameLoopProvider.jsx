import { useCallback, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { FrameLoopContext } from './frameLoopContext';

/*
 * The page's only animation loop. Each tick first runs every subscriber's `read`
 * (layout measurements), then every `write` (DOM/state updates), so measurements
 * never force a synchronous reflow after a style change in the same frame.
 * State set during `write` is committed inside the same frame (flushSync), keeping
 * class/state changes in step with the transforms written directly to the DOM.
 * Writes only set state on discrete transitions, so most frames commit nothing.
 */
export default function FrameLoopProvider({ children }) {
  const subscribers = useRef([]);

  const subscribe = useCallback((sub) => {
    subscribers.current = [...subscribers.current, sub];
    return () => {
      subscribers.current = subscribers.current.filter((s) => s !== sub);
    };
  }, []);

  useEffect(() => {
    let id;
    const tick = (t) => {
      const subs = subscribers.current;
      const measured = subs.map((s) => s.read());
      flushSync(() => subs.forEach((s, i) => s.write(measured[i], t)));
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return <FrameLoopContext value={subscribe}>{children}</FrameLoopContext>;
}
