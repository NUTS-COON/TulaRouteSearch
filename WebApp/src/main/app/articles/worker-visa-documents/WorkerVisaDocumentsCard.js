import React from 'react';
import {ArticleCard} from '../../components/article-card/ArticleCard';
import {Article, ArticlePath} from '../../models/ArticleModel';
import {ArticleTitle} from '../../components/article-card/ArticleTitle';

export class WorkerVisaDocumentsCard extends React.Component {

  render() {
    return (
      <ArticleCard articlePath={ArticlePath[Article.WORKER_VISA_DOCUMENTS]}>
        <ArticleTitle>Список документов на туристическую визу в Испанию 2019</ArticleTitle>
        <ol>
          <li>
            Анкета, заполненная на 2-х листах, на испанском или английском языках, заполненная латиницей в электронном виде, подписанная лично заявителем в 4-х местах (бланк в прикреплённых файлах);
          </li>
          <li>
            Две цветные фотографии 3,5 х 4,5 см, на белом фоне, сделанные в течение последних 6 месяцев, голова на фотографии должна занимать 70-80% всего изображения;
          </li>
          <li>
            Загранпаспорт, действительный минимум в течение трех месяцев после предполагаемой даты выезда из Шенгенской зоны, содержащий как минимум один чистый разворот;
          </li>
          <li>
            Копии всех страниц загранпаспорта (формат А4, два разварота паспорта на одной странице, четыре разворота паспорта на одном листе, пример в прикреплённых файлах);
          </li>
        </ol>
      </ArticleCard>
    );
  }

}
