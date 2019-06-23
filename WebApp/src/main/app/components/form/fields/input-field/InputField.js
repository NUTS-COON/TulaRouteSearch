import React from 'react';
import {AbstractFormField} from '../../components/abstract-form-field/AbstractFormField';
import {element, func, string} from 'prop-types';
import {Input} from '../../../input/Input';
import classNames from 'classnames';

export class InputField extends React.Component {

  static propTypes = {
    label: string,
    helpText: element,
    value: string,
    onChange: func,
    placeholder : string,
    fieldName: string
  };

  render() {
    const {label, helpText, value, onChange, placeholder} = this.props;

    return (
      <AbstractFormField label={label}
                         helpText={helpText}>
        <Input value={value}
               onChange={onChange}
               placeholder={placeholder}
        />
      </AbstractFormField>
    );
  }

}
