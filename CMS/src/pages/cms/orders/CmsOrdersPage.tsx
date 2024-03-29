import { useEffect } from 'react';
import { pb } from '../../../pocketbase';
import { Order } from '../../../model/order';
import { useOrdersService } from '../../../services/orders';
import { ServerError, Spinner } from '../../../shared';

export function CmsOrdersPage() {
  
const {actions, state} = useOrdersService();

    useEffect(() => {
    actions.getOrders();
  }, []);

  async function getAll() {
    const res = await pb.collection('orders').getList<Order>()
    
    console.log(res)

  }

  return (
    <div>
      { state.pending && <Spinner /> }
      { state.error && <ServerError message={state.error} /> }

        <div className='title'>Orders</div>
      <table className="border-collapse table-auto w-full my-12">
        <thead>
          <tr>
            <th className="text-left">CLIENT / DATE</th>
            <th className="text-left">ORDER INFO</th>
            <th className="text-center">ACTIONS</th>
          </tr>
        </thead>

        <tbody>
        {
          state.orders.map(item => {
            return (
              <tr className="h-24" key={item.id}>
                <td>
                  <div className="text-xl font-bold">{item.user.name}</div>
                  <div>{new Date(item.created).toDateString()}</div>
                </td>
                <td className="text-left">
                  <div>Total: € {item.total}</div>
                  <div>{item.order.length} products</div>
                </td>
                <td className="text-center">
                  {
                    item.status === 'pending' &&
                      <button className="btn primary" onClick={() => actions.toggleOrderStatus(item.id, 'done')}>
                        Mark as Done
                      </button>
                  }
                  <button className="btn danger" onClick={() => actions.deleteOrder(item.id)}>
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
  }