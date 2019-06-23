import {array, func, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {FormCheckbox} from '../../components/FormCheckbox/FormCheckbox';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';
import {FormBooleanToggleButtonGroup} from '../../components/FormBooleanToggleButtonGroup/FormBooleanToggleButtonGroup';

export class FormBooleanToggleButtonGroupField extends React.Component {

  static propTypes = {
    className: string,
    fieldName: string,
    targetObject: object,
    onChange: func,
    onUpdate: func,
    onValidate: func,
    validate: oneOfType([func, object]),
    targetValidationResult: object,
    options: array,
    testId: string,
    testIdPlacement: string,
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
      options,
      testId,
      testIdPlacement,
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
        <FormBooleanToggleButtonGroup className={className}
                                      options={options}
                                      testId={testId}
                                      testIdPlacement={testIdPlacement}/>
      </AbstractFormField>
    );
  }

}
