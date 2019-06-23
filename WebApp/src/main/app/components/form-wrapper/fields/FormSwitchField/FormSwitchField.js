import {array, bool, func, number, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {FormSelect} from '../../components/FormSelect/FormSelect';
import {FormSwitch} from '../../components/FormSwitch/FormSwitch';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';

export class FormSwitchField extends React.Component {

  static propTypes = {
    className: string,
    fieldName: string,
    targetObject: object,
    onChange: func,
    onUpdate: func,
    onValidate: func,
    validate: oneOfType([func, object]),
    targetValidationResult: object,
    checkedValue: oneOfType([string, object, bool, number]),
    uncheckedValue: oneOfType([string, object, bool, number]),
    label: string,
    hideError: bool,
    testId: string,
    testIdPlacement: string,
    affectedValidationFields: array
  };

  render() {

    const {
      targetObject,
      fieldName,
      className,
      targetValidationResult,
      onChange,
      onUpdate,
      onValidate,
      validate,
      checkedValue,
      uncheckedValue,
      label,
      hideError,
      testId,
      testIdPlacement,
      affectedValidationFields
    } = this.props;

    return (
      <AbstractFormField targetObject={targetObject}
                         fieldName={fieldName}
                         onChange={onChange}
                         onUpdate={onUpdate}
                         targetValidationResult={targetValidationResult}
                         validate={validate}
                         affectedValidationFields={affectedValidationFields}
                         onValidate={onValidate}>
        <FormSwitch className={className}
                    checkedValue={checkedValue}
                    uncheckedValue={uncheckedValue}
                    label={label}
                    hideError={hideError}
                    testId={testId}
                    testIdPlacement={testIdPlacement}/>
      </AbstractFormField>
    );
  }

}
