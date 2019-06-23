import {bool, element, func, object, string} from 'prop-types';
import React from 'react';
import DateTime from 'react-datetime';
import {
  DateFormat,
  formatDateToClientFormat,
  formatDateToServerFormat,
  isValidClientDateFormat
} from '../../../../helpers/dateFormatHelper';
import {FormComponentWrapper} from '../FormComponentWrapper/FormComponentWrapper';

function prepareFormDateInputData(value = '', position) {
  const clearedValue = value.replace(/\D/g, '');
  const pointsCount = value.replace(/^(\.).*(\.)$/g, '').split('.').length - 1;
  const result = clearedValue.match(/(\d{1,2})?(\d{1,2})?(\d.*)?/);
  const days = result[1];
  const months = result[2];
  const year = result[3];
  const resultValue = (days || '') + (months ? '.' : '') + (months || '') + (year ? '.' : '') + (year || '');
  const resultPointsCount = resultValue.split('.').length - 1;
  const positionWithPointsOffset = position + (resultPointsCount - pointsCount);
  const positionOnPointOffset = resultValue[positionWithPointsOffset - 1] === '.' ? -1 : 0;
  const resultPosition = (positionWithPointsOffset + positionOnPointOffset) > 0 ? (positionWithPointsOffset + positionOnPointOffset) : 0;
  return {
    value: resultValue,
    position: resultPosition
  };
}

export class FormDate extends React.Component {
  static propTypes = {
    className: string,
    placeholder: string,
    value: string,
    onUpdate: func,
    onChange: func,
    validationResult: object,
    testId: string,
    testIdPlacement: string,
    closeOnSelect: bool,
    hideError: bool,
    label: string,
    componentSize: string,
    disabled: bool,
    rightIcon: element
  };

  static defaultProps = {
    closeOnSelect: true,
    rightIcon: <span className="fa fa-calendar"/>
  };

  state = {open: false};

  dateTimeRef;

  handleChange = (date) => {
    if (!isValidClientDateFormat(date)) {
      return false;
    }
    const {onChange, onUpdate} = this.props;
    const value = formatDateToServerFormat(date);
    onChange(value);
    onUpdate(value);
    if (this.props.closeOnSelect) {
      this.setState((state) => ({...state, open: false}));
    }
  };

  handleInputBlur = (event) => {
    if (!this.dateTimeRef.state.open) {
      this.handleUpdate(event.target.value);
    }
  };

  handleInputChange = (event) => {
    const data = prepareFormDateInputData(event.target.value, event.target.selectionStart);
    event.target.value = data.value;
    event.target.selectionStart = data.position;
    event.target.selectionEnd = data.position;
    this.setState((state) => ({...state, open: false}));
  };

  handleFocus = (event) => {
    this.setState((state) => ({...state, open: true}));
  };

  handleBlur = () => {
    this.setState((state) => ({...state, open: false}));
  };

  handleUpdate = (date) => {
    const {onUpdate} = this.props;
    const value = formatDateToServerFormat(date);
    onUpdate(value);
  };

  handleSetRef = (ref) => {
    this.dateTimeRef = ref;
    if (ref) {
      ref.handleClickOutside = hookHandleClickOutside.bind(ref);
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
      closeOnSelect,
      hideError,
      label,
      componentSize,
      disabled,
      rightIcon
    } = this.props;
    const {open} = this.state;
    const formattedValue = formatDateToClientFormat(value);
    return (
      <FormComponentWrapper className={className}
                            validationResult={validationResult}
                            hideError={hideError}
                            label={label}
                            value={formattedValue}
                            componentSize={componentSize}
                            testId={testId}
                            testIdPlacement={testIdPlacement}
                            disabled={disabled}
                            rightIcon={rightIcon}>
        <DateTime ref={this.handleSetRef}
                  closeOnSelect={closeOnSelect}
                  dateFormat={DateFormat.CLIENT}
                  locale="ru"
                  open={open}
                  timeFormat={false}
                  value={formattedValue}
                  onBlur={this.handleBlur}
                  onFocus={this.handleFocus}
                  onChange={this.handleChange}
                  inputProps={{
                    onBlur: this.handleInputBlur,
                    onChange: this.handleInputChange,
                    placeholder,
                    disabled
                  }}
        />
      </FormComponentWrapper>
    );
  }
}

function hookHandleClickOutside() {
  if (this.props.input && this.state.open && !this.props.disableCloseOnClickOutside) {
    this.setState({open: false}, function () {
      this.props.onBlur(this.state.selectedDate || this.state.inputValue);
    });
  }
}
