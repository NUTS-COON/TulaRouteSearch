import React from 'react';
import {string} from 'prop-types';
import classNames from 'classnames';
import './medium-text.scss';

export class MediumText extends React.Component {

  static propTypes = {
    className: string
  };

  render() {

    const {children, className} = this.props;

    return (
      <span className={classNames('medium-text', className)}>
        {children}
      </span>
    );
  }

}
