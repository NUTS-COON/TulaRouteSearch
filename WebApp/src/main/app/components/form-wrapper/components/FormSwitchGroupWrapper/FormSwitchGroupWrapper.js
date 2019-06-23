import get from 'lodash/get';
import React from 'react';

export class FormSwitchGroupWrapper extends React.Component {

  render() {

    const {children} = this.props;
    const {toArray} = React.Children;

    const childrenArray = toArray(children);

    const formSwitch = childrenArray.shift();
    const formCheckedElem = childrenArray.shift();
    const formUnchekedElem = childrenArray.shift();

    const {props: {targetObject, fieldName, checkedValue}} = formSwitch;
    const switchState = get(targetObject, fieldName);

    return (
      <div>
        <div className="mb-5">
          {formSwitch}
        </div>

        {switchState !== checkedValue ?
          formCheckedElem
          :
          formUnchekedElem
        }
      </div>
    );
  }
}