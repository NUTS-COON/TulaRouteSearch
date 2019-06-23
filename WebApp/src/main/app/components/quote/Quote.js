import React from 'react';
import {string} from 'prop-types';
import classNames from 'classnames';
import './quote.scss';

export class Quote extends React.Component {

  static propTypes = {
    className: string,
    cite: string
  };

  render() {
    const {cite, className, children} = this.props;
    return (
      <blockquote cite={cite}
                  className={classNames('quote', className)}>
        {children}
      </blockquote>
    );    
  }

}
