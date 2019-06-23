import React from 'react';
import './footer.scss';
import {bool, func, string} from 'prop-types';
import {UniversalLink} from '../universal-link/UniversalLink';
import {createHomeRoute} from '../../helpers/appRoutes';

export class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="footer__container">
          <div className="footer__links-container">
            <UniversalLink href={createHomeRoute()} className="link_white-style">
              Visa.Furnas
            </UniversalLink>

            <UniversalLink href="http://furnas.ru" className="link_white-style footer__furnas-item">
              О нас
            </UniversalLink>
          </div>
          <div className="footer__icon-container">
            <UniversalLink noStyle={true} href="https://vk.com/furnas">
              <div className="footer__vk-icon_child footer__icon">
              </div>
            </UniversalLink>
            <UniversalLink noStyle={true} href="https://www.facebook.com/furnasteam/">
              <div className="footer__facebook-icon_child footer__icon">
              </div>
            </UniversalLink>
            <UniversalLink noStyle={true} href="https://www.instagram.com/furnasteam/">
              <div className="footer__instagram-icon_child footer__icon">
              </div>
            </UniversalLink>
            <UniversalLink noStyle={true} href="https://medium.com/@furnasteam">
              <div className="footer__media-icon_child footer__icon">
              </div>
            </UniversalLink>
          </div>

        </div>
      </div>);
  }
}