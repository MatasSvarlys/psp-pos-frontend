import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { roleRoutes } from "../../lib/roleRoutes.js";

function Navbar({ userRole }) {
  const routes = roleRoutes[userRole] || [];

  return (
    <div className="navbar">
      {routes.map((route) => (
        <Link key={route.path} className="nav-link" to={route.path}>
          {route.label}
        </Link>
      ))}
    </div>
  );
}

export default Navbar;
