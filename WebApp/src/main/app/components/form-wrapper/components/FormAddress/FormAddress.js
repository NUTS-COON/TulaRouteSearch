import {bool, func, object, string} from 'prop-types';
import React from 'react';
import {getValidationResultErrorMessage} from '../../../../models/ValidationResult';
import AddressField from '../../../AddressField/AddressField';
import {TestComponentWrapper} from '../../../TestComponentWrapper/TestComponentWrapper';
import {FormErrorMessage} from '../FormErrorMessage/FormErrorMessage';

export class FormAddress extends React.Component {
  static propTypes = {
    className: string,
    value: object,
    onUpdate: func,
    onChange: func,
    validationResult: object,
    id: string,
    testId: string,
    testIdPlacement: string,
    hideError: bool,
    label: string,
    componentSize: string,
    disabled: bool
  };

  handleChange = (value) => this.props.onChange(value);
  handleBlur = () => this.props.onUpdate(this.props.value);

  render() {
    const {
      className,
      value,
      validationResult,
      id,
      testId,
      testIdPlacement,
      hideError,
      label,
      componentSize,
      disabled
    } = this.props;
    const validationErrorMessage = validationResult::getValidationResultErrorMessage();
    return (
      <div>
        <TestComponentWrapper id={testId} placement={testIdPlacement}>
          <AddressField value={value || {}}
                        validationResult={validationResult}
                        id={id}
                        className={className}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        label={label}
                        disabled={disabled}
                        componentSize={componentSize}
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
