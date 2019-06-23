import {array, bool, func, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {FormPassportSubdivision} from '../../components/FormPassportSubdivision/FormPassportSubdivision';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';

export class FormPassportSubdivisionField extends React.Component {
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
    placeholder: string,
    hideError: bool,
    label: string,
    componentSize: string,
    onCodeSelected: func,
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
      placeholder,
      hideError,
      label,
      componentSize,
      onCodeSelected,
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
        <FormPassportSubdivision className={className}
                                 id={id}
                                 testId={testId}
                                 testIdPlacement={testIdPlacement}
                                 placeholder={placeholder}
                                 hideError={hideError}
                                 label={label}
                                 componentSize={componentSize}
                                 disabled={disabled}
                                 onCodeSelected={onCodeSelected}
        />
      </AbstractFormField>
    );
  }
}
