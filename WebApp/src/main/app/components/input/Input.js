import React from 'react';
import classNames from 'classnames';
import './input.scss';
import {string, func} from 'prop-types';

export class Input extends React.Component {

  static propTypes = {
    className: string,
    value: string,
    onChange: func,
    placeholder: string,
    inputType :string,
    dataInputmask: string
  };

  static defaultProps = {
    onChange(){
    }
  };

  handleChange = (event) => {
    const {onChange} = this.props;
    onChange(event.target.value);
  };

  render() {
    const {className, value, placeholder, inputType, dataInputmask} = this.props;

    return (
      <input className={classNames('input',  className)}
             value={value || ''}
             type={inputType || ''}
             data-inputmask = {dataInputmask || ''}
             onChange={this.handleChange}
             placeholder={placeholder}/>
    );
  }

}
