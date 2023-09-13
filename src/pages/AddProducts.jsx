import { useState, useEffect } from "react";

const apiUrl = "http://192.168.77.91:9000/admin/create/product"; // Замените на URL вашего бэкэнда
const categoriesApiUrl = "http://192.168.77.91:9000/admin/categories"; // URL для получения категорий

// Функция для создания продукта с использованием FormData
const createProduct = async (productData) => {
  try {
    const formData = new FormData();
    formData.append("category_id", productData.category_id);
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("image", productData.image);

    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Ошибка создания продукта");
    }

    console.log("Продукт успешно создан.");
  } catch (error) {
    console.error("Ошибка создания продукта:", error);
    throw error;
  }
};

function AddProducts() {
  const [productData, setProductData] = useState({
    category_id: "",
    name: "",
    price: "",
    image: null,
  });

  const [categories, setCategories] = useState([]); // Состояние для хранения категорий

  useEffect(() => {
    // Запрос для получения списка категорий
    fetch(categoriesApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        // Проверяем, что ответ содержит данные и устанавливаем их в состояние
        if (responseData && responseData.data) {
          setCategories(responseData.data);
        } else {
          console.error("Ошибка: Неверный формат данных");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setProductData({
        ...productData,
        [name]: files[0],
      });
    } else {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.category_id || !productData.name || !productData.price || !productData.image) {
      console.error("Пожалуйста, заполните все поля.");
      return;
    }

    // Вызываем функцию для создания продукта с использованием FormData
    await createProduct(productData);

    // Очищаем поля формы
    setProductData({
      category_id: "",
      name: "",
      price: "",
      image: null,
    });
  };

  return (
    <div className="wrapper">
      <div className="wrapper-content">
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Категория:
              <select
                name="category_id"
                value={productData.category_id}
                onChange={handleInputChange}
              >
                <option value="">Выберите категорию</option>
                {categories.map((category) => (
                  <option key={category.uuid} value={category.uuid}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Название продукта:
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Цена:
              <input
                type="text"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Изображение:
              <input
                type="file"
                name="image"
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Создать продукт</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProducts;
