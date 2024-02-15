//ci permette di definire tutte le azioni che possiamo dispatchare da componente o custom hooks

import { Order } from "../../model/order";

export type OrdersGetSuccess = { type: 'ordersGetSuccess', payload: Order[] }; // verrà invocata dopo la chiamata get che sarà poi gestita dal reducer per salvarli nello stato
export type OrderDeleteSuccess = { type: 'orderDeleteSuccess', payload: string };
export type OrderReset = { type: 'orderReset' };
export type OrderToggleStatusSuccess = { type: 'orderToggleStatusSuccess', payload: Order };
export type Error  = { type: 'error', payload: string };
export type Pending  = { type: 'pending', payload: boolean };

export type OrdersActions =
  OrdersGetSuccess |
  OrderDeleteSuccess |
  OrderReset |
  OrderToggleStatusSuccess |
  Error |
  Pending;