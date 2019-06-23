import React from 'react';
import {AbstractFormField} from '../../components/abstract-form-field/AbstractFormField';
import {element, func, string, array, number} from 'prop-types';
import {Input} from '../../../input/Input';
import {RadioButton} from './RadioButton';
import classNames from 'classnames';

export class RadioButtonField extends React.Component {

  static propTypes = {
    label: string,
    helpText: element,
    value: string,
    onChange: func,
    fieldName: string,
    buttonNames: array,
    defaultCheckedIndex : number
  };

  render() {
    const {label, helpText, value, fieldName, buttonNames, defaultCheckedIndex, onChange} = this.props;

    let radioButtons = buttonNames.map(function(button, i){
      return  <RadioButton label={button.label} key={button.name} id={fieldName +'_'+ button.name} name={fieldName} checked={i==defaultCheckedIndex} onChange={onChange}  />
    });

    return (
      <AbstractFormField label={label}
                         helpText={helpText}>
        <div className={"radio-buttons-container"} >
          {radioButtons}
        </div>


      </AbstractFormField>
    );
  }
}


