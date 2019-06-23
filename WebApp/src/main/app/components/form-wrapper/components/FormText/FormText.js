import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import toNumber from 'lodash/toNumber';
import trim from 'lodash/trim';
import {bool, element, func, number, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {FormComponentWrapper} from '../FormComponentWrapper/FormComponentWrapper';

const lineBreaksRegExp = /(\r\n|\n|\r)/gm;

export class FormText extends React.Component {
  static propTypes = {
    className: string,
    type: string,
    placeholder: string,
    value: oneOfType([string, number]),
    onUpdate: func,
    onChange: func,
    validationResult: object,
    maskType: string,
    disabled: bool,
    testId: string,
    testIdPlacement: string,
    isPassword: bool,
    hideError: bool,
    onFocus: func,
    onBlur: func,
    onKeyDown: func,
    onKeyPress: func,
    valueIsNumber: bool,
    label: oneOfType([string, element]),
    componentSize: string,
    saveTimeout: number,
    rightIcon: oneOfType([string, element])
  };

  static defaultProps = {
    onBlur() {
    },
    onFocus() {
    },
    onUpdate() {
    },
    onChange() {
    },
    onKeyDown() {
    },
    onKeyPress() {
    }
  };

  constructor(props) {
    super(props);

    const {saveTimeout} = this.props;
    if (saveTimeout) {
      this.debouncedSave = debounce(this.saveForDebounce, saveTimeout);
    }
  }

  saveForDebounce = () => {
    const {value, onUpdate} = this.props;
    onUpdate(this.prepareValueBeforeUpdate(value, false));
  };

  prepareValueBeforeUpdate(value, shouldTrimValue = true) {
    let stringValue = shouldTrimValue ? trim(value) : value;
    stringValue = stringValue ? stringValue.replace(lineBreaksRegExp, ' ') : stringValue;
    const {valueIsNumber} = this.props;
    if (!isEmpty(stringValue) && valueIsNumber) {
      return toNumber(stringValue);
    }
    return stringValue;
  }

  handleBlur = () => {
    const {value, onUpdate, onBlur} = this.props;
    onUpdate(this.prepareValueBeforeUpdate(value));
    onBlur();
  };

  handleInputChange = (event) => {
    const {onChange} = this.props;
    onChange(event.target.value);
    if (this.debouncedSave) {
      this.debouncedSave();
    }
  };

  handleMaskedInputChange = (event, unmaskedValue) => {
    const {onChange} = this.props;
    onChange(unmaskedValue);
  };

  handleFocus = () => this.props.onFocus();

  render() {
    const {
      className,
      placeholder,
      value,
      validationResult,
      maskType,
      disabled,
      testId,
      testIdPlacement,
      isPassword,
      hideError,
      onKeyDown,
      label,
      componentSize,
      rightIcon,
      onKeyPress
    } = this.props;

    const type = isPassword ? 'password' : 'text';
    return (
        <FormComponentWrapper className={className}
                              validationResult={validationResult}
                              hideError={hideError}
                              label={label}
                              value={value || ''}
                              componentSize={componentSize}
                              testId={testId}
                              testIdPlacement={testIdPlacement}
                              disabled={disabled}
                              rightIcon={rightIcon}>
          <input type={type}
                 placeholder={placeholder}
                 value={value || ''}
                 onChange={this.handleInputChange}
                 onBlur={this.handleBlur}
                 onFocus={this.handleFocus}
                 disabled={disabled}
                 onKeyDown={onKeyDown}
                 onKeyPress={onKeyPress}
          />
        </FormComponentWrapper>
    );
  }
}

