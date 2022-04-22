import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const initialState = {
  email: '',
  password: '',
};

const SignUp = () => {
  const [user, setUser] = useState(initialState);
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: user,
    onSuccess: () => Router.push('/'),
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await doRequest();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign In</h1>
      <div className='form-group'>
        <label>Email address</label>
        <input name='email' onChange={handleChange} className='form-control' />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          name='password'
          type='password'
          onChange={handleChange}
          className='form-control'
        />
      </div>
      {errors}
      <button className='btn btn-primary'>Sign In </button>
    </form>
  );
};

export default SignUp;
