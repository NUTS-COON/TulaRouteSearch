import {array, func, object, string} from 'prop-types';
import React from 'react';
import {FormToggleButtonGroup} from '../FormToggleButtonGroup/FormToggleButtonGroup';
import connect from 'react-redux/es/connect/connect';
import {loadDictionaryAction, selectDictionaryApiData} from '../../../../redux/domain/dictionaries/DictionaryItemModel';
import {getData} from '../../../../models/ApiDataModel';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import find from 'lodash/find';
import {getDictionaryItemCode, getDictionaryItemValue} from '../../../../generated/models/DictionaryItemModel';

class FormDictionaryToggleButtonGroupComponent extends React.Component {

  static propTypes = {
    className: string,
    value: object,
    onUpdate: func,
    onChange: func,
    validationResult: object,
    dictionaryMarker: string
  };

  componentWillMount() {
    const {loadDictionary, dictionaryMarker} = this.props;
    loadDictionary(dictionaryMarker);
  }

  handleChange = code => {
    const {dictionaryApiData, onChange} = this.props;
    onChange(find(dictionaryApiData::getData(), item => item::getDictionaryItemCode() === code));
  };

  handleUpdate = code => {
    const {dictionaryApiData, onUpdate} = this.props;
    onUpdate(find(dictionaryApiData::getData(), item => item::getDictionaryItemCode() === code));
  };

  render() {
    const {className, value, validationResult, dictionaryApiData} = this.props;
    const options = map(dictionaryApiData::getData(), item => ({name: item::getDictionaryItemValue(), value: item::getDictionaryItemCode()}));
    if (isEmpty(options)) {
      return null;
    }
    return (
      <FormToggleButtonGroup className={className}
                             validationResult={validationResult}
                             value={value::getDictionaryItemCode()}
                             options={options}
                             onUpdate={this.handleUpdate}
                             onChange={this.handleChange}/>
    );
  }

}

const mapStateToProps = (state, ownProps) => ({
  dictionaryApiData: selectDictionaryApiData(state, ownProps.dictionaryMarker)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadDictionary: dictionaryMarker => dispatch(loadDictionaryAction(dictionaryMarker))
});

export const FormDictionaryToggleButtonGroup = connect(mapStateToProps, mapDispatchToProps)(FormDictionaryToggleButtonGroupComponent);
