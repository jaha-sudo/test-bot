import { Container } from "@mui/material";
import { useState, useEffect } from "react";

const productsApiUrl =
  "http://192.168.77.91:9000/admin/products?limit=100&offset=0";
const apiUrl = "http://192.168.77.91:9000/admin/create/product";
const categoriesApiUrl = "http://192.168.77.91:9000/admin/categories";
const imageBaseUrl = "http://192.168.77.91:9000/images/products/";
const deleteProductBaseUrl = "http://192.168.77.91:9000/admin/product/delete/";

function PostGetProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    category_id: "",
    name: "",
    price: "",
    image: null,
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(productsApiUrl);
      if (!response.ok) {
        throw new Error("Ошибка получения списка продуктов");
      }
      const data = await response.json();

      const productsWithUpdatedImageUrls = data.data.products.map(
        (product) => ({
          ...product,
          image: imageBaseUrl + product.image,
        })
      );

      setProducts(productsWithUpdatedImageUrls);
    } catch (error) {
      console.error("Ошибка получения списка продуктов:", error);
    }
  };

  const fetchCategories = () => {
    fetch(categoriesApiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData && responseData.data) {
          setCategories(responseData.data);
        } else {
          console.error("Ошибка: Неверный формат данных");
        }
      })
      .catch((error) => console.error(error));
  };

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
      setProductData({
        category_id: "",
        name: "",
        price: "",
        image: null,
      });

      fetchProducts();
    } catch (error) {
      console.error("Ошибка создания продукта:", error);
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(deleteProductBaseUrl + productId, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ошибка удаления продукта");
      }

      fetchProducts();
    } catch (error) {
      console.error("Ошибка удаления продукта:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !productData.category_id ||
      !productData.name ||
      !productData.price ||
      !productData.image
    ) {
      console.error("Пожалуйста, заполните все поля.");
      return;
    }

    createProduct(productData);
  };

  const editProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://192.168.77.91:9000/admin/product/${productId}`
      );
      if (!response.ok) {
        throw new Error("Error fetching product for editing");
      }
      const productData = await response.json();
      setProductData({
        category_id: productData.data.category_id,
        name: productData.data.name,
        price: productData.data.Price,
        image: productData.data.image,
      });
    } catch (error) {
      console.error("Error fetching product for editing:", error);
    }
  };

  return (
    <Container>
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
                <input type="file" name="image" onChange={handleInputChange} />
              </label>
              <button type="submit">Создать продукт</button>
            </form>
          </div>
        </div>
      </div>
      <h2 style={{ marginLeft: "20%", marginTop: "2rem" }}>Список продуктов</h2>
      <table style={{ marginLeft: "20%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Image</th>
            <th>Category Name</th>
            <th>Название продукта</th>
            <th>Цена</th>
            <th>Изображение</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={`http://192.168.77.91:9000/images/categories/${product.image_categ}`}
                  height={100}
                  alt={product.category_name}
                />
              </td>

              <td>{product.category_name}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                {product.image && (
                  <img src={product.image} alt={product.name} height={100} />
                )}
              </td>
              <td>
                <button onClick={() => editProduct(product.id)}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

export default PostGetProducts;
