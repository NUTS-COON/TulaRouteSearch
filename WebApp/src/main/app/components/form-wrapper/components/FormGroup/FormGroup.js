import {any} from 'prop-types';
import React, {Component} from 'react';

export class FormGroup extends Component {
  static propTypes = {
    children: any
  };

  render() {
    const {children} = this.props;
    return (
      <div className="form-group-container">
        {children}
      </div>
    );
  }
}

