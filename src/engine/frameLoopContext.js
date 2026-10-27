import { createContext } from 'react';

/* Holds the `subscribe` function of the page's single requestAnimationFrame loop. */
export const FrameLoopContext = createContext(null);
