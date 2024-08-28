import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/LogoNF-removebg-preview.png";
import { CartPanel } from "./CartPanel";
import {
  selectCartIsEmpty,
  selectTotalCartItem,
  useCart,
  useCartPanel,
} from "../../../services/cart";
import { selectAuthIsLogged, useAuth } from "../../../services/auth";
import { IfLogged } from "../auth/IfLogged";

export function NavBar() {
  const isPannelOpen = useCartPanel((state) => state.open);
  const toogleCartPanel = useCartPanel((state) => state.toogle);

  const totalItem = useCart(selectTotalCartItem);
  const isCartEmpty = useCart(selectCartIsEmpty);

  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

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
          <img src={logo} alt="my logo" className="w-10" />
          <NavLink to="shop" className={isActive}>
            HOME
          </NavLink>
          <NavLink to="shop" >
            Men
          </NavLink>
          <NavLink to="" >
            Woman
          </NavLink>
        </div>
        <div className="flex justify-between items-center mr-1 space-x-5">
    
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              className="cursor-pointer fill-[#333] inline"
              viewBox="0 0 64 64"
            >
              <path
                d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                data-original="#000000"
              />
            </svg>
            <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
              0
            </span>
          </div>
          <div className="pt-2 relative mx-auto text-gray-600">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
          </div>
          {/* Cart button badge */}
          
          <button
              className="btn accent"
              onClick={toogleCartPanel}
              disabled={isCartEmpty}
            >
              Cart: {totalItem}
            </button>
          
        </div>

        {/* Cart Panel */}
        {isPannelOpen && <CartPanel />}

        {/* Footer */}
        <div className="fixed bottom-2 right-2 p-5">
          <NavLink to="cms" className="btn accent">
            cms
          </NavLink>
          <IfLogged
            else={
              <NavLink to="login" className="btn accent">
                Login
              </NavLink>
            }
          >
            <button className="btn primary" onClick={logoutHandler}>
              Logout
            </button>
          </IfLogged>
        </div>
      </div>
    </div>
  );
}
