import { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { FrameLoopContext } from '../engine/frameLoopContext';

/*
 * Registers a component with the shared frame loop.
 * `read()` measures layout; its result is passed to `write(measured, time)`.
 * The latest callbacks are always used, so they can close over current props/state.
 */
export default function useFrame(read, write) {
  const subscribe = useContext(FrameLoopContext);
  const handlers = useRef({ read, write });

  useLayoutEffect(() => {
    handlers.current = { read, write };
  });

  useEffect(
    () =>
      subscribe({
        read: () => handlers.current.read(),
        write: (measured, t) => handlers.current.write(measured, t),
      }),
    [subscribe],
  );
}
