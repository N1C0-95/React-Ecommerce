import clsx from "clsx";

import { useCheckout } from "./hooks/useCheckout";
import { ServerError } from "../../shared";

export function CheckoutPage() {
  const { validators, actions, user, totalCost, dirty, error } = useCheckout();

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="title">Checkout</h1>
      {error && <ServerError message={error} />}

      <div className="text-xl border-b my-3">Contact Information</div>

      <form className="flex flex-col gap-2" onSubmit={actions.sendOrder}>
        Name
        <input
          type="text"
          name="name"
          placeholder="insert your name"
          value={user.name}
          onChange={actions.changeHandler}
          className={clsx(
            { error: !validators.isNameValid && dirty },
            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          )}
        />
        Email
        <input
          type="email"
          name="email"
          placeholder="insert your email"
          value={user.email}
          onChange={actions.changeHandler}
          className={clsx(
            { error: !validators.isNameValid && dirty },
            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          )}
        />
        <div className="mt-6 grow sm:mt-8">
          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-gray-900 dark:text-white">
              Total
            </dt>
            <dd className="text-base font-bold text-gray-900 dark:text-white">
              €{totalCost}
            </dd>
          </dl>

          <button
            type="submit"
            className={clsx("btn w-full", {
              primary: !validators.isValid,
              success: validators.isValid,
            })}
            disabled={!validators.isValid}
          >
            Confirm Order
          </button>

          <div className="mt-6 flex items-center justify-center gap-8">
            <img
              className="h-8 w-auto dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
              alt=""
            />
            <img
              className="hidden h-8 w-auto dark:flex"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
              alt=""
            />
            <img
              className="h-8 w-auto dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
              alt=""
            />
            <img
              className="hidden h-8 w-auto dark:flex"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
              alt=""
            />
            <img
              className="h-8 w-auto dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
              alt=""
            />
            <img
              className="hidden h-8 w-auto dark:flex"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}
