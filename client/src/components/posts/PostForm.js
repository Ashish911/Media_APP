import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      errors: {}
    };
  }
  render() {
    return (
      <div className='post-form mb-3'>
        <div className='card card-info'></div>
      </div>
    );
  }
}

export default PostForm;
