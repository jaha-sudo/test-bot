import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import GetCategory from "./pages/GetCategory";
import AddShowProducts from "./pages/AddShowProducts";
import PostGetDeleteCategory from "./pages/PostGetDeleteCategory";
import Template from "./pages/Template";
import PostCategory from "./pages/PostCategory";
import Sign from "./pages/Sign";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Sign />} />
          <Route path="post-category" element={<PostCategory />} />
          <Route path="get-category" element={<GetCategory />} />
          <Route path="template" element={<Template />} />
          <Route
            path="post-get-delete-category"
            element={<PostGetDeleteCategory />}
          />
          <Route
            path="post-get-delete-products"
            element={<AddShowProducts />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
