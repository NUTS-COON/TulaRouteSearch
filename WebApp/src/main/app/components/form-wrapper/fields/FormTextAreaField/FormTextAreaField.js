import {func, object, oneOfType, string, number, bool, array} from 'prop-types';
import React from 'react';
import {FormSwitch} from '../../components/FormSwitch/FormSwitch';
import {FormTextArea} from '../../components/FormTextArea/FormTextArea';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';

export class FormTextAreaField extends React.Component {
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
    rows: oneOfType([string, number]),
    testId: string,
    testIdPlacement: string,
    hideError: bool,
    label: string,
    componentSize: string,
    expandable: bool,
    disabled: bool,
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
      rows,
      testId,
      testIdPlacement,
      hideError,
      label,
      componentSize,
      expandable,
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
        <FormTextArea className={className}
                      placeholder={placeholder}
                      rows={rows}
                      testId={testId}
                      testIdPlacement={testIdPlacement}
                      hideError={hideError}
                      label={label}
                      componentSize={componentSize}
                      expandable={expandable}
                      disabled={disabled}
        />
      </AbstractFormField>
    );
  }
}
