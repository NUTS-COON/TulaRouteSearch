import React from 'react';
import './subtitle.scss';
import classNames from 'classnames';
import {any, string} from 'prop-types';

const BASE_CLASS_NAME = 'subtitle';

Subtitle.propTypes = {
  className: string,
  children: any
};

export function Subtitle({children, className}) {
  return (
    <h2 className={classNames(BASE_CLASS_NAME, className)}>
      {children}
    </h2>
  );

}
