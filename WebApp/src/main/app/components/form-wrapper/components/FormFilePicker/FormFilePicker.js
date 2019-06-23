import classNames from 'classnames';
import {bool, func, object, oneOfType, string} from 'prop-types';
import React from 'react';
import first from 'lodash/first';
import {getValidationResultErrorMessage, getValidationResultValidationState, ValidationState} from '../../../../models/ValidationResult';
import {FileInputDnd} from '../../../FileInputDnd/FileInputDnd';
import {TestComponentWrapper} from '../../../TestComponentWrapper/TestComponentWrapper';
import {FormErrorMessage} from '../FormErrorMessage/FormErrorMessage';
import isEmpty from 'lodash/isEmpty';

export class FormFilePicker extends React.Component {

  static propTypes = {
    className: string,
    placeholder: oneOfType([func, object]),
    value: object,
    onUpdate: func,
    onChange: func,
    validationResult: object,
    testId: string,
    testIdPlacement: string,
    allowTypes: string,
    showImg: bool,
    multiple: bool,
    hideError: bool,
    showGenerateFileButton: bool,
    onGenerateFileClick: func,
    deleting: bool,
    disabled: bool,
    deleteFile: func
  };

  static defaultProps = {
    onChange() {
    },
    onUpdate() {
    }
  };

  getValidationClassName(validationResult) {

    switch (validationResult::getValidationResultValidationState()) {

      case ValidationState.BLANK:
        return '';

      case ValidationState.ERROR:
        return 'form-text-area_validation-error';

      case ValidationState.SUCCESS:
        return 'form-text-area_validation-success';
    }
  }


  handleChange = (files) => {
    const {onUpdate, onChange, multiple} = this.props;
    if (!isEmpty(files)) {
      onChange(multiple ? files : first(files));
      onUpdate(multiple ? files : first(files));
    }
  };


  render() {
    const {
      className,
      placeholder,
      value,
      validationResult,
      testId,
      testIdPlacement,
      allowTypes,
      showImg,
      multiple,
      hideError,
      showGenerateFileButton,
      onGenerateFileClick,
      deleting,
      disabled,
      deleteFile
    } = this.props;
    return (
      <div>
        <TestComponentWrapper id={testId} placement={testIdPlacement}>
          <FileInputDnd
            className={classNames(className, this.getValidationClassName(validationResult))}
            onFileUpload={this.handleChange}
            files={value ? [value] : []}
            multiple={multiple}
            allowTypes={allowTypes}
            placeholder={placeholder}
            showImg={showImg}
            showGenerateFileButton={showGenerateFileButton}
            onGenerateFileClick={onGenerateFileClick}
            deleting={deleting}
            disabled={disabled}
            deleteFile={deleteFile}
          />
        </TestComponentWrapper>
        {!hideError &&
        <FormErrorMessage errorMessage={validationResult::getValidationResultErrorMessage()}/>}
      </div>
    );
  }

}
