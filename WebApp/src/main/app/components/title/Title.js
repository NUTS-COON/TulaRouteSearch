import React from 'react';
import './title.scss';
import classNames from 'classnames';
import {any, string} from 'prop-types';

const BASE_CLASS_NAME = 'title';

Title.propTypes = {
  className: string,
  children: any,
};

export function Title({children, className}) {

  return (
    <h1 className={classNames(BASE_CLASS_NAME, className)}>
      {children}
    </h1>
  );

}
