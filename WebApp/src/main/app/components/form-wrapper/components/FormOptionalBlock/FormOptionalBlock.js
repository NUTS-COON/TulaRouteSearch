import {array, bool, func, number, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {FormCheckbox} from '../FormCheckbox/FormCheckbox';

export class FormOptionalBlock extends React.Component {

  static propTypes = {
    className: string,
    label: string,
    value: oneOfType([string, object, bool, number]),
    onUpdate: func,
    onChange: func,
    validationResult: object,
  };


  handleChange = value => {
    const {onChange} = this.props;
    onChange(value ? {} : null);
  };

  handleUpdate = value => {
    const {onUpdate} = this.props;
    onUpdate(value ? {} : null);
  };

  render() {
    const {value, validationResult, className, label} = this.props;
    return (
      <FormCheckbox value={!!value}
                    className={className}
                    validationResult={validationResult}
                    onUpdate={this.handleUpdate}
                    onChange={this.handleChange}
                    label={label}
                    hideError={true} />
    );
  }

}
