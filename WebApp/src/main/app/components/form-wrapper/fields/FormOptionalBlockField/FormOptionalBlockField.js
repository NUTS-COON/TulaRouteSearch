import {array, bool, func, number, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';
import {FormOptionalBlock} from '../../components/FormOptionalBlock/FormOptionalBlock';

export class FormOptionalBlockField extends React.Component {

  static propTypes = {
    className: string,
    fieldName: string,
    targetObject: object,
    onChange: func,
    onUpdate: func,
    onValidate: func,
    validate: oneOfType([func, object]),
    targetValidationResult: object,
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
      checkedValue,
      uncheckedValue,
      label,
      hideError,
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
        <FormOptionalBlock className={className}
                           checkedValue={checkedValue}
                           uncheckedValue={uncheckedValue}
                           label={label}
                           hideError={hideError}/>
      </AbstractFormField>
    );
  }

}
