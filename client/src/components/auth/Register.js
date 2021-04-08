import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

const Register = ({ registerUser, auth }) => {
  const [users, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  });

  const { name, email, password, password2, errors } = users;

  const onChange = (e) =>
    setUser({ ...users, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      password2
    };

    registerUser(newUser);

    // axios
    //   .post('/api/users/register', newUser)
    //   .then((res) => console.log(res.data))
    //   .catch((err) =>
    //     setUser({ name, email, password, password2, errors: err.response.data })
    //   );
  };

  const { user } = auth;

  return (
    <div className='register'>
      {user ? user.name : null}
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Sign Up</h1>
            <p className='lead text-center'>Create your DevConnector account</p>
            <form noValidate onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='text'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.name
                  })}
                  placeholder='Name'
                  name='name'
                  value={name}
                  onChange={onChange}
                />
                {errors.name && (
                  <div className='invalid-feedback'>{errors.name}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.email
                  })}
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={onChange}
                />
                {errors.email && (
                  <div className='invalid-feedback'>{errors.email}</div>
                )}
                <small className='form-text text-muted'>
                  This site uses Gravatar so if you want a profile image, use a
                  Gravatar email
                </small>
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password
                  })}
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={onChange}
                />
                {errors.password && (
                  <div className='invalid-feedback'>{errors.password}</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.password2
                  })}
                  placeholder='Confirm Password'
                  name='password2'
                  value={password2}
                  onChange={onChange}
                />
                {errors.password2 && (
                  <div className='invalid-feedback'>{errors.password2}</div>
                )}
              </div>
              <input type='submit' className='btn btn-info btn-block mt-4' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(Register);
