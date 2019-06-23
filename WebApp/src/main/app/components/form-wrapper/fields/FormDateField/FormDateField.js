import {bool, element, func, object, oneOfType, string, array} from 'prop-types';
import React from 'react';
import {FormDate} from '../../components/FormDate/FormDate';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';

export class FormDateField extends React.Component {
  static propTypes = {
    className: string,
    fieldName: string,
    targetObject: object,
    onChange: func,
    onUpdate: func,
    onValidate: func,
    validate: oneOfType([func, object]),
    targetValidationResult: object,
    placeholder: string,
    testId: string,
    testIdPlacement: string,
    closeOnSelect: bool,
    hideError: bool,
    label: string,
    componentSize: string,
    disabled: bool,
    rightIcon: element,
    affectedValidationFields: array
  };

  render() {
    const {
      targetObject,
      fieldName,
      className,
      targetValidationResult,
      placeholder,
      onChange,
      onUpdate,
      onValidate,
      validate,
      testId,
      testIdPlacement,
      closeOnSelect,
      hideError,
      label,
      componentSize,
      disabled,
      rightIcon,
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
        <FormDate className={className}
                  placeholder={placeholder}
                  testId={testId}
                  testIdPlacement={testIdPlacement}
                  closeOnSelect={closeOnSelect}
                  hideError={hideError}
                  label={label}
                  componentSize={componentSize}
                  disabled={disabled}
                  rightIcon={rightIcon}
        />
      </AbstractFormField>
    );
  }
}
