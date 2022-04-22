import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      const timeLeft = Math.round(msLeft / 1000);
      setTimeLeft(timeLeft);
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      {timeLeft > 60
        ? `${parseFloat(timeLeft / 60).toFixed(0)} minutes`
        : `${timeLeft} seconds`}{' '}
      {''}
      left until order expires.
      <StripeCheckout
        token={(token) => doRequest({ token: token.id })}
        stripeKey='pk_test_51KJi83CwQ0Q9Bapb0rMZJxDqbqHZqaZc2QqhtaPmEvrofW5VHgSDTF5H1UySUsp1Ymls7ubDawo8hrQQbSMYbNJQ00x4tuLSkz'
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;

  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
