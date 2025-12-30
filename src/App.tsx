import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Flashcards App</h1>

      <nav style={{ display: "flex", gap: 12, margin: "12px 0" }}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/words">Words</Link>
        <Link to="/training">Training</Link>
        <Link to="/stats">Stats</Link>
      </nav>

      <hr />

      <div style={{ marginTop: 16 }}>
        <Outlet />
      </div>
    </div>
  );
}
