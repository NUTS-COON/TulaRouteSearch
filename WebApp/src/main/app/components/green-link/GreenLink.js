import React from 'react';
import './green-link.scss';
import classNames from 'classnames';
import {string} from 'prop-types';

export class GreenLink extends React.Component {

  static propTypes = {
    href: string,
    className: string,
    target: string
  };

  render() {
    const {className, href, target, children} = this.props;
    return (
      <a className={classNames('green-link', className)}
         href={href}
         target={target}>
        {children}
      </a>
    );
  }

}
