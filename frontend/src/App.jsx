import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { HashRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import OrderListPage from "./pages/OrderListPage";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route to="/">
          <Route index path="" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="shipping" element={<ShippingPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="placeorder" element={<PlaceOrderPage />} />
          <Route path="order/:id" element={<OrderPage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="cart/:id?" element={<CartPage />} />

          <Route path="admin/userlist" element={<UserListPage />} />
          <Route path="admin/user/:id/edit" element={<UserEditPage />} />

          <Route path="admin/productlist" element={<ProductListPage />} />
          <Route path="admin/product/:id/edit" element={<ProductEditPage />} />

          <Route path="admin/orderlist" element={<OrderListPage />} />
        </Route>
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
