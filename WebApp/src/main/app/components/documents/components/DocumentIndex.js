import React from 'react';
import {string} from 'prop-types';

export class DocumentIndex extends React.Component {

  static propTypes = {
    documentIndex: string
  };

  render() {
    const {documentIndex, children} = this.props;
    return (
      <span>
        {documentIndex ? documentIndex : children}
      </span>
    );
  }

}
