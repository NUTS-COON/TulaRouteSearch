import {bool, element, func, object, oneOfType, string, number, array} from 'prop-types';
import React from 'react';
import {FormInnPerson} from '../../components/FormInnPerson/FormInnPerson';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';

export class FormInnPersonField extends React.Component {

  static propTypes = {
    className: string,
    fieldName: string,
    targetObject: object,
    onChange: func,
    onUpdate: func,
    onValidate: func,
    validate: oneOfType([func, object]),
    targetValidationResult: object,
    id: oneOfType([number, string]),
    testId: string,
    testIdPlacement: string,
    placeholder: string,
    validator: object,
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
      onChange,
      onUpdate,
      onValidate,
      validate,
      id,
      testId,
      testIdPlacement,
      placeholder,
      validator,
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
        <FormInnPerson className={className}
                       id={id}
                       testId={testId}
                       testIdPlacement={testIdPlacement}
                       placeholder={placeholder}
                       person={targetObject}
                       validator={validator}
                       onValidate={onValidate}
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
