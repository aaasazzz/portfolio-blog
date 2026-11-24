import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { contacts, profile } from '../data/profile';

const sections = [
  { label: 'Tech stack', to: '/#tech-stack' },
  { label: 'Career', to: '/#career' },
  { label: 'Project', to: '/#project' },
];

function useScrolled(threshold: number) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > threshold);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [threshold]);

  return scrolled;
}

export default function PublicLayout() {
  const { pathname } = useLocation();
  const scrolled = useScrolled(40);
  const transparent = pathname === '/' && !scrolled;

  return (
    <>
      <header className={transparent ? 'site-header site-header-transparent' : 'site-header'}>
        <div className="container site-header-inner">
          <Link className="site-name" to="/">
            {profile.name}
          </Link>
          <nav className="site-nav" aria-label="주요 메뉴">
            {sections.map((section) => (
              <Link key={section.to} to={section.to}>
                {section.label}
              </Link>
            ))}
            <NavLink to="/blog">Blog</NavLink>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer" id="contact">
        <div className="container site-footer-inner">
          <span className="site-footer-title">Contact</span>
          <ul className="contact-list">
            {contacts.map((contact) => (
              <li key={contact.label}>
                <span className="contact-label">{contact.label}</span>
                <a
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {contact.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
}
