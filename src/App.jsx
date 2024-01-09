import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route to="/">
          <Route index path="" element={<Home />} />
          <Route path="product/:id" element={<ProductPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
