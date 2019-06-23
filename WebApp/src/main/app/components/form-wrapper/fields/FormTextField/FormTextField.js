import {bool, func, object, oneOfType, string, number, element, array} from 'prop-types';
import React from 'react';
import {FormText} from '../../components/FormText/FormText';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';

export class FormTextField extends React.Component {
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
    maskType: string,
    disabled: bool,
    testId: string,
    testIdPlacement: string,
    isPassword: bool,
    hideError: bool,
    valueIsNumber: bool,
    label: oneOfType([string, element]),
    componentSize: string,
    saveTimeout: number,
    rightIcon: oneOfType([string, element]),
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
      maskType,
      disabled,
      testId,
      testIdPlacement,
      isPassword,
      hideError,
      valueIsNumber,
      label,
      componentSize,
      saveTimeout,
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
        <FormText className={className}
                  maskType={maskType}
                  placeholder={placeholder}
                  disabled={disabled}
                  testId={testId}
                  testIdPlacement={testIdPlacement}
                  isPassword={isPassword}
                  valueIsNumber={valueIsNumber}
                  hideError={hideError}
                  label={label}
                  componentSize={componentSize}
                  saveTimeout={saveTimeout}
                  rightIcon={rightIcon}
        />
      </AbstractFormField>
    );
  }
}
