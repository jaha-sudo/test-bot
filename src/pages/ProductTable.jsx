import { useState, useEffect } from "react";

const productsApiUrl =
  "http://192.168.77.91:9000/admin/products?limit=100&offset=0";
const imageBaseUrl = "http://192.168.77.91:9000/images/";
const deleteProductBaseUrl =
  "http://192.168.77.91:9000/admin/product/delete/"; // Базовый URL для удаления продукта

function ProductTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(productsApiUrl);
      if (!response.ok) {
        throw new Error("Ошибка получения списка продуктов");
      }
      const data = await response.json();

      const productsWithUpdatedImageUrls = data.data.products.map((product) => ({
        ...product,
        image: imageBaseUrl + product.image,
      }));

      setProducts(productsWithUpdatedImageUrls);
    } catch (error) {
      console.error("Ошибка получения списка продуктов:", error);
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

      // После успешного удаления продукта, обновите список продуктов
      fetchProducts();
    } catch (error) {
      console.error("Ошибка удаления продукта:", error);
    }
  };

  return (
    <div>
      <h2>Список продуктов</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
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
              <td>Here will be category&apos;s name</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                {product.image && (
                  <img src={product.image} alt={product.name} height={100} />
                )}
              </td>
              <td>
                <button onClick={() => deleteProduct(product.id)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
