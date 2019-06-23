import {array, bool, func, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {FormSelect} from '../../components/FormSelect/FormSelect';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';

export class FormSelectField extends React.Component {
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
    clearable: bool,
    options: array,
    saveOnlyValue: bool,
    testId: string,
    testIdPlacement: string,
    hideError: bool,
    disabled: bool,
    label: string,
    componentSize: string,
    searchable: bool,
    affectedValidationFields: array,
    noResultsText: string,
    labelKey: string,
    valueKey: string
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
      clearable,
      options,
      saveOnlyValue,
      testId,
      testIdPlacement,
      hideError,
      label,
      componentSize,
      disabled,
      searchable,
      affectedValidationFields,
      noResultsText,
      labelKey,
      valueKey
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
        <FormSelect className={className}
                    clearable={clearable}
                    placeholder={placeholder}
                    saveOnlyValue={saveOnlyValue}
                    options={options}
                    testId={testId}
                    testIdPlacement={testIdPlacement}
                    hideError={hideError}
                    componentSize={componentSize}
                    label={label}
                    disabled={disabled}
                    searchable={searchable}
                    noResultsText={noResultsText}
                    labelKey={labelKey}
                    valueKey={valueKey}
        />
      </AbstractFormField>
    );
  }
}
