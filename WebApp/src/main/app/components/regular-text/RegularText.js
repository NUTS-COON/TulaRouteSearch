import React from 'react';
import {string} from 'prop-types';
import classNames from 'classnames';
import './regular-text.scss';

export class RegularText extends React.Component {

  static propTypes = {
    className: string
  };

  render() {

    const {children, className} = this.props;

    return (
      <span className={classNames('regular-text', className)}>
        {children}
      </span>
    );
  }

}
