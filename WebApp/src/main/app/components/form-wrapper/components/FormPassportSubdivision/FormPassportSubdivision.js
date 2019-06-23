import {bool, func, object, string} from 'prop-types';
import React from 'react';
import {PassportSubdivisionField} from '../../../../core/components/form/PassportSubdivisionField/PassportSubdivisionField';
import {getValidationResultErrorMessage} from '../../../../models/ValidationResult';
import {TestComponentWrapper} from '../../../TestComponentWrapper/TestComponentWrapper';
import {FormErrorMessage} from '../FormErrorMessage/FormErrorMessage';

export class FormPassportSubdivision extends React.Component {
  static propTypes = {
    className: string,
    value: string,
    onUpdate: func,
    onChange: func,
    validationResult: object,
    id: string,
    testId: string,
    testIdPlacement: string,
    placeholder: string,
    hideError: bool,
    label: string,
    componentSize: string,
    onCodeSelected: func,
    disabled: bool
  };

  handleChange = (value) => this.props.onChange(value);
  handleUpdate = () => this.props.onUpdate(this.props.value);

  render() {
    const {
      className,
      value,
      validationResult,
      id,
      testId,
      testIdPlacement,
      placeholder,
      hideError,
      label,
      componentSize,
      onCodeSelected,
      disabled
    } = this.props;
    const validationErrorMessage = validationResult::getValidationResultErrorMessage();
    return (
      <div>
        <TestComponentWrapper id={testId} placement={testIdPlacement}>
          <PassportSubdivisionField value={value}
                                    validationResult={validationResult}
                                    id={id}
                                    className={className}
                                    placeholder={placeholder}
                                    onUpdate={this.handleUpdate}
                                    onChange={this.handleChange}
                                    label={label}
                                    componentSize={componentSize}
                                    onCodeSelected={onCodeSelected}
                                    disabled={disabled}
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
