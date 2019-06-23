import {array, bool, func, number, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {FormFilePicker} from '../../components/FormFilePicker/FormFilePicker';
import {AbstractFormField} from '../AbstractFormField/AbstractFormField';

export class FormFilePickerField extends React.Component {

  static propTypes = {
    className: string,
    fieldName: string,
    targetObject: object,
    onChange: func,
    onUpdate: func,
    onValidate: func,
    validate: oneOfType([func, object]),
    targetValidationResult: object,
    placeholder: oneOfType([func, object]),
    testId: string,
    testIdPlacement: string,
    allowTypes: string,
    showImg: bool,
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
      testId,
      testIdPlacement,
      allowTypes,
      showImg,
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
        <FormFilePicker className={className}
                        placeholder={placeholder}
                        testId={testId}
                        testIdPlacement={testIdPlacement}
                        allowTypes={allowTypes}
                        showImg={showImg}/>
      </AbstractFormField>
    );
  }

}
