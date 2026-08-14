import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/CreateUser";
import UserDetails from "./pages/UserDetails";
import EditUser from "./pages/EditUser";

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-group">
          <span className="brand-pill">Admin Panel</span>
          <h1>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              User Management Dashboard
            </Link>
          </h1>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users/new" element={<CreateUser />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/users/:id/edit" element={<EditUser />} />
        <Route
          path="*"
          element={
            <div className="card">
              Page not found. <Link to="/">Go home</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
