import { useEffect, useState } from "react";

function FAQ() {
  // Состояние, в котором будут храниться полученные данные
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.77.91:9000/admin/categories")
      .then((response) => response.json())
      .then((responseData) => {
        // Проверяем, что ответ содержит данные и устанавливаем их в состояние
        if (responseData && responseData.data) {
          setData(responseData.data);
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
        {data.map((category) => (
          <li key={category.uuid}>
            <strong>UUID:</strong> {category.uuid}
            <br />
            <strong>Название:</strong> {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FAQ;
