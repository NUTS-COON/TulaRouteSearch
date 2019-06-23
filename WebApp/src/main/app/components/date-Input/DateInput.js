import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {string, func} from 'prop-types';
import MaskedInput from 'react-text-mask'

export class DateInput extends React.Component {

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

    //https://www.npmjs.com/package/react-text-mask
    return (
      <MaskedInput
        mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '.',, 'г']}
        className="input"
        onChange={this.handleChange}
        placeholder="dd.mm.yyyy."
        guide={false}
        value={value}
        id="my-input-id"
      />
    );
  }
}