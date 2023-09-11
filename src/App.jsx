import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Faq from "./Faq";
import Apps from "./Apps";
import Policy from "./Policy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="faq" element={<Faq />} />
          <Route path="apps" element={<Apps />} />
          <Route path="policy" element={<Policy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
