import trim from 'lodash/trim';
import {bool, func, number, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {FormComponentWrapper} from '../FormComponentWrapper/FormComponentWrapper';

function autoExpand(field) {
  field.style.height = 'inherit';
  window.getComputedStyle(field);
  field.style.height = `${field.scrollHeight || field.height}px`;
}

export class FormTextArea extends React.Component {
  static propTypes = {
    className: string,
    placeholder: string,
    value: string,
    onUpdate: func,
    onChange: func,
    validationResult: object,
    rows: oneOfType([string, number]),
    testId: string,
    testIdPlacement: string,
    hideError: bool,
    label: string,
    componentSize: string,
    expandable: bool,
    disabled: bool
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

  handleBlur = () => {
    const {value, onUpdate} = this.props;
    onUpdate(trim(value));
  };

  handleChange = (event) => {
    const {onChange, expandable} = this.props;
    onChange(event.target.value);
    if (expandable && this.textAreaRef) {
      autoExpand(this.textAreaRef);
    }
  };


  handleSetRef = (ref) => {
    this.textAreaRef = ref;
    const {expandable} = this.props;
    if (expandable && ref) {
      autoExpand(ref);
    }
  };

  render() {
    const {
      className,
      placeholder,
      value,
      validationResult,
      rows,
      testId,
      testIdPlacement,
      hideError,
      label,
      componentSize,
      disabled
    } = this.props;
    return (
      <FormComponentWrapper className={className}
                            validationResult={validationResult}
                            hideError={hideError}
                            label={label}
                            value={value || ''}
                            componentSize={componentSize}
                            testId={testId}
                            testIdPlacement={testIdPlacement}
                            disabled={disabled}>
        <textarea ref={this.handleSetRef}
                  rows={rows}
                  placeholder={placeholder}
                  value={value || ''}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  disabled={disabled}
        />
      </FormComponentWrapper>
    );
  }
}
