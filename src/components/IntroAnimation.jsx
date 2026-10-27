/* Shutter reveal on load; pure CSS (see animations.css), hidden under reduced motion. */
export default function IntroAnimation() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="t"></div>
      <div className="b"></div>
      <div className="l"></div>
    </div>
  );
}
