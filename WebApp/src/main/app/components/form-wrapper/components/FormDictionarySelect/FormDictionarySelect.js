import {bool, func, object, string} from 'prop-types';
import React from 'react';
import {DictionarySelect} from '../../../DictionarySelect/DictionarySelect';
import {FormComponentWrapper} from '../FormComponentWrapper/FormComponentWrapper';

export class FormDictionarySelect extends React.Component {
  static propTypes = {
    className: string,
    placeholder: string,
    value: object,
    onUpdate: func,
    onChange: func,
    validationResult: object,
    dictionaryMarker: string,
    clearable: bool,
    disabled: bool,
    filter: func,
    testId: string,
    testIdPlacement: string,
    hideError: bool,
    label: string,
    componentSize: string
  };

  static defaultProps = {
    clearable: false,
    disabled: false,
    placeholder: ''
  };

  handleChange = (value) => {
    const {onChange} = this.props;
    onChange(value);
  };

  handleBlur = () => {
    setTimeout(() => {
      const {onUpdate, value} = this.props;
      onUpdate(value);
    });
  };

  render() {
    const {
      className,
      placeholder,
      value,
      validationResult,
      dictionaryMarker,
      clearable,
      disabled,
      filter,
      testId,
      testIdPlacement,
      hideError,
      label,
      componentSize
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
        <DictionarySelect placeholder={placeholder}
                          value={value ? value.id : null}
                          dictionaryMarker={dictionaryMarker}
                          clearable={clearable}
                          onChange={this.handleChange}
                          onBlur={this.handleBlur}
                          disabled={disabled}
                          filter={filter}
                          autoBlur={true}
        />
      </FormComponentWrapper>

    );
  }
}
