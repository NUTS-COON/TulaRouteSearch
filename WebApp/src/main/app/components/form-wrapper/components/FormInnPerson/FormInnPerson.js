import classNames from 'classnames';
import trim from 'lodash/trim';
import {bool, element, func, number, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {getAddressUnrestrictedValue} from '../../../../generated/models/AddressModel';
import {
  getValidationResultErrorMessage,
  getValidationResultValidationState,
  ValidationState
} from '../../../../models/ValidationResult';
import {InnPersonField} from '../../../InnPersonField/InnPersonField';
import {TestComponentWrapper} from '../../../TestComponentWrapper/TestComponentWrapper';
import {FormErrorMessage} from '../FormErrorMessage/FormErrorMessage';

export class FormInnPerson extends React.Component {
  static propTypes = {
    className: string,
    value: string,
    onUpdate: func,
    onChange: func,
    onValidate: func,
    onBlur: func,
    validationResult: object,
    id: oneOfType([number, string]),
    testId: string,
    testIdPlacement: string,
    placeholder: string,
    person: object,
    validator: object,
    hideError: bool,
    label: string,
    componentSize: string,
    disabled: bool,
    rightIcon: element
  };

  static defaultProps = {
    onBlur() {
    },
    onFocus() {
    },
    onUpdate() {
    },
    onChange() {
    }
  };


  getValidationClassName(validationResult) {
    if (validationResult::getValidationResultValidationState() !== ValidationState.ERROR) {
      validationResult = validationResult::getAddressUnrestrictedValue();
    }

    switch (validationResult::getValidationResultValidationState()) {
      case ValidationState.BLANK:
        return '';

      case ValidationState.ERROR:
        return 'form-inn_validation-error';

      case ValidationState.SUCCESS:
        return 'form-inn_validation-success';
    }
  }

  handleBlur = () => {
    const {value, onUpdate, onBlur} = this.props;
    onUpdate(trim(value));
    onBlur();
  };

  handleChange = (value) => {
    const {onChange} = this.props;
    onChange(value);
  };

  render() {
    const {
      className,
      value,
      validationResult,
      id,
      testId,
      testIdPlacement,
      placeholder,
      person,
      onValidate,
      validator,
      hideError,
      label,
      componentSize,
      disabled,
      rightIcon
    } = this.props;
    const validationErrorMessage = validationResult::getValidationResultErrorMessage() || validationResult::getAddressUnrestrictedValue()::getValidationResultErrorMessage();
    return (
      <div>
        <TestComponentWrapper id={testId} placement={testIdPlacement}>
          <InnPersonField value={value}
                          id={id}
                          className={classNames(className, this.getValidationClassName(validationResult))}
                          onBlur={this.handleBlur}
                          onChange={this.handleChange}
                          placeholder={placeholder}
                          validationResult={validationResult}
                          person={person}
                          onValidate={onValidate}
                          validator={validator}
                          hideError={hideError}
                          label={label}
                          componentSize={componentSize}
                          disabled={disabled}
                          rightIcon={rightIcon}
          />
        </TestComponentWrapper>
        {
          !hideError &&
          <FormErrorMessage errorMessage={validationErrorMessage}/>
        }
      </div>
    );
  }
}
