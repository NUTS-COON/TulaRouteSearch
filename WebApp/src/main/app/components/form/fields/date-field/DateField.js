import React from 'react';
import {AbstractFormField} from '../../components/abstract-form-field/AbstractFormField';
import {element, func, string} from 'prop-types';
import {Input} from '../../../input/Input';
import {DateInput} from '../../../date-Input/DateInput';


export class DateField extends React.Component {

  static propTypes = {
    label: string,
    helpText: element,
    value: string,
    onChange: func,
    fieldName: string,
    placeholder: string
  };

  render() {

    const {label, helpText, value, onChange, placeholder} = this.props;

    return (
      <AbstractFormField label={label}
                         helpText={helpText}>
        <DateInput value={value}
                   onChange={onChange}
                   placeholder={placeholder}/>
      </AbstractFormField>
    );
  }

}

