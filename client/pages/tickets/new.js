import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const initialState = {
  title: '',
  price: '',
};
const NewTicket = () => {
  const [ticket, setTicket] = useState(initialState);
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: ticket,
    onSuccess: () => Router.push('/'),
  });

  const onBlur = () => {
    const value = parseFloat(ticket.price);

    if (isNaN(value)) {
      return;
    }

    setTicket({ ...ticket, price: value.toFixed(2) });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTicket({ ...ticket, [name]: value });
    console.log(ticket);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <div>
      <h1>Create a ticket</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            onChange={handleChange}
            className='form-control'
            id='title'
            placeholder='Enter title'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='price'>Price</label>
          <input
            onBlur={onBlur}
            name='price'
            onChange={handleChange}
            className='form-control'
            id='price'
            placeholder='Enter price'
          />
        </div>
        <button className='btn btn-primary'>Create Ticket</button>
      </form>
      {errors}
    </div>
  );
};

export default NewTicket;
