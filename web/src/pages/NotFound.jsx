import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons';

export default function NotFound() {
  return (
    <section className="notfound">
      <span className="eyebrow">Page not found</span>
      <h1>404</h1>
      <p>This page does not exist — but the rest of the site does.</p>
      <Link className="btn" to="/">
        Back to home <Icon name="arrowRight" />
      </Link>
    </section>
  );
}
