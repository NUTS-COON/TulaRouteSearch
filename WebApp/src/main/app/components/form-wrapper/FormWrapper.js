import includes from 'lodash/includes';
import isFunction from 'lodash/isFunction';
import {bool, func, object, oneOfType} from 'prop-types';
import React from 'react';
import {getField, setField} from '../../models/BaseModel';
import {validateModelField} from '../../validators/validator';
import {FormLabel} from './components/FormLabel/FormLabel';
import {AbstractFormField} from './fields/AbstractFormField/AbstractFormField';
import {AbstractFormWrapperField} from './fields/AbstractFormWrapperFIeld/AbstractFormWrapperField';
import {FormAddressField} from './fields/FormAddressField/FormAddressField';
import {FormBooleanToggleButtonGroupField} from './fields/FormBooleanToggleButtonGroupField/FormBooleanToggleButtonGroupField';
import {FormCheckboxField} from './fields/FormCheckboxField/FormCheckboxField';
import {FormDateField} from './fields/FormDateField/FormDateField';
import {FormDictionarySelectField} from './fields/FormDictionarySelectField/FormDictionarySelectField';
import {FormDictionaryToggleButtonGroupField} from './fields/FormDictionaryToggleButtonGroupField/FormDictionaryToggleButtonGroupField';
import {FormFilePickerField} from './fields/FormFilePickerField/FormFilePickerField';
import {FormOptionalBlockField} from './fields/FormOptionalBlockField/FormOptionalBlockField';
import {FormPassportSubdivisionField} from './fields/FormPassportSubdivisionField/FormPassportSubdivisionField';
import {FormSelectField} from './fields/FormSelectField/FormSelectField';
import {FormSwitchField} from './fields/FormSwitchField/FormSwitchField';
import {FormTextAreaField} from './fields/FormTextAreaField/FormTextAreaField';
import {FormTextField} from './fields/FormTextField/FormTextField';
import {FormToggleButtonGroupField} from './fields/FormToggleButtonGroupField/FormToggleButtonGroupField';
import {FormCollectionWrapper} from './FormCollectionWrapper';
import {FormOgrnField} from './fields/FormOgrnField/FormOgrnField';
import {FormInnPersonField} from './fields/FormInnPersonField/FormInnPersonField';
import './form-wrapper.scss';

export class FormWrapper extends React.Component {
  static propTypes = {
    onChange: func,
    onUpdate: func,
    onValidate: func,
    validate: oneOfType([func, object]),
    validator: object,
    value: object,
    validationResult: object,
    disabled: bool
  };

  static defaultProps = {
    onChange() {

    },
    onUpdate() {

    },
    onValidate() {

    },
    validate() {

    }
  };

  componentDidMount() {
    const {validator} = this.props;
    if (validator && isFunction(validator.compile)) {
      validator.compile();
    }
  }

  handleFieldChange = (fieldName, fieldValue) => {
    const {value, onChange} = this.props;
    onChange(value::setField(fieldName, fieldValue));
  };

  handleFieldUpdate = (fieldName, fieldValue, affectedValidationFields) => {
    const {onUpdate, onValidate, validationResult, value, validator} = this.props;
    const newValue = value::setField(fieldName, fieldValue);

    if (validator && isFunction(validator.validate)) {
      const newValidationResult = validator.validate(newValue);
      const fieldValidationResult = newValidationResult::getField(fieldName);
      if (fieldValidationResult) {
        let updatedValidationResult = validationResult::setField(fieldName, fieldValidationResult);
        if (affectedValidationFields) {
          for (const field of affectedValidationFields) {
            updatedValidationResult = newValidationResult::setField(field, newValidationResult::getField(field));
          }
        }
        onValidate(updatedValidationResult);
      }
    }
    onUpdate(newValue);
  };

  handleOptionalFieldUpdate = (fieldName, fieldValue) => {
    if (fieldValue) {
      this.handleFieldUpdateWithoutValidation(fieldName, fieldValue);
    } else {
      this.handleFieldUpdate(fieldName, fieldValue);
    }
  };

  handleFieldUpdateWithoutValidation = (fieldName, fieldValue) => {
    const {value, onUpdate} = this.props;
    onUpdate(value::setField(fieldName, fieldValue));
  };

  validate(fieldName, fieldValue) {
    const {value, validate} = this.props;
    if (isFunction(validate)) {
      return validate(value, fieldName, fieldValue);
    }
    return validateModelField(validate, value::setField(fieldName, fieldValue), fieldName);
  }

  handleFieldValidate = (fieldName, fieldValidationResult) => {
    const {validationResult, onValidate} = this.props;
    let newValidationResult = validationResult::setField(fieldName, fieldValidationResult);
    onValidate(newValidationResult);
  };

  addPropsForChildren = (children) => {
    const {value, validationResult, validator, disabled} = this.props;
    return React.Children.map(children, (child) => {
      if (child && includes(FORM_FIELD_TYPES, child.type)) {
        if (child.type === AbstractFormWrapperField) {
          return React.cloneElement(child, {
            onChange: this.handleFieldChange,
            onUpdate: this.handleFieldUpdateWithoutValidation,
            onValidate: this.handleFieldValidate,
            targetValidationResult: validationResult,
            targetObject: value,
            disabled: disabled || child.props.disabled
          });
        }
        return React.cloneElement(child, {
          onChange: this.handleFieldChange,
          onUpdate: child.type === FormOptionalBlockField ? this.handleOptionalFieldUpdate : this.handleFieldUpdate,
          targetValidationResult: validationResult,
          targetObject: value,
          validator: validator,
          disabled: disabled || child.props.disabled
        });
      } else if (child && child.props && child.props.children && !includes(IGNORED_COMPONENTS, child.type)) {
        return React.cloneElement(child, {
          children: this.addPropsForChildren(child.props.children)
        });
      }
      return child;
    });
  };

  render() {
    const {children} = this.props;
    const childrenWithExtraProps = this.addPropsForChildren(children);

    return (
      <div>
        {childrenWithExtraProps}
      </div>
    );
  }
}

export const FORM_FIELD_TYPES = [
  FormTextField,
  FormTextAreaField,
  FormDateField,
  FormAddressField,
  FormDictionarySelectField,
  FormSelectField,
  FormToggleButtonGroupField,
  FormCheckboxField,
  FormSwitchField,
  FormBooleanToggleButtonGroupField,
  FormDictionaryToggleButtonGroupField,
  FormFilePickerField,
  FormOptionalBlockField,
  FormInnPersonField,
  FormOgrnField,
  FormPassportSubdivisionField,
  AbstractFormField,
  AbstractFormWrapperField
];

export const IGNORED_COMPONENTS = [
  FormCollectionWrapper,
  FormWrapper,
  FormLabel
];
