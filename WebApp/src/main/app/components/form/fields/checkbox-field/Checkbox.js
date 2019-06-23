import React from 'react';
import {func, string, bool} from 'prop-types';
import classNames from 'classnames';
import './checkbox.scss';
import PropTypes from 'prop-types';

export class Checkbox extends React.Component {

  static propTypes = {
    className: string,
    value: string,
    name: string,
    label: string,
    id: string,
    onChange: func,
    checked: bool
  };

  handleChange = (event) => {
    const {onChange} = this.props;
    onChange(event.target.id, event.target.checked);
  };

  render() {
    const {className, label, name,  id, value, checked} = this.props;

    return (
      <div className='checkbox-item'>
        <input type="checkbox"
               onChange={this.handleChange}
               className={classNames('checkbox-item__input',  className)}
               id={id}
               name={name}
               value={value}
               defaultChecked={checked} />
        <label htmlFor={id} className={classNames('checkbox-item__label',  className)}>{label}</label>
      </div>
    );
  }
}