import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/LogoNF-removebg-preview.png";
import { CartPanel } from "./CartPanel";
import { selectCartIsEmpty, selectTotalCartItem, useCart, useCartPanel } from "../../../services/cart";
import { selectAuthIsLogged, useAuth } from "../../../services/auth";
import { IfLogged } from "../auth/IfLogged";

export function NavBar() {

  const isPannelOpen = useCartPanel(state => state.open);
  const toogleCartPanel = useCartPanel(state => state.toogle)

  const totalItem = useCart(selectTotalCartItem)
  const isCartEmpty = useCart(selectCartIsEmpty)

  
  const logout = useAuth(state => state.logout)

  const navigate = useNavigate()

  const isActive = (obj: { isActive: boolean }) => {
    return obj.isActive ? "text-sky-500 font-bold" : "text-white";
  };

  function logoutHandler() {
    logout();
    navigate("/login");
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <div className="bg-slate-200 shadow-lg flex justify-between items-center h-20 text-white p-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="my logo" className="w-16" />
          <NavLink to="shop" className={isActive}>
            SHOP
          </NavLink>
        </div>

        {/* Cart button badge */}
        <div>
          <button className="btn accent" onClick={toogleCartPanel} disabled={isCartEmpty}>Cart: {totalItem}</button>
        </div>

        {/* Cart Panel */}
        {isPannelOpen && <CartPanel />}

        {/* Footer */}
        <div className="fixed bottom-2 right-2 p-5">
          
          <NavLink to="cms" className="btn accent">
            cms
          </NavLink>
          <IfLogged else={
            <NavLink to="login" className="btn accent">
            Login
          </NavLink>
          }>
           <button className="btn primary" onClick={logoutHandler}>Logout</button>
          </IfLogged>
        </div>
      </div>
    </div>
  );
}
