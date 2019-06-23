import React from 'react';
import {string, any} from 'prop-types';
import classNames from 'classnames';
import './screen-title.scss';

SectionTitle.propTypes = {
  className: string,
  children: any,
  id: string
};

export function SectionTitle({className, children, id}) {

  return (
    <h3 className={classNames('section-title', className)}>
      {children}
    </h3>
  );
}
