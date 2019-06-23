import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import {any, bool, element, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {
  getValidationResultErrorMessage,
  getValidationResultValidationState,
  ValidationState
} from '../../../../models/ValidationResult';
import {FormErrorMessage} from '../FormErrorMessage/FormErrorMessage';
import './form-component-wrapper.scss';

function getValidationClassName(validationResult) {
  switch (validationResult::getValidationResultValidationState()) {
    case ValidationState.ERROR:
      return 'form-component__validation-error';

    case ValidationState.SUCCESS:
      return 'form-component__validation-success';
  }
  return '';
}

function valueNotEmpty(value) {
  return isNumber(value) || !isEmpty(value);
}

export const FormComponentSize = {
  BIG: 'BIG',
  MEDIUM: 'MEDIUM',
  SMALL: 'SMALL'
};

export class FormComponentWrapper extends React.Component {

  static propTypes = {
    children: element,
    className: string,
    value: any,
    validationResult: object,
    testId: string,
    testIdPlacement: string,
    hideError: bool,
    label: oneOfType([string, element]),
    componentSize: string,
    blockLabel: bool,
    disabled: bool,
    rightIcon: oneOfType([string, element])
  };

  static defaultProps = {
    componentSize: FormComponentSize.MEDIUM
  };

  state = {focused: false};

  getClassNameFromSize() {
    const {componentSize} = this.props;
    switch (componentSize) {
      case FormComponentSize.BIG:
        return 'form-component__big';
      case FormComponentSize.MEDIUM:
        return '';
      case FormComponentSize.SMALL:
        return 'form-component__small';
    }
  }

  handleBlur = () => {
    this.setState((state) => ({...state, focused: false}));
  };

  handleFocus = () => {
    this.setState((state) => ({...state, focused: true}));
  };

  render() {
    const {
      label,
      hideError,
      validationResult,
      className,
      testId,
      testIdPlacement,
      children,
      value,
      blockLabel,
      disabled,
      rightIcon
    } = this.props;

    const {focused} = this.state;

    return (
      <div className="form-component__wrapper">
        <div onFocus={this.handleFocus}
             onBlur={this.handleBlur}
             className={classNames('form-component', this.getClassNameFromSize(), {
               'form-component__label-inside': !isEmpty(label),
               'form-component__focused': focused,
               'form-component__has-value': focused || valueNotEmpty(value) || blockLabel,
               'form-component__disabled': disabled,
               'form-component__has-right-icon': !isNil(rightIcon)
             }, className, getValidationClassName(validationResult))}>
            {children}
          {
            rightIcon &&
            <div className="form-component__right-icon">
              {rightIcon}
            </div>
          }

        </div>
        {!hideError &&
        <FormErrorMessage errorMessage={validationResult::getValidationResultErrorMessage()}/>}
      </div>
    );
  }
}

