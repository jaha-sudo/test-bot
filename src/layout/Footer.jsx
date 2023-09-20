import { Typography, Box } from "@mui/material";

function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        mt:'2rem', 
        padding: "1rem", 
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {currentYear} Сделано с ❤️, Jan Technology
      </Typography>
    </Box>
  );
}

export default Footer;
