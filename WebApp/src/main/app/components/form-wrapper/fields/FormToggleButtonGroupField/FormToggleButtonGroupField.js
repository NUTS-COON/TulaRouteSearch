import {array, bool, func, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {FormToggleButtonGroup} from '../../components/FormToggleButtonGroup/FormToggleButtonGroup';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';

export class FormToggleButtonGroupField extends React.Component {
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
    options: array,
    testId: string,
    testIdPlacement: string,
    componentSize: string,
    hideError: bool,
    disabled: bool,
    isMultipleChoose: bool,
    affectedValidationFields: array,
    buttonClassName: string
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
      options,
      testId,
      testIdPlacement,
      componentSize,
      hideError,
      disabled,
      isMultipleChoose,
      affectedValidationFields,
      buttonClassName
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
        <FormToggleButtonGroup className={className}
                               options={options}
                               placeholder={placeholder}
                               testId={testId}
                               testIdPlacement={testIdPlacement}
                               componentSize={componentSize}
                               hideError={hideError}
                               disabled={disabled}
                               isMultipleChoose={isMultipleChoose}
                               buttonClassName={buttonClassName}
        />
      </AbstractFormField>
    );
  }
}
