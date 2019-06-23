import {array, bool, func, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {FormDictionarySelect} from '../../components/FormDictionarySelect/FormDictionarySelect';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';

export class FormDictionarySelectField extends React.Component {

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
    dictionaryMarker: string,
    clearable: bool,
    disabled: bool,
    filter: func,
    testId: string,
    testIdPlacement: string,
    hideError: bool,
    label: string,
    componentSize: string,
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
      dictionaryMarker,
      clearable,
      disabled,
      filter,
      testId,
      testIdPlacement,
      hideError,
      label,
      componentSize,
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
        <FormDictionarySelect className={className}
                              dictionaryMarker={dictionaryMarker}
                              clearable={clearable}
                              placeholder={placeholder}
                              disabled={disabled}
                              filter={filter}
                              testId={testId}
                              testIdPlacement={testIdPlacement}
                              hideError={hideError}
                              label={label}
                              componentSize={componentSize}
        />
      </AbstractFormField>
    );
  }

}
