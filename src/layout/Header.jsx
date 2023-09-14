import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <nav>
        <ul>
        <li>
            <Link to="/">Sign Page</Link>
          </li>
          <li>
            <Link to="/post-category">Post category</Link>
          </li>
          <li>
            <Link to="/get-category">Get category</Link>
          </li>
          <li>
            <Link to="/template">Template</Link>
          </li>
          <li>
            <Link to="/post-get-delete-category">Post/Get/Delete Category</Link>
          </li>
          <li>
            <Link to="/post-products">Post Products</Link>
          </li>
          <li>
            <Link to="/get-products">Get Products</Link>
          </li>
          <li>
            <Link to="/post-get-products">Post Get Products</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
