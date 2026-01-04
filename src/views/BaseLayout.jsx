import { NavLink, Outlet, Link } from 'react-router-dom';

export default function BaseLayout() {
  return (
    <div className="layout">
      <header className="header">
        <h1>
          <Link to="/" className="brand-link">
            Purrfect Adoption
          </Link>
        </h1>

        <nav className="nav">
          <NavLink to="/about" className="nav-link">
            About us
          </NavLink>

          <NavLink to="/available-cats" className="nav-link">
            Available cats
          </NavLink>

          
          <button
            className="nav-link nav-btn"
            type="button"
            aria-label="Donate"
          >
            Donate
          </button>

          <NavLink to="/contact" className="nav-link">
            Contact us
          </NavLink>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">© Copyright 2024</footer>
    </div>
  );
}
