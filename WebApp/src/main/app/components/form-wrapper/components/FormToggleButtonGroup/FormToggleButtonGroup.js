import isArray from 'lodash/isArray';
import some from 'lodash/some';
import xor from 'lodash/xor';
import {array, arrayOf, bool, func, number, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {ButtonSize} from '../../../../core/components/Button/Button';
import {ToggleButton} from '../../../../core/components/ToggleButton/ToggleButton';
import {getValidationResultErrorMessage} from '../../../../models/ValidationResult';
import {TestComponentWrapper} from '../../../TestComponentWrapper/TestComponentWrapper';
import {FormComponentSize} from '../FormComponentWrapper/FormComponentWrapper';
import {FormErrorMessage} from '../FormErrorMessage/FormErrorMessage';
import {FormGroup} from '../FormGroup/FormGroup';

const ComponentSizeToButtonSizeConverter = {
  [FormComponentSize.BIG]: ButtonSize.BIG,
  [FormComponentSize.MEDIUM]: null,
  [FormComponentSize.SMALL]: ButtonSize.SMALL
};

export class FormToggleButtonGroup extends React.Component {
  static propTypes = {
    className: string,
    value: oneOfType([string, arrayOf(string), bool, arrayOf(bool), number, arrayOf(number)]),
    onUpdate: func,
    onChange: func,
    validationResult: object,
    options: array,
    testId: string,
    testIdPlacement: string,
    componentSize: string,
    hideError: bool,
    disabled: bool,
    isMultipleChoose: bool,
    buttonClassName: string
  };

  handleClick = (value) => () => {

    const {isMultipleChoose, value: previousValue = []} = this.props;
    if (isMultipleChoose) {
      value = !isArray(value) ? [value] : value;
      value = xor(previousValue, value);
    }
    this.handleChange(value);
  };

  handleChange = (value) => {
    const {onChange, onUpdate} = this.props;
    onChange(value);
    onUpdate(value);
  };

  isButtonActive(buttonValue) {
    const {isMultipleChoose, value} = this.props;
    if (isMultipleChoose) {
      return some(value, (v) => v === buttonValue);
    }
    return buttonValue === value;
  }

  render() {
    const {className, validationResult, options, testId, testIdPlacement, componentSize, hideError, disabled, buttonClassName} = this.props;
    return (
      <div className={className}>
        <TestComponentWrapper id={testId} placement={testIdPlacement}>
          <FormGroup>
            {options.map((option) => (
              <ToggleButton key={option.value}
                            onClick={this.handleClick(option.value)}
                            active={this.isButtonActive(option.value)}
                            disabled={disabled}
                            className={buttonClassName}
                            size={ComponentSizeToButtonSizeConverter[componentSize]}>
                {option.name}
              </ToggleButton>
            ))}
          </FormGroup>
        </TestComponentWrapper>
        {
          !hideError &&
          <FormErrorMessage errorMessage={validationResult::getValidationResultErrorMessage()}/>
        }
      </div>
    );
  }
}
