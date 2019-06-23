import {bool, element, func, number, object, oneOfType, string} from 'prop-types';
import React from 'react';
import isEqual from 'lodash/isEqual';
import {Checkbox} from '../../../../core/components/Checkbox/Checkbox';
import {getValidationResultErrorMessage} from '../../../../models/ValidationResult';
import {TestComponentWrapper} from '../../../TestComponentWrapper/TestComponentWrapper';
import {FormErrorMessage} from '../FormErrorMessage/FormErrorMessage';

export class FormCheckbox extends React.Component {
  static propTypes = {
    className: string,
    label: oneOfType([string, element]),
    value: oneOfType([string, object, bool, number]),
    onUpdate: func,
    onChange: func,
    validationResult: object,
    checkedValue: oneOfType([string, object, bool, number]),
    uncheckedValue: oneOfType([string, object, bool, number]),
    isRadio: bool,
    hideError: bool,
    testId: string,
    testIdPlacement: string,
    disabled: bool,
    checkboxClassName: string
  };

  static defaultProps = {
    checkedValue: true,
    uncheckedValue: false,
    isRadio: false,
    onUpdate() {

    }
  };

  handleChange = (value) => {
    const {onChange, onUpdate, checkedValue, uncheckedValue, isRadio, value: oldValue} = this.props;
    if (!isRadio) {
      onChange(value ? checkedValue : uncheckedValue);
      onUpdate(value ? checkedValue : uncheckedValue);
    } else if (value !== checkedValue || oldValue !== value) {
      onChange(checkedValue);
      onUpdate(checkedValue);
    }
  };

  render() {
    const {
      className,
      placeholder,
      value,
      validationResult,
      checkedValue,
      label,
      hideError,
      testId,
      testIdPlacement,
      isRadio,
      disabled,
      checkboxClassName
    } = this.props;
    return (
      <div className={className}>
        <TestComponentWrapper id={testId} placement={testIdPlacement}>
          <Checkbox checked={isEqual(value, checkedValue)}
                    label={label}
                    className={checkboxClassName}
                    onChange={this.handleChange}
                    disabled={disabled}
                    asRadio={isRadio}
          />
        </TestComponentWrapper>
        {
          !hideError &&
          <FormErrorMessage errorMessage={validationResult::getValidationResultErrorMessage()}/>
        }
      </div>
    );
  }
}
