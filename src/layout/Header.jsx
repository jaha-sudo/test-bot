import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
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
    <Drawer variant="permanent" sx={{ paddingRight: "300px" }}>
      <List>
        {links.map((link, index) => (
          <ListItem button key={index} component={Link} to={link.href}>
            <ListItemText primary={link.linkName} />
          </ListItem>
        ))}
      </List>
      <div style={{ margin: "0 auto" }}>
        <IconButton color="inherit" component={Link} to="/">
          <LockOutlinedIcon /> <Typography>Log Out</Typography>
        </IconButton>
      </div>
    </Drawer>
  );
}

export default Header;
