import React, { useState } from 'react';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    erorrs: {}
  });

  const { email, password, errors } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password
    };

    console.log(newUser);
  };

  return (
    <div className='login'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Log In</h1>
            <p className='lead text-center'>
              Sign in to your DevConnector account
            </p>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control form-control-lg'
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className='form-control form-control-lg'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={onChange}
                />
              </div>
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
