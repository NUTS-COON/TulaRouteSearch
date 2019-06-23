import {bool, func, number, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {getValidationResultErrorMessage} from '../../../../models/ValidationResult';
import {TestComponentWrapper} from '../../../TestComponentWrapper/TestComponentWrapper';
import {FormErrorMessage} from '../FormErrorMessage/FormErrorMessage';
import classNames from 'classnames';

export class FormSwitch extends React.Component {
  static propTypes = {
    className: string,
    label: string,
    value: oneOfType([string, object, bool, number]),
    onUpdate: func,
    onChange: func,
    validationResult: object,
    checkedValue: oneOfType([string, object, bool, number]),
    uncheckedValue: oneOfType([string, object, bool, number]),
    hideError: bool,
    testId: string,
    testIdPlacement: string,
    labelClassName: string
  };

  static defaultProps = {
    checkedValue: true,
    uncheckedValue: false,
    onUpdate: () => {
    }
  };

  onSwitchChange = () => {
    const {onChange, onUpdate, checkedValue, uncheckedValue, value} = this.props;
    onChange(value !== checkedValue ? checkedValue : uncheckedValue);
    onUpdate(value !== checkedValue ? checkedValue : uncheckedValue);
  };

  render() {
    const {
      className,
      value,
      validationResult,
      checkedValue,
      label,
      hideError,
      testId,
      testIdPlacement,
      labelClassName
    } = this.props;
    return (
      <div>
        <TestComponentWrapper id={testId} placement={testIdPlacement}>
          <div className={`d-flex align-items-center ${className}`}>
            <button className={`btn btn-toggle btn-sm ${value === checkedValue ? 'active' : ''}`}
                    data-toggle="button"
                    onClick={this.onSwitchChange}>
              <div className="handle"/>
            </button>
            <span className={classNames('form-switch__label', labelClassName)}>{label}</span>
          </div>
        </TestComponentWrapper>
        {!hideError &&
        <FormErrorMessage errorMessage={validationResult::getValidationResultErrorMessage()}/>
        }
      </div>
    );
  }
}
