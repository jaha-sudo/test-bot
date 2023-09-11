import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/apps">Apps</Link>
          </li>
          <li>
            <Link to="/policy">Private Policy</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
