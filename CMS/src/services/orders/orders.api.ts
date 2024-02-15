/*
    in questo file inseriamo tutti i riferimenti all sdk di pocketbase
*/
import { Order } from '../../model/order';
import { OrderForm, OrderStatus } from '../../model/order-form';
import { pb } from '../../pocketbase';

export async function get() {
  return  pb.collection('orders').getList<Order>();
}

export async function remove(id: string) {
  return pb.collection('orders').delete(id)
}

export async function add(order: OrderForm) {
    //orderForm è l'oggetto che passiamo al checkout
  return pb.collection('orders').create<Order>(order);
}

export async function toggleStatus(id: string, status: OrderStatus){
    //per aggiornare lo status da pending a done
  return pb.collection('orders').update<Order>(id, { status })
}