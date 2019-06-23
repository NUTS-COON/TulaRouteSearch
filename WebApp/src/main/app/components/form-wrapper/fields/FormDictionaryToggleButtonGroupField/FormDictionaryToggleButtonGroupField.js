import {array, func, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {FormToggleButtonGroup} from '../../components/FormToggleButtonGroup/FormToggleButtonGroup';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';
import {FormDictionaryToggleButtonGroup} from '../../components/FormDictionaryToggleButtonGroup/FormDictionaryToggleButtonGroup';

export class FormDictionaryToggleButtonGroupField extends React.Component {

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
        <FormDictionaryToggleButtonGroup className={className}
                                         dictionaryMarker={dictionaryMarker}
                                         placeholder={placeholder}/>
      </AbstractFormField>
    );
  }

}
