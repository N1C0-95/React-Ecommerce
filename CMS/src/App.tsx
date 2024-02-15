
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CartPage, CheckoutPage, CmsOrdersPage, CmsPage, CmsProductsPage, LoginPage, ShopPage, ThanksPage } from "./pages";
import { NavBar, PrivateRoute } from "./shared";


function App() {
  return (
    <BrowserRouter>

      <NavBar/>
      <div className="page">
        <Routes>
          <Route path="login" element={<LoginPage />} />

          <Route path="shop" element={<ShopPage />} />

          <Route path="cart" element={<CartPage />} />

          <Route path="checkout" element={<CheckoutPage />} />

          <Route path="thanks" element={<ThanksPage />} />

          <Route path="cms" element={<PrivateRoute><CmsPage/></PrivateRoute>}>
            <Route path="products" element={<CmsProductsPage />} />
            <Route path="orders" element={<CmsOrdersPage />} />
            <Route index element={<Navigate to="products" />} />
          </Route>
          <Route path="*" element={<Navigate to="shop" />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
