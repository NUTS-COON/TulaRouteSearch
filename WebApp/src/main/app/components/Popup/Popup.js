import React from 'react';
import './popup.scss';
import classNames from 'classnames';
import {bool} from 'prop-types';

export class Popup extends React.Component {

  static propTypes = {
    shown: bool
  };

  render() {
    const {children, shown} = this.props;

    if (!shown) {
      return null;
    }

    return (
      <div className="popup">
        {children}
      </div>
    );

  }

}
