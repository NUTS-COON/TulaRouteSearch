import React from 'react';
import {element, func, object, oneOfType, string, bool, array} from 'prop-types';
import {getField} from '../../../../models/BaseModel';
import {DEFAULT_VALIDATION_RESULT} from '../../../../models/ValidationResult';

export class AbstractFormWrapperField extends React.Component {

  static propTypes = {
    fieldName: string,
    targetObject: object,
    onChange: func,
    onUpdate: func,
    onValidate: func,
    targetValidationResult: object,
    children: element,
    validator: object,
    disabled: bool
  };

  handleChange = value => {
    const {fieldName, onChange} = this.props;
    onChange(fieldName, value);
  };

  handleUpdate = value => {
    const {onUpdate, fieldName} = this.props;
    onUpdate(fieldName, value);
  };

  handleValidate = (fieldValidationResult) => {
    const {onValidate, fieldName} = this.props;
    onValidate(fieldName, fieldValidationResult);
  };

  render() {

    const {children, targetObject, fieldName, targetValidationResult, disabled} = this.props;

    return React.cloneElement(children, {
      value: targetObject::getField(fieldName),
      validationResult: targetValidationResult::getField(fieldName) || DEFAULT_VALIDATION_RESULT,
      onChange: this.handleChange,
      onUpdate: this.handleUpdate,
      onValidate: this.handleValidate,
      disabled
    })
  }

}
