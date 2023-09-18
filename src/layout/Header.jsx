import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";

function Header() {
  const links = [
    { href: "template", linkName: "Template" },
    { href: "post-category", linkName: "Add category" },
    { href: "get-category", linkName: "Get category" },
    { href: "post-get-delete-category", linkName: "Post/get/delete category" },
    { href: "post-products", linkName: "Add Product" },
    { href: "get-products", linkName: "Get Product" },
    { href: "post-get-products", linkName: "Post/get/delete product" },
  ];
  return (
    <AppBar position="static" sx={{mb:10}}>
      <Toolbar>
        <Typography variant="h6">Dashboard</Typography>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            justifyContent: "space-between",
            width: "80%",
          }}
        >
          {links.map((link, index) => (
            <li key={index} style={{ flex: "1", textAlign: "center" }}>
              <Link style={{ color: "#fff" }} to={link.href}>
                {link.linkName}
              </Link>
            </li>
          ))}
        </ul>
        <IconButton sx={{ ml: "auto", color: "#fff" }}>
          <LockOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
