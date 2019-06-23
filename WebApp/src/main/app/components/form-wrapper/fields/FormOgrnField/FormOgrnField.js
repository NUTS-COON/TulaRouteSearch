import {array, bool, func, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {FormText} from '../../components/FormText/FormText';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';
import {FormOgrn} from '../../components/FormOgrn/FormOgrn';

export class FormOgrnField extends React.Component {

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
    disabled: bool,
    testId: string,
    testIdPlacement: string,
    onFillOrganizationClick: func,
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
      disabled,
      testId,
      testIdPlacement,
      onFillOrganizationClick,
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
        <FormOgrn className={className}
                  placeholder={placeholder}
                  disabled={disabled}
                  testId={testId}
                  testIdPlacement={testIdPlacement}
                  onFillOrganizationClick={onFillOrganizationClick}/>
      </AbstractFormField>
    );
  }

}
