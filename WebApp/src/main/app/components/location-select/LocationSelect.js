import map from 'lodash/map';
import {array, bool, func, object, string} from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
  changeSearchValueAction,
  resetComponentDataAction,
  resetSearchResultAction,
  searchLocationsAction,
  selectFoundLocations,
  selectFoundLocationsApiData,
  selectSearchValue
} from './LocationSelectModel';
import {AbstractAutocomplete, AbstractAutocompleteOption} from '../abstract-autocomplete/AbstractAutocomplete';
import {isApiDataPending} from '../../models/ApiDataModel';

class LocationSelectComponent extends Component {
  static propTypes = {
    foundLocations: array,
    searchValue: string,
    disabled: bool,
    representsAgent: object,
    searchLocations: func,
    changeSearchValue: func,
    onPersonSelect: func,
    resetComponentData: func,
    resetSearchResult: func,
    searchMorePersons: func
  };

  componentWillUnmount() {
    const {resetComponentData} = this.props;
    resetComponentData();
  }

  handleLocationSelect = (location) => {
    const {onLocationSelect, resetSearchResult, changeSearchValue} = this.props;
    resetSearchResult();
    changeSearchValue(location.address);
    onLocationSelect(location);
  };

  handleSearchValueChange = (value) => {
    const {changeSearchValue, searchLocations} = this.props;
    changeSearchValue(value);
    searchLocations(value);
  };

  handleClearOptions = () => this.props.resetSearchResult();

  handleBlur = () => {
    this.props.resetSearchResult();
  };

  render() {
    const {searchValue, foundLocations, foundLocationsApiData} = this.props;
    return (
      <AbstractAutocomplete inputValue={searchValue}
                            onInputValueChange={this.handleSearchValueChange}
                            onClearOptions={this.handleClearOptions}
                            onChange={this.handleLocationSelect}
                            onBlur={this.handleBlur}
                            isLoading={foundLocationsApiData::isApiDataPending()}>
        {map(foundLocations, (location, index) => {
            return (
              <AbstractAutocompleteOption key={index}
                                          value={location}>
                <div>
                  {location.address}
                </div>
              </AbstractAutocompleteOption>
            );
          }
        )}
      </AbstractAutocomplete>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  searchValue: selectSearchValue(state, ownProps.id),
  foundLocations: selectFoundLocations(state, ownProps.id),
  foundLocationsApiData: selectFoundLocationsApiData(state, ownProps.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  searchLocations: (search) => dispatch(searchLocationsAction(ownProps.id, search)),
  changeSearchValue: (search) => dispatch(changeSearchValueAction(ownProps.id, search)),
  resetSearchResult: () => dispatch(resetSearchResultAction(ownProps.id)),
  resetComponentData: () => dispatch(resetComponentDataAction(ownProps.id))
});

export const LocationSelect = connect(mapStateToProps, mapDispatchToProps)(LocationSelectComponent);

