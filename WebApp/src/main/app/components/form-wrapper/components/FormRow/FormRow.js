import React from 'react';
import {number, string} from 'prop-types';
import find from 'lodash/find';
import filter from 'lodash/filter';
import {Col} from '../../../../core/components/grid/Col/Col';
import {Row} from '../../../../core/components/grid/Row/Row';
import {FormLabel} from '../FormLabel/FormLabel';

export class FormRow extends React.Component {

  static propTypes = {
    labelColumns: number,
    fieldColumns: number,
    className: string
  };

  static defaultProps = {
    labelColumns: 4,
    fieldColumns: 8
  };

  render() {

    const {labelColumns, fieldColumns, children, className} = this.props;
    const {toArray} = React.Children;

    const formLabel = find(toArray(children), child => child.type === FormLabel);
    const formField = filter(toArray(children), child => child.type !== FormLabel);

    return (
      <Row className={`form-wrapper__form-row ${className}`}>
        <Col xs={labelColumns}>
          {formLabel}
        </Col>
        <Col xs={fieldColumns}>
          {formField}
        </Col>
      </Row>
    );
  }

}
