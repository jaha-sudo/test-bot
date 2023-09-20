import { BrowserRouter, Route, Routes } from "react-router-dom";
import Template from "./pages/Template";
import SignIn from "./pages/SignIn";
import Layout from "./layout/Layout";
import GetCategory from "./pages/GetCategory";
import PostGetDeleteCategory from "./pages/PostGetDeleteCategory";
import PostCategory from "./pages/PostCategory";
import AddProducts from "./pages/AddProducts";
import ProductTable from "./pages/ProductTable";
import PostGetProduct from "./pages/PostGetProduct";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="layout" element={<Layout />}>
            <Route path="post-category" element={<PostCategory />} />
            <Route path="get-category" element={<GetCategory />} />
            <Route path="template" element={<Template />} />
            <Route
              path="post-get-delete-category"
              element={<PostGetDeleteCategory />}
            />
            <Route path="post-products" element={<AddProducts />} />
            <Route path="get-products" element={<ProductTable />} />
            <Route path="post-get-products" element={<PostGetProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
