import React from 'react';
import './block-text.scss';
import classNames from 'classnames';
import {any, string} from 'prop-types';

const BASE_CLASS_NAME = 'block-text';

BlockText.propTypes = {
  className: string,
  children: any
};

export function BlockText({className, children}) {

  return (
    <p className={classNames(BASE_CLASS_NAME, className)}>
      {children}
    </p>
  );

}
