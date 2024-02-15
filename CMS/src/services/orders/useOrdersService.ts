/*custom hook che espone le funzionalità da utilizzare nei componenti per fare operazioni sui ordini. 
    inoltre questo hook esporrà lo stato quindi sarà lui che utilizzerà il reducer ed esporrà i dispatch delle varie azioni
    il componente utilizzerà queste funzioni
*/

import { useReducer } from 'react';
import { OrderForm, OrderStatus } from '../../model/order-form';
import * as OrdersService from './orders.api';
import { ordersReducer, initialState } from './orders.reducer';

export function useOrdersService() {

  const [state, dispatch] = useReducer(ordersReducer, initialState);

  async function getOrders() {
    dispatch({ type: 'pending', payload: true })

    try {
      const res = await OrdersService.get();
      dispatch({ type: 'ordersGetSuccess', payload: res.items  })
    } catch(e) {
      dispatch({ type: 'error', payload: 'Orders not loaded'  })
    }
  }

  async function deleteOrder(id: string) {
    dispatch({ type: 'pending', payload: true })

    try {
      await OrdersService.remove(id);
      dispatch({ type: 'orderDeleteSuccess', payload: id  })
    } catch(e) {
      dispatch({ type: 'error', payload: 'Order not deleted'  })
    }
  }

  async function addOrder(order: OrderForm) {
    dispatch({ type: 'pending', payload: true })

    try {
      return await OrdersService.add(order);
    } catch(e) {
      dispatch({ type: 'error', payload: 'Order not added'  })
      return e;
    }
  }

  async function toggleOrderStatus (id: string, status: OrderStatus) {
    dispatch({ type: 'pending', payload: true })

    try {
      const res = await OrdersService.toggleStatus(id, status);
      dispatch({ type: 'orderToggleStatusSuccess', payload: res  })
    } catch(e) {
      dispatch({ type: 'error', payload: 'Order not deleted'  })
    }
  }

  return {
    actions:{
      getOrders,
      deleteOrder,
      addOrder,
      toggleOrderStatus,
    },
    state
  }
}