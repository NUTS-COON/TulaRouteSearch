import {array, bool, func, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {FormAddress} from '../../components/FormAddress/FormAddress';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';

export class FormAddressField extends React.Component {
  static propTypes = {
    className: string,
    fieldName: string,
    targetObject: object,
    onChange: func,
    onUpdate: func,
    onValidate: func,
    validate: oneOfType([func, object]),
    targetValidationResult: object,
    id: string,
    testId: string,
    testIdPlacement: string,
    hideError: bool,
    label: string,
    componentSize: string,
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
      id,
      testId,
      testIdPlacement,
      hideError,
      label,
      componentSize,
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
        <FormAddress className={className}
                     id={id}
                     testId={testId}
                     testIdPlacement={testIdPlacement}
                     hideError={hideError}
                     label={label}
                     componentSize={componentSize}
                     disabled={disabled}
        />
      </AbstractFormField>
    );
  }
}
