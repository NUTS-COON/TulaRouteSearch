import React from 'react';
import './universal-link.scss';
import classNames from 'classnames';
import {any, func, string, bool} from 'prop-types';
import startsWith from 'lodash/startsWith'
import {Link} from 'react-router-dom';

UniversalLink.propTypes = {
  className: string,
  href: string,
  children: any,
  target: string,
  onClick: func,
  noStyle: bool
};

UniversalLink.defaultProps = {
  onClick() {

  }
};

export function UniversalLink({className, children, href, target, onClick, noStyle}) {

  if (startsWith(href, 'http') || startsWith(href, '#')) {
    return (
      <a className={classNames('link', {'link_no-style' : noStyle}, className)}
         target={target}
         onClick={onClick}
         href={href}>
        {children}
      </a>
    );
  } else {
    return (
      <Link className={classNames('link', {'link_no-style' : noStyle}, className)}
            onClick={onClick}
            to={href}>
        {children}
      </Link>
    );
  }

}
