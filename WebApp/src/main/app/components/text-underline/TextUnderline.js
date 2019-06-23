import React from 'react';
import './text-underline.scss';
import classNames from 'classnames';
import {string} from 'prop-types';

export const UnderlineColor = {
  PINK: 'pink',
  BLUE: 'blue'
};

export class TextUnderline extends React.Component {

  static propTypes = {
    className: string,
    underlineColor: string
  };

  static defaultProps = {
    underlineColor: UnderlineColor.PINK
  };

  render() {
    const {children, className, underlineColor} = this.props;

    return (
      <span className={classNames('text-underline', underlineColor === UnderlineColor.PINK ? 'text-underline_pink': 'text-underline_blue', className)}>
        {children}
      </span>
    );
  }

}
