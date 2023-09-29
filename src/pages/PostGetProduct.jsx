import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Pagination,
} from "@mui/material";
import { useState, useEffect } from "react";

const getProductsApi =
  "http://192.168.77.91:9000/admin/products?limit=100&offset=0";
const createProductApi = "http://192.168.77.91:9000/admin/create/product";
const getCategoriesApi = "http://192.168.77.91:9000/admin/categories";
const getProductsImgApi = "http://192.168.77.91:9000/images/products/";
const deleteProductApi = "http://192.168.77.91:9000/admin/product/delete/";

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
      const response = await fetch(getProductsApi);
      if (!response.ok) {
        throw new Error("Ошибка получения списка продуктов");
      }
      const data = await response.json();

      const productsWithUpdatedImageUrls = data.data.products.map(
        (product) => ({
          ...product,
          image: getProductsImgApi + product.image,
        })
      );

      setProducts(productsWithUpdatedImageUrls);
    } catch (error) {
      console.error("Ошибка получения списка продуктов:", error);
    }
  };

  const fetchCategories = () => {
    fetch(getCategoriesApi)
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

      const response = await fetch(createProductApi, {
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
      const response = await fetch(deleteProductApi + productId, {
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

  const [page, setPage] = useState(1);
  const perPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const pageCount = Math.ceil(products.length / perPage);

  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  return (
    <Box sx={{ marginLeft: "15rem", mt: "2rem", mr: "2rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Создать продукт
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                alignItems="center"
              >
                <FormControl
                  margin="normal"
                  style={{ marginRight: "16px", flex: 1 }}
                >
                  <InputLabel>Категория</InputLabel>
                  <Select
                    name="category_id"
                    value={productData.category_id}
                    label="Age"
                    onChange={handleInputChange}
                    sx={{ height: "60px" }}
                  >
                    <MenuItem value="">
                      <em>Выберите категорию</em>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.uuid} value={category.uuid}>
                        {category.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  sx={{ height: "60px" }}
                  fullWidth
                  margin="normal"
                  label="Название продукта"
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  style={{ marginRight: "16px", flex: 1 }}
                />
                <TextField
                  sx={{ height: "60px" }}
                  fullWidth
                  margin="normal"
                  label="Цена"
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  style={{ marginRight: "16px", flex: 1 }}
                />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="image"
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="image"
                  style={{ marginRight: "16px", flex: 1, marginTop: "8px" }}
                >
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "60px",
                    }}
                  >
                    Загрузить изображение
                  </Button>
                </label>
              </Box>
              {productData.image && (
                <Typography variant="body2">
                  Изображение выбрано: {productData.image.name}
                </Typography>
              )}

              <Box display="flex" justifyContent="center">
                <Button
                  sx={{ width: "30%" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Создать продукт
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "ID",
                  "Category Image",
                  "Category Name",
                  "Название продукта",
                  "Цена",
                  "Изображение",
                  "Действия",
                ].map((headerText, index) => (
                  <TableCell sx={{ bgcolor: "#f5f5f5" }} key={index}>
                    {headerText}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.slice(startIndex, endIndex).map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={`http://192.168.77.91:9000/images/categories/${product.image_categ}`}
                      height={100}
                      alt={product.category_name}
                    />
                  </TableCell>
                  <TableCell>{product.category_name}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        height={100}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          onClick={() => editProduct(product.id)}
                        >
                          Edit
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          onClick={() => deleteProduct(product.id)}
                        >
                          Удалить
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Pagination
                count={pageCount}
                page={page}
                onChange={handleChangePage}
                siblingCount={0} // Вот здесь устанавливаем siblingCount в 0, чтобы отображать только одну страницу справа и слева
                color="primary"
                showFirstButton={true}
                showLastButton={true}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PostGetProducts;
