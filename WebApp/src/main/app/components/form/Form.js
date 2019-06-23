import React from 'react';
import './form.scss';
import get from 'lodash/get';
import {object, func} from 'prop-types';

export class Form extends React.Component {

  static propTypes = {
    value: object,
    onChange: func
  };

  handleFieldChange = (fieldValue, fieldName) => {
    const {onChange, value} = this.props;
    onChange({...value, [fieldName]: fieldValue});
  };

  render() {
    const {children, value} = this.props;
    var context = this;
    const extendedChildren = React.Children.map(children, function(child) {
      if(!child) return child;
      return React.cloneElement(child, {
        value: get(value, child.props.fieldName),
        onChange: (fieldValue) => context.handleFieldChange(fieldValue, child.props.fieldName)});
    });

    return (
      <form>
        {extendedChildren}
      </form>
    );
  }
}
