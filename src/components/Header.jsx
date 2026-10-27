/* Fixed top bar: brand on the left, the story "camera" label on the right. */
export default function Header({ camLabel }) {
  return (
    <div className="bar">
      <span className="brand">
        ECOVIS RKCA <b>/</b> ACE AI
      </span>
      <span className="cam mono">
        <span className="rec"></span>
        <span>{camLabel}</span>
      </span>
    </div>
  );
}
