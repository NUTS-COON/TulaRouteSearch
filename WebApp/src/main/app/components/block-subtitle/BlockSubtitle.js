import React from 'react';
import './block-subtitle.scss';
import classNames from 'classnames';
import {string, any} from 'prop-types';

BlockSubtitle.propTypes = {
  className: string,
  children: any
};

export function BlockSubtitle({className, children}) {

  return (
    <div className={classNames('block-subtitle', className)}>
      {children}
    </div>
  );

}
