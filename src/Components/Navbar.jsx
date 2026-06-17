import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: "none" }}><h2>Football IQ</h2></Link>
      <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        <Link to="/standings" onClick={() => setMenuOpen(false)}>Standings</Link>
        <Link to="/teams" onClick={() => setMenuOpen(false)}>Teams</Link>
        <Link to="/matches" onClick={() => setMenuOpen(false)}>Matches</Link>
        <Link to="/comparison" onClick={() => setMenuOpen(false)}>Compare</Link>
        <Link to="/predictions" onClick={() => setMenuOpen(false)}>Predict</Link>
        <Link to="/statistics" onClick={() => setMenuOpen(false)}>Stats</Link>
        <Link to="/search" onClick={() => setMenuOpen(false)}>Search</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;