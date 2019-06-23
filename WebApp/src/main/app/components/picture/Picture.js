import React from 'react';
import {array, string} from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import compact from 'lodash/filter';
import filter from 'lodash/filter';
import endsWith from 'lodash/endsWith';
import flatten from 'lodash/flatten';
import last from 'lodash/last';
import './picture.scss';
import classNames from 'classnames';

const MediaQuery = {
  FOR_PHONE_ONLY: '(max-width: 599px)',
  FOR_TABLET_PORTRAIT_UP: '(min-width: 600px)',
  FOR_TABLE_LANDSCAPE_UP: '(min-width: 900px)',
  FOR_DESKTOP_UP: '(min-width: 1200px)',
  FOR_BIG_DESKTOP_UP: '(min-width: 1800px)'
};

export class Picture extends React.Component {

  static propTypes = {
    forPhoneOnly: array,
    forPhoneOnlyRetina: array,
    forTabletPortraitUp: array,
    forTabletPortraitUpRetina: array,
    forTabletLandscapeUp: array,
    forTabletLandscapeUpRetina: array,
    forDesktopUp: array,
    forDesktopUpRetina: array,
    forBigDesktopUp: array,
    forBigDesktopUpRetina: array,
    alt: string,
    className: string,
    imgClassName: string
  };

  renderGroup(urls, urlsRetina, mediaQuery) {
    if (isEmpty(urls) && isEmpty(urlsRetina)) {
      return null;
    }

    const webpImage = find(urls, url => endsWith(url, 'webp'));
    const webpImageRetina = find(urlsRetina, url => endsWith(url, 'webp'));
    const webpSrcSet = compact([webpImage ? `${webpImage} 1x` : null, webpImageRetina ? `${webpImageRetina} 2x` : null]).join(',');

    const jp2Image = find(urls, url => endsWith(url, 'jp2'));
    const jp2ImageRetina = find(urlsRetina, url => endsWith(url, 'jp2'));
    const jp2SrcSet = compact([jp2Image ? `${jp2Image} 1x` : null, jp2ImageRetina ? `${jp2ImageRetina} 2x` : null]).join(',');

    const image = find(urls, url => !endsWith(url, 'jp2') && !endsWith(url, 'webp'));
    const imageRetina = find(urlsRetina, url => !endsWith(url, 'jp2') && !endsWith(url, 'webp'));
    const imageSrcSet = compact([image ? `${image} 1x` : null, imageRetina ? `${imageRetina} 2x` : null]).join(',');

    const webpSource = webpSrcSet ? <source key="webp" srcSet={webpSrcSet} media={mediaQuery} type="image/webp"/> : null;
    const jp2Source = jp2SrcSet ? <source key="jp2" srcSet={jp2SrcSet} media={mediaQuery} type='image/jp2'/> : null;
    const imageSource = imageSrcSet ? <source key="image" srcSet={imageSrcSet} media={mediaQuery}/> : null;

    return compact([webpSource, jp2Source, imageSource]);

  }

  render() {
    const {
      forPhoneOnly,
      forPhoneOnlyRetina,
      forTabletPortraitUp,
      forTabletPortraitUpRetina,
      forTabletLandscapeUp,
      forTabletLandscapeUpRetina,
      forDesktopUp,
      forDesktopUpRetina,
      forBigDesktopUp,
      forBigDesktopUpRetina,
      alt,
      className,
      imgClassName
    } = this.props;
    const biggestImage = last(compact(filter(flatten([forPhoneOnly, forTabletPortraitUp, forTabletLandscapeUp, forDesktopUp, forBigDesktopUp]), url => !endsWith(url, 'jp2') && !endsWith(url, 'webp'))));
    return (
      <picture className={className}>
        {this.renderGroup(forPhoneOnly, forPhoneOnlyRetina, MediaQuery.FOR_PHONE_ONLY)}
        {this.renderGroup(forTabletPortraitUp, forTabletPortraitUpRetina, MediaQuery.FOR_TABLET_PORTRAIT_UP)}
        {this.renderGroup(forTabletLandscapeUp, forTabletLandscapeUpRetina, MediaQuery.FOR_TABLE_LANDSCAPE_UP)}
        {this.renderGroup(forDesktopUp, forDesktopUpRetina, MediaQuery.FOR_DESKTOP_UP)}
        {this.renderGroup(forBigDesktopUp, forBigDesktopUpRetina, MediaQuery.FOR_BIG_DESKTOP_UP)}
        <img className={classNames(imgClassName, 'picture__img')}
             src={biggestImage}
             alt={alt}/>
      </picture>
    );
  }

}
