import map from 'lodash/map'
import {array, bool, func, object, string} from 'prop-types';
import React from 'react';
import {FormToggleButtonGroup} from '../FormToggleButtonGroup/FormToggleButtonGroup';

const TRUE_OPTION = 'TRUE';
const FALSE_OPTION = 'FALSE';

export class FormBooleanToggleButtonGroup extends React.Component {

  static propTypes = {
    className: string,
    value: bool,
    onUpdate: func,
    onChange: func,
    validationResult: object,
    options: array,
    testId: string,
    testIdPlacement: string
  };

  handleChange = value => {
    const {onChange} = this.props;
    onChange(value === TRUE_OPTION);
  };

  handleUpdate = value => {
    const {onUpdate} = this.props;
    onUpdate(value === TRUE_OPTION);
  };


  render() {
    const {
      options,
      value,
      validationResult,
      className,
      testId,
      testIdPlacement
    } = this.props;

    const componentOptions = map(options, option => {
      return {
        name: option.name,
        value: option.value === true ? TRUE_OPTION : FALSE_OPTION
      }
    });

    let componentValue = value;
    if (value === true) {
      componentValue = TRUE_OPTION;
    } else if (value === false) {
      componentValue = FALSE_OPTION;
    }


    return (
      <FormToggleButtonGroup
        onChange={this.handleChange}
        onUpdate={this.handleUpdate}
        options={componentOptions}
        value={componentValue}
        validationResult={validationResult}
        className={className}
        testId={testId}
        testIdPlacement={testIdPlacement}
      />
    );

  }
}
