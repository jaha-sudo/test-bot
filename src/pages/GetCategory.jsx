import { useEffect, useState } from "react";

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
    <div>
      <h1>Список категорий</h1>
      <ul>
        {categorys.map((category) => (
          <li key={category.uuid}>
            <strong>UUID:</strong> {category.uuid}
            <br />
            <strong>Название:</strong> {category.categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetCategory;
