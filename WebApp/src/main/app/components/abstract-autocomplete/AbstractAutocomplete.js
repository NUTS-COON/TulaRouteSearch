import React from 'react';
import throttle from 'lodash/throttle';
import {any, bool, element, func, object, oneOfType, string} from 'prop-types';
import findIndex from 'lodash/findIndex';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';
import first from 'lodash/first';
import {FormText} from '../form-wrapper/components/FormText/FormText';
import {KeyCode} from '../../models/KeyCode';
import {FormComponentSize} from '../form-wrapper/components/FormComponentWrapper/FormComponentWrapper';
import './abstract-autocomplete.scss';


AbstractAutocompleteOption.propTypes = {
  value: any.isRequired
};

export function AbstractAutocompleteOption() {
  throw new Error();
}

export class AbstractAutocomplete extends React.Component {
  static propTypes = {
    inputValue: string,
    inputMask: string,
    onChange: func,
    onInputValueChange: func,
    onBlur: func,
    onFocus: func,
    onLoadMore: func,
    className: string,
    disabled: bool,
    inputClassName: string,
    onClearOptions: func,
    label: oneOfType([string, element]),
    componentSize: string,
    validationResult: object,
    placeholder: string,
    rightIcon: oneOfType([string, element]),
    isLoading: bool,
    clearable: bool
  };

  static defaultProps = {
    onInputValueChange() {
    },
    onChange() {
    },
    onBlur() {

    },
    onClearOptions() {

    },
    onFocus() {

    },
    onLoadMore() {

    }
  };

  constructor(props) {
    super(props);
    this.throttledHandleScroll = throttle(this.handleScroll, 50);
  };

  state = {
    localInputValue: this.props.inputValue,
    selectedOption: null
  };

  renderedOptions = [];

  optionsRefs = {};

  optionsContainerRef;


  componentWillUnmount() {
    if (this.optionsContainerRef) {
      this.optionsContainerRef.removeEventListener('scroll', this.handleScroll);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inputValue !== this.props.inputValue) {
      this.setState({localInputValue: nextProps.inputValue});
    }
  }

  handleInputChange = (value) => {
    this.setState({localInputValue: value});
    this.props.onInputValueChange(value);
  };

  handleOptionHover = (option) => {
    this.setState({selectedOption: option});
  };

  handleOptionMouseDown = (selectedOption) => {
    this.props.onChange(selectedOption);
  };

  handleBlur = () => {
    const {onBlur, inputValue} = this.props;
    this.setState({localInputValue: inputValue, selectedOption: null});
    onBlur();
  };

  handleFocus = () => {
    const {onFocus} = this.props;
    onFocus();
  };

  handleScroll = (e) => {
    const isScrollOnBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (this.optionsContainerRef && isScrollOnBottom) {
      const {onLoadMore} = this.props;
      onLoadMore();
    }
  };

  updateSelectedOptionByIndex(index) {
    const correctedIndex = index < size(this.renderedOptions) ? index : (size(this.renderedOptions) - 1);
    const selectedOptionByIndex = this.renderedOptions[correctedIndex];
    if (selectedOptionByIndex) {
      this.setState({selectedOption: selectedOptionByIndex});
    } else if (size(this.renderedOptions)) {
      this.setState({selectedOption: first(this.renderedOptions)});
    }
    if (this.optionsRefs[index] && this.optionsContainerRef) {
      if ((this.optionsRefs[index].offsetTop + this.optionsRefs[index].clientHeight) > (this.optionsContainerRef.scrollTop + this.optionsContainerRef.clientHeight)) {
        this.optionsContainerRef.scrollTo({
          top: this.optionsRefs[index].offsetTop + this.optionsRefs[index].clientHeight - this.optionsContainerRef.clientHeight
        });
      } else if (this.optionsRefs[index].offsetTop < this.optionsContainerRef.scrollTop) {
        this.optionsContainerRef.scrollTo({
          top: this.optionsRefs[index].offsetTop
        });
      }
    }
  }

  handleInputKeyDown = (event) => {
    const {onChange, onClearOptions} = this.props;

    const {selectedOption} = this.state;
    let index = selectedOption ? findIndex(this.renderedOptions, selectedOption) : -1;

    switch (event.keyCode) {
      case KeyCode.UP_ARROW:
        index--;
        this.updateSelectedOptionByIndex(index);
        break;

      case KeyCode.DOWN_ARROW:
        index++;
        this.updateSelectedOptionByIndex(index);
        break;

      case KeyCode.ENTER:
        if (selectedOption) {
          onChange(selectedOption);
          onClearOptions();
        }
        break;
    }
  };

  handleSetOptionsContainerRef = (ref) => {
    if (this.optionsContainerRef) {
      this.optionsContainerRef.removeEventListener('scroll', this.handleScroll);
    }
    this.optionsContainerRef = ref;
    if (ref) {
      ref.addEventListener('scroll', this.throttledHandleScroll);
    }
  };

  handleClearClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this.props.onChange(null);
  };

  render() {
    const {children, className, disabled, inputClassName, label, componentSize, validationResult, placeholder, inputMask, rightIcon, isLoading, clearable, inputValue} = this.props;
    const {localInputValue, selectedOption} = this.state;

    const renderedOptions = [];
    const options = children ? React.Children.map(children, (child, i) => {
      if (child && child.type === AbstractAutocompleteOption) {
        const {children, value, className, ...props} = child.props;
        renderedOptions.push(value);
        return (
          <div {...props}
               ref={(ref) => this.optionsRefs[i] = ref}
               className={classNames('abstract-autocomplete__option', {'abstract-autocomplete__option_selected': isEqual(value, selectedOption)}, className)}
               onMouseOver={() => this.handleOptionHover(value)}
               onMouseDown={() => this.handleOptionMouseDown(value)}>
            {children}
          </div>);
      }
      return child;
    }) : [];

    this.renderedOptions = renderedOptions;

    let displayedRightIcon = rightIcon;

    if (isLoading) {
      displayedRightIcon = <i/>;
    } else if (clearable && inputValue && !disabled) {
      displayedRightIcon = <i className="fa fa-close text-muted abstract-autocomplete__clear-icon" onClick={this.handleClearClick}/>;
    }

    return (
      <div className={classNames('abstract-autocomplete', className)}>
        <FormText hideError={true}
                  value={localInputValue}
                  validationResult={validationResult}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur}
                  onFocus={this.handleFocus}
                  className={inputClassName}
                  onKeyDown={this.handleInputKeyDown}
                  disabled={disabled}
                  label={label}
                  componentSize={componentSize}
                  rightIcon={displayedRightIcon}
                  placeholder={placeholder}
                  maskType={inputMask}
        />
        {options.length > 0 &&
        <div className={classNames('abstract-autocomplete__options', {'abstract-autocomplete__options-is-big': componentSize === FormComponentSize.BIG})} ref={this.handleSetOptionsContainerRef}>
          {options}
        </div>}

      </div>);
  }
}
