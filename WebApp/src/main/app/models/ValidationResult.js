import get from 'lodash/get';
import set from 'lodash/set';
import values from 'lodash/values';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';

export const ValidationState = {
  BLANK: 'blank',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const VALIDATION_RESULT_ERROR_MESSAGE_FIELD = 'error_message';
export const VALIDATION_RESULT_VALIDATION_STATE_FIELD = 'validation_state';

export const DEFAULT_VALIDATION_RESULT = {
  [VALIDATION_RESULT_ERROR_MESSAGE_FIELD]: '',
  [VALIDATION_RESULT_VALIDATION_STATE_FIELD]: ValidationState.BLANK
};

export function getValidationResultErrorMessage() {
  return get(this, VALIDATION_RESULT_ERROR_MESSAGE_FIELD);
}

export function getValidationResultValidationState() {
  return get(this, VALIDATION_RESULT_VALIDATION_STATE_FIELD);
}


export function setValidationResultErrorMessage(value) {
  return set({...this}, VALIDATION_RESULT_ERROR_MESSAGE_FIELD, value);
}

export function setValidationResultValidationState(value) {
  return set({...this}, VALIDATION_RESULT_VALIDATION_STATE_FIELD, value);
}


export function isValidationResultSuccess() {
  return this::getValidationResultValidationState() === ValidationState.SUCCESS;
}

export function isValidationResultError() {
  return this::getValidationResultValidationState() === ValidationState.ERROR;
}

export function getValidationResultConsiderChildren() {
  if (this::isValidationResultError() || this::isValidationResultSuccess()) {
    return this;
  }

  const childProps = values(omit(this, [VALIDATION_RESULT_ERROR_MESSAGE_FIELD, VALIDATION_RESULT_VALIDATION_STATE_FIELD]));

  let hasAllChildPropsValid = !isEmpty(childProps);

  for (const prop of childProps) {
    const propValidationResult = prop::getValidationResultConsiderChildren();
    if (propValidationResult::isValidationResultError()) {
      return propValidationResult;
    }
    hasAllChildPropsValid = hasAllChildPropsValid && propValidationResult::isValidationResultSuccess()
  }

  return hasAllChildPropsValid ? {}::setValidationResultValidationState(ValidationState.SUCCESS)::setValidationResultErrorMessage('') : DEFAULT_VALIDATION_RESULT;
}
