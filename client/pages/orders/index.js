import Link from 'next/link';

const OrderIndex = ({ orders }) => {
  const orderList = orders.map((order) => (
    <tr key={order.id}>
      <td>{order.ticket.title}</td>
      <td>{order.status}</td>
      {order.status !== 'complete' ? (
        <td>
          <Link href='/orders/[orderId]' as={`/orders/${order.id}`}>
            <button className='btn btn-primary'>
              <a>Buy Now</a>
            </button>
          </Link>
        </td>
      ) : (
        <td>None</td>
      )}
    </tr>
  ));

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{orderList}</tbody>
      </table>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');
  return { orders: data };
};

export default OrderIndex;
