import {array, bool, element, func, number, object, oneOfType, string} from 'prop-types';
import React from 'react';
import Select from 'react-select';
import {FormComponentWrapper} from '../FormComponentWrapper/FormComponentWrapper';

export class FormSelect extends React.Component {
  static propTypes = {
    className: string,
    placeholder: string,
    value: oneOfType([object, string, number]),
    onUpdate: func,
    onChange: func,
    onBlur: func,
    validationResult: object,
    clearable: bool,
    options: array,
    saveOnlyValue: bool,
    testId: string,
    testIdPlacement: string,
    hideError: bool,
    disabled: bool,
    label: string,
    componentSize: string,
    searchable: bool,
    noResultsText: string,
    labelKey: string,
    valueKey: string,
    rightIcon: oneOfType([string, element])
  };

  static defaultProps = {
    clearable: false,
    disabled: false,
    searchable: true,
    placeholder: '',
    noResultsText: 'Совпаденией не найдено',
    onUpdate: () => {
    },
    onBlur: () => {
    },
    valueKey: 'value',
    labelKey: 'label'
  };

  handleChange = (value) => {
    const {onChange, onUpdate, saveOnlyValue, valueKey} = this.props;
    onChange(value && saveOnlyValue ? value[valueKey] : value);
    onUpdate(value && saveOnlyValue ? value[valueKey] : value);
  };

  renderValue = (option) => {
    const {labelKey} = this.props;
    return (
      <span title={option[labelKey]}>{option[labelKey]}</span>
    );
  };

  render() {
    const {
      className,
      placeholder,
      value,
      validationResult,
      clearable,
      options,
      testId,
      testIdPlacement,
      hideError,
      label,
      componentSize,
      disabled,
      searchable,
      noResultsText,
      valueKey,
      labelKey,
      onBlur,
      rightIcon
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
                            rightIcon={rightIcon}
                            disabled={disabled}>
        <Select placeholder={placeholder}
                value={value}
                clearable={clearable}
                onChange={this.handleChange}
                options={options}
                disabled={disabled}
                backspaceRemoves={false}
                searchable={searchable}
                valueRenderer={this.renderValue}
                noResultsText={noResultsText}
                valueKey={valueKey}
                labelKey={labelKey}
                onBlur={onBlur}
        />
      </FormComponentWrapper>
    );
  }
}
