import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";

import {
  selectCartList,
  selectTotalCartCost,
  useCart,
} from "../../../services/cart";

import { OrderForm } from "../../../model/order-form";
import { useOrdersService } from "../../../services/orders";
import { ClientResponseError } from "pocketbase";


const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface WebhookRequest {
  name: string;
  mail: string;
}
export function useCheckout() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "" });
  const [dirty, setDirty] = useState(false);
  const totalCost = useCart(selectTotalCartCost);
  const order = useCart(selectCartList);
  const clearCart = useCart((state) => state.clearCart);
  const { actions, state } = useOrdersService();

  const azureAppServiceBasePath = "https://customconnector-demo-h3cxhdfufkb2bugx.eastus-01.azurewebsites.net"

  async function sendOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const orderInfo: OrderForm = {
      user,
      order,
      status: "pending",
      total: totalCost,
    };

    const data: string = JSON.stringify({
      name: orderInfo.user.name,
      mail: orderInfo.user.email,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: data,
    };

    const resp = await fetch(`${azureAppServiceBasePath}/order`, requestOptions);
    console.log(resp.status)
    if(!(resp instanceof ClientResponseError)){
      clearCart();
      navigate('/thanks')
    }
    
  }
  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    const propName = event.currentTarget.name;

    const value = event.currentTarget.value;
    setDirty(true);
    setUser((state) => ({ ...state, [propName]: value }));
  }

  const isNameValid = user.name.length;
  const isEmailValid = user.email.match(EMAIL_REGEX);
  const isValid = isNameValid && isEmailValid;

  return {
    validators: {
      isNameValid,
      isEmailValid,
      isValid,
    },
    actions: {
      sendOrder,
      changeHandler,
    },
    user,
    totalCost,
    dirty,
    error: state.error,
  };
}
