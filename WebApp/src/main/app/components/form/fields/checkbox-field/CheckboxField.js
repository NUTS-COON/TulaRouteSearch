import React from 'react';
import {AbstractFormField} from '../../components/abstract-form-field/AbstractFormField';
import {element, func, string, array, number} from 'prop-types';
import {Input} from '../../../input/Input';
import {Checkbox} from './Checkbox';
import classNames from 'classnames';

export class CheckboxField extends React.Component {

  static propTypes = {
    label: string,
    helpText: element,
    value: array,
    onChange: func,
    fieldName: string,
    buttons: array,
    defaultCheckedIndex : number
  };
  updateSelectedState(name, selected) {
    if(name){
      const { onChange, buttons} = this.props;
      
      var found = buttons.find(function(el, i) {
        return el.name == name;
      });
      found.selected = selected;
      onChange(buttons);
    }
  }

  render() {
    const {label, helpText, value, fieldName, buttons, defaultCheckedIndex, onChange} = this.props;
    let context = this;
    let radioButtons = buttons.map(function(btn, i){
      return  <Checkbox label={btn.label} key={btn.name} id={btn.name} name={fieldName} checked={btn.selected} onChange={context.updateSelectedState.bind(context)}  />
    });

    return (
      <AbstractFormField label={label}
                         helpText={helpText}>
        <div className={"checkboxes-container"} >
          {radioButtons}
        </div>


      </AbstractFormField>
    );
  }
}