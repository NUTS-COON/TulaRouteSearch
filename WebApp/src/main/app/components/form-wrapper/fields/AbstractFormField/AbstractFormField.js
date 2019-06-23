import React from 'react';
import {array, element, func, object, string} from 'prop-types';
import {getField} from '../../../../models/BaseModel';
import {getValidationResultConsiderChildren} from '../../../../models/ValidationResult';

export class AbstractFormField extends React.Component {

  static propTypes = {
    fieldName: string,
    targetObject: object,
    onChange: func,
    onUpdate: func,
    targetValidationResult: object,
    children: element,
    affectedValidationFields: array
  };

  state = {
    value: this.props.targetObject::getField(this.props.fieldName)
  };

  componentWillReceiveProps(nextProps, prevState) {
    const {targetObject, fieldName} = nextProps;
    this.setState(() => ({
      value: targetObject::getField(fieldName)
    }));
  };

  handleChange = value => {
    this.setState({value});
  };

  handleUpdate = value => {
    const {onUpdate, fieldName, onChange, affectedValidationFields} = this.props;
    onChange(fieldName, value);
    onUpdate(fieldName, value, affectedValidationFields);
  };


  render() {

    const {children, fieldName, targetValidationResult} = this.props;
    const {value} = this.state;

    return React.cloneElement(children, {
      value: value,
      validationResult: targetValidationResult::getField(fieldName)::getValidationResultConsiderChildren(),
      onChange: this.handleChange,
      onUpdate: this.handleUpdate
    })
  }

}
