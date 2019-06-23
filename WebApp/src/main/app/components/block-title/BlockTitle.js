import React from 'react';
import './block-title.scss';
import classNames from 'classnames';
import {any, string} from 'prop-types';

const BASE_CLASS_NAME = 'block-title';

BlockTitle.propTypes = {
  className: string,
  children: any
};

export function BlockTitle({className, children}) {

  return (
    <div className={classNames(BASE_CLASS_NAME, className)}>
      {children}
    </div>

  );

}
