import { DETAILS } from '../data/content';

export default function DetailSection() {
  return (
    <section className="detail" id="products" aria-label="What happens in each phase">
      {DETAILS.map((item) => (
        <div key={item.label}>
          <h3>{item.label}</h3>
          <h4>{item.title}</h4>
          <p>{item.body}</p>
          <ol>
            {item.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}
