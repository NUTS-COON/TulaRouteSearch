import React from 'react';
import './header.scss';
import classNames from 'classnames';
import {bool, func, string} from 'prop-types';
import {MediumText} from '../medium-text/MediumText';
import {UniversalLink} from '../universal-link/UniversalLink';
import {createHomeRoute} from '../../helpers/appRoutes';

export class Header extends React.Component {

  static propTypes = {
    className: string,
    onContactClick: func,
    contactPopupShown: bool
  };

  static defaultProps = {
    onContactClick() {
    }
  };

  state = {
    scrollY: 0
  };

  handleScroll = event => {
    this.setState({scrollY: window.scrollY});
  };

  componentDidMount() {
    //this.setState({scrollY: window.scrollY});
    //window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    //window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const {scrollY} = this.state;
    const {className} = this.props;
    return (
      <div className={classNames('header', {'header_header-without-shadow': scrollY === 0}, className)}>
        <div className="header__container">
          <div className="header__title-with-logo">
            <div className="header__logo-image">
            </div>
            <MediumText className="header__title">
              <UniversalLink href={createHomeRoute()}>
                Visa.Furnas
              </UniversalLink>
            </MediumText>
          </div>
          <div>
            <UniversalLink href="https://furnas.ru">
              О нас
            </UniversalLink>
            <UniversalLink href="https://www.instagram.com/furnasteam/"
                           className="header__furnas-link">
              Наш инстаграм
            </UniversalLink>
          </div>
        </div>
      </div>
    );
  }

}
