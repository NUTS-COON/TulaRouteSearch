import React from 'react';
import {string, element} from 'prop-types';
import './abstract-form-field.scss';

export class AbstractFormField extends React.Component {

  static propTypes = {
    label: string,
    helpText: element,
    fieldName: string
  };

  render() {
    const {children, label, helpText} = this.props;
    return (
      <div className="abstract-form-field" style={{marginTop: label? "": "0px"}}>
        {label &&
        <div className="abstract-form-field__label">
          {label}
        </div>}
        {children}
        <div className="abstract-form-field__help-text">
          {helpText}
        </div>
      </div>
    );
  }
}