import { CONTACT } from '../data/content';

export default function ContactFooter() {
  return (
    <footer className="contact" id="contact">
      <p>
        <strong>{CONTACT.email}</strong>
        <br />
        {CONTACT.address}
      </p>
      <p className="mono">{CONTACT.signature}</p>
    </footer>
  );
}
