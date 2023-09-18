import { Typography, Box } from "@mui/material";

function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5", // Цвет фона
        padding: "1rem", // Внутренний отступ
        textAlign: "center",
        position: "fixed", // Зафиксированная позиция
        bottom: 0, // Прижат к нижней грани
        width: "100%", // Занимает всю ширину // Выравнивание текста по центру
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {currentYear} Сделано с ❤️, Jan Technology
      </Typography>
    </Box>
  );
}

export default Footer;
