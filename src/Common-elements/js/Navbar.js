import "../css/Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <Link className="nav-link" to="/orders">Orders</Link>
      <Link className="nav-link" to="/reservations">Reservations</Link>
      <Link className="nav-link" to="/users">Users</Link>
      <Link className="nav-link" to="/businesses">Businesses</Link>
    </div>
  );
}

export default Navbar;