import clsx from "clsx";

import { useCheckout } from "./hooks/useCheckout";
import { ServerError } from "../../shared";

export function CheckoutPage() {
  
  const {
    validators,
    actions, 
    user, totalCost, dirty, error} =  useCheckout();
  
  return (
    <div className="max-w-sm mx-auto">
      <h1 className="title">Checkout</h1>
      { error && <ServerError message={error} /> }
      <div className="text-xl border-b my-3">Total Cost: {totalCost} €</div>

      <form className="flex flex-col gap-2" onSubmit={actions.sendOrder}>
        Name
        <input
          type="text"
          name="name"
          placeholder="insert your name"
          value={user.name}
          onChange={actions.changeHandler}
          className={clsx({ error: !validators.isNameValid && dirty })}
        />
        Email
        <input
          type="email"
          name="email"
          placeholder="insert your email"
          value={user.email}
          onChange={actions.changeHandler}
          className={clsx({ error: !validators.isEmailValid && dirty })}
        />
        <button type="submit" 
          className={clsx('btn',{primary:!validators.isValid,success:validators.isValid})} 
          disabled={!validators.isValid}
          
        >
          CONFIRM ORDER
        </button>
        
      </form>
      
      
    </div>
  );
}
