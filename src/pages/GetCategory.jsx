import { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

function GetCategory() {
  // Состояние, в котором будут храниться полученные данные
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    fetch("http://192.168.77.91:9000/admin/categories")
      .then((response) => response.json())
      .then((responseData) => {
        // Проверяем, что ответ содержит данные и устанавливаем их в состояние
        if (responseData && responseData.data) {
          setCategorys(responseData.data);
        } else {
          console.error("Ошибка: Неверный формат данных");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div style={{maxWidth:'600px', margin:'2rem auto'}}>
      <Typography variant="h4">Список категорий</Typography>
      <List>
        {categorys.map((category) => (
          <ListItem key={category.uuid}>
            <ListItemText
              primary={`UUID: ${category.uuid}`}
              secondary={`Название: ${category.categoryName}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default GetCategory;
