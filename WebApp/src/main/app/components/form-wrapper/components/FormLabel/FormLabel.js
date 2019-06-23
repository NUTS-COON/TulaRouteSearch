import classNames from 'classnames';
import {any, bool, string} from 'prop-types';
import React from 'react';

export class FormLabel extends React.Component {

  static propTypes = {
    short: bool,
    children: any,
    className: string
  };

  render() {
    const {children, short, className} = this.props;

    return (
      <label className={classNames('form-wrapper__form-label', {'form-wrapper__form-label_short': short}, className)}>
        {children}
      </label>
    );
  }
}
