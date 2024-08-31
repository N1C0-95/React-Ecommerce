import { NavLink } from "react-router-dom";
import {
  selectCartIsEmpty,
  selectCartList,
  selectTotalCartCost,
  useCart,
} from "../../services/cart";
import emptyCartSvg from "../../assets/empty_cart.svg";

export function CartPage() {
  const list = useCart(selectCartList);
  const totalCost = useCart(selectTotalCartCost);
  const increaseQty = useCart((state) => state.increseQuantity);
  const decreseQty = useCart((state) => state.decreseQuantity);
  const isCartEmpty = useCart(selectCartIsEmpty)
  
  

  return (
    <>
      <h1 className="title">Cart</h1>
      {isCartEmpty ? (
        <div className="flex justify-center items-center flex-col space-y-10 mt-10">
          <div className="font-bold text-3xl">It's a bit empty here</div>    
          <img
              className="h-52 w-full object-contain"
              src={emptyCartSvg}
              alt=""
            />      
        </div>
      ) : (
        <div>
          <div>
            <ul>
              {list.map((item) => {
                return (
                  <li
                    key={item.product.id}
                    className="flex justify-between text-center "
                  >
                    <div className="flex items-center text-center gap-2.5">
                      <img
                        className="w-52 h-52 mt-5 rounded-xl"
                        src={item.product.img}
                        alt=""
                      />

                      <div className="font-bold text-3xl">
                        {item.product.name}
                      </div>
                    </div>
                    <div className="flex items-center text-center gap-2.5">
                      <button
                        className="btn primary"
                        onClick={() => increaseQty(item.product.id)}
                      >
                        +
                      </button>
                      {item.quantity}
                      <button
                        className="btn primary"
                        onClick={() => decreseQty(item.product.id)}
                      >
                        -
                      </button>
                      <p className="w-5">{item.quantity * item.product.cost}€</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col border-t-2 mt-2">
            <p className="text-right font-bold text-3xl m-5">Total: {totalCost}€</p>
          </div>
          <div className="flex justify-center">
            <NavLink to="/checkout" className="btn primary lg"> Confirm order</NavLink>
          </div>
        </div>
      )}
    </>
  );
}
