import React from 'react';
import {bool, func, number, object, oneOfType, string} from 'prop-types';
import {getValidationResultErrorMessage} from '../../../../models/ValidationResult';
import {TestComponentWrapper} from '../../../TestComponentWrapper/TestComponentWrapper';
import {MaskedInputType} from '../../../MaskedInput/MaskedInput';
import {FormErrorMessage} from '../FormErrorMessage/FormErrorMessage';
import {FormText} from '../FormText/FormText';
import {FillOrganizationByOgrnLink} from '../../../FillOrganizationByOgrnLink/FillOrganizationByOgrnLink';

export class FormOgrn extends React.Component {

  static propTypes = {
    className: string,
    placeholder: string,
    value: oneOfType([string, number]),
    onUpdate: func,
    onChange: func,
    validationResult: object,
    maskType: string,
    disabled: bool,
    testId: string,
    testIdPlacement: string,
    hideError: bool,
    onFillOrganizationClick: func
  };

  static defaultProps = {
    onFillOrganizationClick(person){

    }
  };

  render() {
    const {
      className,
      placeholder,
      value,
      validationResult,
      disabled,
      testId,
      testIdPlacement,
      hideError,
      onChange,
      onUpdate,
      onFillOrganizationClick
    } = this.props;

    return (
      <div>
        <TestComponentWrapper id={testId} placement={testIdPlacement}>
          <FormText className={className}
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    onUpdate={onUpdate}
                    maskType={MaskedInputType.OGRN}
                    validationResult={validationResult}
                    hideError={true} />
        </TestComponentWrapper>
        <FillOrganizationByOgrnLink ogrn={value}
                                    onFillOrganizationClick={onFillOrganizationClick}/>
        {!hideError &&
        <FormErrorMessage errorMessage={validationResult::getValidationResultErrorMessage()}/>}
      </div>
    );
  }

}
