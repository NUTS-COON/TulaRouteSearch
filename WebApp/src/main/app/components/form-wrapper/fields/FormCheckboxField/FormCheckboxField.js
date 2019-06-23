import {array, bool, element, func, number, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {FormCheckbox} from '../../components/FormCheckbox/FormCheckbox';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';

export class FormCheckboxField extends React.Component {

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
    label: oneOfType([string, element]),
    hideError: bool,
    testId: string,
    testIdPlacement: string,
    isRadio: bool,
    disabled: bool,
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
      isRadio,
      disabled,
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
        <FormCheckbox className={className}
                      checkedValue={checkedValue}
                      uncheckedValue={uncheckedValue}
                      label={label}
                      hideError={hideError}
                      testId={testId}
                      testIdPlacement={testIdPlacement}
                      isRadio={isRadio}
                      disabled={disabled}
        />
      </AbstractFormField>
    );
  }

}
