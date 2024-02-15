import { useNavigate } from "react-router-dom";
import { selectCartList, selectTotalCartCost, useCart, useCartPanel } from "../../../services/cart";

export function CartPanel() {
  const navigate = useNavigate();
  const closePanelOverlay = useCartPanel((state) => state.closeOverlay);
  
  const listProduct = useCart(selectCartList);
  const totalCost = useCart(selectTotalCartCost);

  function goToCart() {
    navigate("/cart");
    closePanelOverlay();
    console.log("go to cart");
  }

  
  return (
    <div className="fixed bg-slate-800 p-3 right-4 top-24 rounded-xl w-96">
      <ul className="flex flex-col gap-4">
        {listProduct.map((p) => {
          return (
            <>
              <li key={p.product.id} className="flex items-center justify-between border-b border-slate-400">
                <div>{p.product.name}</div>
                <div className="flex gap-3">
                  <div>( {p.quantity} x {p.product.cost} € )</div>
                  <div>{p.quantity * p.product.cost} €</div>
                </div>
              </li>
            </>
          );
        })}
      </ul>
      <div className="flex justify-end text-xl font-bold">Total:{totalCost}</div>
      <div className="flex justify-center">
        <button className="btn primary" onClick={goToCart}>
          go to cart
        </button>
      </div>
    </div>
  );
}
