import isEmpty from 'lodash/isEmpty';
import {string} from 'prop-types';
import React from 'react';

export class FormErrorMessage extends React.Component {

  static propTypes = {
    errorMessage: string
  };

  render() {

    const {errorMessage} = this.props;

    return (
      <div className='form-wrapper__error-message_block'>
        {!isEmpty(errorMessage) &&
        <div className="form-wrapper__error-message">
          {errorMessage}
        </div>
        }
      </div>
    );
  }

}
