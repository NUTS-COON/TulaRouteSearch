import React from 'react';
import {ArticleCard} from '../../components/article-card/ArticleCard';
import {Article, ArticlePath} from '../../models/ArticleModel';
import {ArticleTitle} from '../../components/article-card/ArticleTitle';

export class FaviconArticleCard extends React.Component {

  render() {
    return (
      <ArticleCard articlePath={ArticlePath[Article.FAVICON_ARTICLE]}>
        <ArticleTitle>Какие размеры и в каком формате нужно попросить favicon у дизайнера и о чем еще не забыть</ArticleTitle>
        <div>
          Краткий ответ
        </div>
      </ArticleCard>
    );
  }

}
