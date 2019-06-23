import React from 'react';
import {array, string} from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import size from 'lodash/size';
import findIndex from 'lodash/findIndex';

export class DocumentsList extends React.Component {

  static propTypes = {
    selectedTags: array,
  };

  getFilteredChildren() {
    const {children, selectedTags} = this.props;
    const childrenArray = React.Children.toArray(children);
    if (isEmpty(selectedTags)) {
      return children;
    }
    let filteredChildren = filter(childrenArray, (child) => {
      return isEmpty(child.props.tags) || includes(selectedTags, ...child.props.tags)
    });

    filteredChildren = filter(filteredChildren, (child) => {
      if (child.props.tagGroupTitle) {
        const groupChildren = filter(filteredChildren, ch => ch.props.documentTagGroupName === child.props.documentTagGroupName);
        return size(groupChildren) > 1;
      } else {
        return true;
      }
    });

    const retVal = [];
    let index = 0;
    for (const child of filteredChildren) {
      let documentIndex;

      if (!child.props.documentTagGroupName || child.props.tagGroupTitle) {
        index++;
      }

      if (child.props.documentTagGroupName) {
        if (child.props.tagGroupTitle) {
          documentIndex = `${index}.`
        } else {
          const groupChildren = filter(filteredChildren, ch => ch.props.documentTagGroupName === child.props.documentTagGroupName);
          const subIndex = findIndex(groupChildren, child);
          documentIndex = `${index}.${subIndex}.`;
        }
      } else {
        documentIndex = `${index}.`;
      }

      retVal.push(React.cloneElement(child, {documentIndex, selectedTags}));
    }

    return retVal;
  };

  render() {
    return (
      <ul className="documents__list">
        {this.getFilteredChildren()}
      </ul>
    );
  }

}
