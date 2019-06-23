import React from 'react';
import './steps.scss';
import {array, object} from 'prop-types';
import classNames from 'classnames';
import map from 'lodash/map';
import {createVisaApplicationFormRoute} from '../../helpers/appRoutes';
import {UniversalLink} from '../universal-link/UniversalLink';

export class Steps extends React.Component {

  static propTypes = {
    stepsData: array,
    activeStep: object
  };

  render() {
    var {stepsData, activeStep} = this.props;

    return ([
      <div key="1"
           className="steps__desktop">
        <div className="steps__line"/>
        {map(stepsData, step => (
          <UniversalLink href={createVisaApplicationFormRoute(step.name)}
                         noStyle={true}
                         key={step.name}
                         className={classNames('steps__link', activeStep.name === step.name ? 'steps__link_active' : '')}>
            {step.label}
          </UniversalLink>
        ))}
      </div>,
      <div key="2"
           className="steps__mobile">
        <div className="steps__line"/>
        {map(stepsData, (step, index) => (
          <div key={step.name} className="steps__circle">
            <UniversalLink href={createVisaApplicationFormRoute(step.name)}
                           noStyle={true}
                           className={classNames('steps__link', activeStep.name === step.name ? 'steps__link_active' : '')}>
              {index + 1}
            </UniversalLink>
            <label className="steps__label">{activeStep.name === step.name ? step.label : ""}</label>
          </div>
        ))}
      </div>]);
  }
}
