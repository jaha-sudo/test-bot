import { useState, useEffect } from "react";

const productsApiUrl =
  "http://192.168.77.91:9000/admin/products?limit=100&offset=0";

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
      setProducts(data.data.products); // Установите массив продуктов в состояние
    } catch (error) {
      console.error("Ошибка получения списка продуктов:", error);
    }
  };

  return (
    <div>
      <h2>Список продуктов</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название продукта</th>
            <th>Цена</th>
            <th>Изображение</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                {product.image && (
                  <img src={product.image} alt={product.name} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
