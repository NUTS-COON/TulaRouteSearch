import includes from 'lodash/includes';
import {array, bool, element, func, number, object, oneOfType, string} from 'prop-types';
import React from 'react';
import {getCollectionItem, setCollectionItem} from '../../models/BaseModel';
import {DEFAULT_VALIDATION_RESULT} from '../../models/ValidationResult';
import {IGNORED_COMPONENTS} from './FormWrapper';

export class FormCollectionWrapperItem extends React.Component {
  static propTypes = {
    identifier: oneOfType([string, number]),
    targetObject: oneOfType([object, array]),
    onChange: func,
    onUpdate: func,
    onValidate: func,
    targetValidationResult: object,
    children: element,
    collectionIsArray: bool,
    disabled: bool
  };

  handleChange = (value) => {
    const {identifier, onChange} = this.props;
    onChange(identifier, value);
  };

  handleUpdate = (value) => {
    const {onUpdate, identifier} = this.props;
    onUpdate(identifier, value);
  };

  handleValidate = (validationResult) => {
    const {onValidate, identifier} = this.props;
    onValidate(identifier, validationResult);
  };

  render() {
    const {children, targetObject, identifier, targetValidationResult, collectionIsArray, disabled} = this.props;

    return React.cloneElement(children, {
      value: targetObject::getCollectionItem(identifier, collectionIsArray),
      validationResult: targetValidationResult::getCollectionItem(identifier) || DEFAULT_VALIDATION_RESULT,
      onChange: this.handleChange,
      onUpdate: this.handleUpdate,
      onValidate: this.handleValidate,
      disabled
    });
  }
}

export class FormCollectionWrapper extends React.Component {
  static propTypes = {
    onChange: func,
    onUpdate: func,
    onValidate: func,
    validator: object,
    value: oneOfType([object, array]),
    validationResult: object,
    collectionIsArray: bool,
    disabled: bool
  };

  static defaultProps = {
    onChange() {

    },
    onUpdate() {

    },
    onValidate() {

    },
    validate() {

    }
  };

  handleChange = (identifier, itemValue) => {
    const {value, onChange, collectionIsArray} = this.props;
    onChange(value::setCollectionItem(identifier, itemValue, collectionIsArray));
  };

  handleUpdate = (identifier, itemValue) => {
    const {value, onUpdate, collectionIsArray} = this.props;
    onUpdate(value::setCollectionItem(identifier, itemValue, collectionIsArray));
  };

  handleValidate = (identifier, itemValidationResult) => {
    const {validationResult, onValidate} = this.props;
    onValidate(validationResult::setCollectionItem(identifier, itemValidationResult));
  };

  addPropsForChildren = (children) => {
    const {value, validationResult, collectionIsArray, disabled} = this.props;
    return React.Children.map(children, (child) => {
      if (child && child.type === FormCollectionWrapperItem) {
        return React.cloneElement(child, {
          onChange: this.handleChange,
          onUpdate: this.handleUpdate,
          onValidate: this.handleValidate,
          targetValidationResult: validationResult,
          targetObject: value,
          collectionIsArray: collectionIsArray,
          disabled
        });
      } else if (child && child.props && child.props.children && !includes(IGNORED_COMPONENTS, child.type)) {
        return React.cloneElement(child, {
          children: this.addPropsForChildren(child.props.children),
        });
      }
      return child;
    });
  };

  render() {
    const {children} = this.props;
    const childrenWithExtraProps = this.addPropsForChildren(children);

    return (
      <div>
        {childrenWithExtraProps}
      </div>
    );
  }
}
