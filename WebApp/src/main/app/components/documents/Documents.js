import React from 'react';
import {DocumentsListItem} from './components/DocumentsListItem';
import {DocumentTag, DocumentTagGroupName} from '../../models/DocumentTagModel';
import {DocumentsList} from './components/DocumentsList';
import './documents.scss';
import {Quote} from '../quote/Quote';
import {GreenLink} from '../green-link/GreenLink';
import {array} from 'prop-types';
import {DocumentIndex} from './components/DocumentIndex';

export class Documents extends React.Component {

  static propTypes = {
    selectedTags: array
  };

  render() {
    const {selectedTags} = this.props;
    return (
      <DocumentsList selectedTags={selectedTags}>
        <DocumentsListItem>
          <DocumentIndex>1.</DocumentIndex> <b>Анкета на визу</b>, заполненная на 2-х листах, на испанском или английском языках, заполненная латиницей
          в электронном виде, подписанная лично
          заявителем в 4-х местах (<GreenLink
          href="https://drive.google.com/file/d/1LugQ64MpWDdQi-5ne74oJvuYoHYv64Ub/view?usp=sharing"
          target="_blank">посмотреть пример</GreenLink> и <GreenLink href="https://drive.google.com/file/d/16NaAqqY6cfzkFBkD7J6ddyDUOdFvycFw/view?usp=sharing" target="_blank">скачать
          бланки</GreenLink>);
        </DocumentsListItem>
        <DocumentsListItem>
          <p className="documents__paragraph"><DocumentIndex>2.</DocumentIndex> <b>Две цветные фотографии</b> 3,5 х 4,5 см, на белом фоне, сделанные в течение последних 6 месяцев, голова на фотографии должна занимать 70-80% всего
            изображения;</p>
          <p>На сайте <GreenLink href="https://blsspain-russia.com/moscow/short_term_visa.php"
                                 target="_blank">blsspain-russia.com</GreenLink> указана следующая информация:</p>
          <Quote cite="https://blsspain-russia.com/moscow/short_term_visa.php"
                 className="documents__quote">
            <p className="documents__paragraph">Требования к фотографии, предоставляемой заявителем для получения визы:</p>
            <ul className="documents__quote-list">
              <li className="documents__quote-list-item">
                <p className="documents__quote-list-text">Фотография должна быть цветной.</p>
              </li>
              <li className="documents__quote-list-item">
                <p className="documents__quote-list-text">Фон фотографии – белый.</p>
              </li>
              <li className="documents__quote-list-item">
                <p className="documents__quote-list-text">Срок давности фотографии должен составлять не больше 6 месяцев.</p>
              </li>
              <li className="documents__quote-list-item">
                <p className="documents__quote-list-text">Фотография должна соответствовать следующим размерам: 3.5 см x 4.5 см. Лицо должно быть размещено в центре фотографии. Размер головы (измеряя
                  от макушки до подбородка) должен составлять около 3 см</p>
              </li>
              <li className="documents__quote-list-item">
                <p className="documents__quote-list-text">На фотографии должен быть изображен полный анфас, взгляд заявителя должен быть направлен прямо в фотокамеру.</p>
              </li>
              <li className="documents__quote-list-item">
                <p className="documents__quote-list-text">В целом, изображение заявителя, включая лицо и волосы, должно быть, отображено от макушки до подбородка сверху вниз и по линии волос по
                  сторонам. Предпочтительно, чтобы уши были открыты.</p>
              </li>
            </ul>
          </Quote>
        </DocumentsListItem>
        <DocumentsListItem>
          <p><DocumentIndex>3.</DocumentIndex> <b>Загранпаспорт</b>, действительный минимум в течение трех месяцев после предполагаемой даты выезда из <GreenLink
            href="https://ru.wikipedia.org/wiki/%D0%A8%D0%B5%D0%BD%D0%B3%D0%B5%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D0%B7%D0%BE%D0%BD%D0%B0" target="_blank">Шенгенской зоны</GreenLink>, содержащий как
            минимум один чистый разворот;</p>
        </DocumentsListItem>
        <DocumentsListItem>
          <p><DocumentIndex>4.</DocumentIndex> <b>Копии всех страниц загранпаспорта></b> (формат А4, два разварота паспорта на одной странице, четыре разворота паспорта на одном листе);</p>
        </DocumentsListItem>
        <DocumentsListItem>
          <p><DocumentIndex>5.</DocumentIndex> <b>Другие загранпаспорта + копии всех страниц загранпаспортов</b> (формат А4, два разварота паспорта на одной странице, четыре разворота паспорта на одном листе, <GreenLink
            href="https://drive.google.com/file/d/1-q4aWj4COZFu-h879r-lSzhZCzyODcgy/view?usp=sharing" target="_blank">посмотреть пример</GreenLink>);</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.OLDER_18]}>
          <p><DocumentIndex>6.</DocumentIndex> <b>Копия заполненных страниц общегражданского паспорта</b> (формат А4, два разварота паспорта на страницу, четыре разворота паспорта на лист);</p>
        </DocumentsListItem>
        <DocumentsListItem documentTagGroupName={DocumentTagGroupName.ACCOMMODATION} tagGroupTitle={true}>
          <p><DocumentIndex>7.</DocumentIndex> <b>Подтверждение размещения</b> на весь период проживания. Бронь отеля/хостела/квартиры/дома. Если бронировать через booking.com, информация о бронировании присылают на указанный
            email:</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.BOOKING]} documentTagGroupName={DocumentTagGroupName.ACCOMMODATION}>
          <p><DocumentIndex>7.1</DocumentIndex> Бронь отеля/хостела/квартиры/дома. Если бронировать через <GreenLink href="https://www.booking.com" target="_blank">booking.com</GreenLink>, информация о бронировании присылают на
            указанный вами
            email (<GreenLink href="https://drive.google.com/file/d/1tEQI7x4YrBksgdl3WdKKfW3iuuhMFgb6/view?usp=sharing" target="_blank">посмотреть пример</GreenLink>)</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.INVITE]} documentTagGroupName={DocumentTagGroupName.ACCOMMODATION}>
          <p><DocumentIndex>7.2</DocumentIndex> Приглашение, напечатанное в произвольной форме с указанием сведений о приглашающем лице, приглашенном лице, с датами поездки и месте проживания приглашенного (<GreenLink
            href="https://drive.google.com/file/d/1VzLfoAvDUPwoLdZ9HlhQJeCD1SXEf1KL/view?usp=sharing" target="_blank">посмотреть пример</GreenLink>);</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.INVITE]} documentTagGroupName={DocumentTagGroupName.ACCOMMODATION}>
          <p><DocumentIndex>7.3</DocumentIndex> Копия документа, удостоверяющего личность приглашающего и подтверждение его легального проживания или пребывания в Испании, например, копия DNI (Documento Nacional de
            Identidad)
            — Национальный документ, удостоверяющий личность, либо копия главной страницы загранпаспорта с действующей шенгенской визой;</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.INVITE]} documentTagGroupName={DocumentTagGroupName.ACCOMMODATION}>
          <p><DocumentIndex>7.4</DocumentIndex> При проживании у приглашающего – выписка из реестра недвижимости, нота симпле (Nota Simple) <GreenLink
            href="https://drive.google.com/file/d/1zcQs92CnSBXKu7uvXu6olEWYEWLpdNi9/view?usp=sharing" target="_blank">посмотреть пример</GreenLink>;</p>
          <Quote cite="https://espanarusa.com/ru/pedia/article/75888"
                 className="documents__quote">
            <p className="documents__paragraph"><b>Nota Simple</b> – официальная выписка из Регистра Собственности Испании (Registro de la Propiedad), подтверждающая право собственности на недвижимое
              имущество.</p>
            <p className="documents__paragraph">Данный документ <b>является аналогом российской выписки из <abbr
              title="Единый государственный реестр прав на недвижимое имущество">ЕГРП</abbr></b> (выписки из Единого государственного реестра прав на недвижимое имущество). В этой информационной
              справке полностью описывается сам объект недвижимости, его владельцы, права собственности и ограничения прав на собственность, доли собственности владельцев, а также долги по ипотечному
              кредиту или налогам.</p>
            <p>Nota Simple предоставляется на испанском языке и имеет ограниченный срок действия – 3 месяца. Точная дата выдачи всегда указывается в самом документе. Информация для Nota Simple
              постоянно обновляется.</p>
          </Quote>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.INVITE]} documentTagGroupName={DocumentTagGroupName.ACCOMMODATION}>
          <p><DocumentIndex>7.5</DocumentIndex> Копия документа, удостоверяющего личность приглашающего;</p>
        </DocumentsListItem>
        <DocumentsListItem>
          <p><DocumentIndex>8.</DocumentIndex> <b>Полис медицинского страхования</b> на весь период пребывания (не менее 30.000 €). Купить полис можно онлайн, например, на сайте <GreenLink
            href="https://www.renins.com/iris/di/process/travelinsurance/RSF-100219-408#TravelSegmentationStep" target="_blank">renins.com</GreenLink>;</p>
        </DocumentsListItem>
        <DocumentsListItem documentTagGroupName={DocumentTagGroupName.TRANSPORT} tagGroupTitle={true}>
          <p><DocumentIndex>9.</DocumentIndex> <b>Как добираться:</b></p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.TICKET]} documentTagGroupName={DocumentTagGroupName.TRANSPORT}>
          <p><DocumentIndex>9.1</DocumentIndex> Копия или бронь билета на самолет/поезд/автобус/пароход;</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.CAR]} documentTagGroupName={DocumentTagGroupName.TRANSPORT}>
          <p><DocumentIndex>9.2</DocumentIndex> Копия технического паспорта автомобиля;</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.CAR, DocumentTag.DRIVER]} documentTagGroupName={DocumentTagGroupName.TRANSPORT}>
          <p><DocumentIndex>9.3</DocumentIndex> Копия водительских прав;</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.CAR]} documentTagGroupName={DocumentTagGroupName.TRANSPORT}>
          <p><DocumentIndex>9.4</DocumentIndex> Копия международной страховки автомобиля (Грин Кард);</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.CAR]} documentTagGroupName={DocumentTagGroupName.TRANSPORT}>
          <p><DocumentIndex>9.5</DocumentIndex> Напечатанный маршрутный лист по планируемой поездке с указанием дат пересечения границ иностранных государств;</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.CAR]} documentTagGroupName={DocumentTagGroupName.TRANSPORT}>
          <p><DocumentIndex>9.6</DocumentIndex> Контракт аренды автомобиля;</p>
        </DocumentsListItem>
        <DocumentsListItem documentTagGroupName={DocumentTagGroupName.PROFESSION} tagGroupTitle={true}>
          <p><DocumentIndex>10.</DocumentIndex> <b>Профессиональный статус (экономические гарантии):</b></p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.WORKER]} documentTagGroupName={DocumentTagGroupName.PROFESSION}>
          <p><DocumentIndex>10.1</DocumentIndex> Справка с места работы, оригинал на фирменном бланке с указанием названия, адреса и телефона организации, ФИО, должности и заработной платы работника, заверенная печатью и
            подписью руководителя и бухгалтерии (справка действительна в течение 1 месяца со дня выдачи) <GreenLink
              href="https://drive.google.com/file/d/1lFvIt0ZZrq6yQ6sNy-D2_6jOjgsS9SFB/view?usp=sharing" target="_blank">посмотреть пример</GreenLink> или допустимо предоставить форму <abbr
              title="Налог на доходы физических лиц">2НДФЛ</abbr>;</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.STUDENT]} documentTagGroupName={DocumentTagGroupName.PROFESSION}>
          <p><DocumentIndex>10.2</DocumentIndex> Оригинал справки с места учёбы с синей печатью (<GreenLink href="" target="_blank">посмотреть пример</GreenLink>);</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.BUSINESSMAN]} documentTagGroupName={DocumentTagGroupName.PROFESSION}>
          <p><DocumentIndex>10.3</DocumentIndex> Копия <GreenLink href="https://drive.google.com/file/d/18kg6OR-xFDZis3rIT94CIPhrgdX6utE2/view?usp=sharing" target="_blank">свидетельства о регистрации
            предприятия</GreenLink> или <GreenLink href="https://drive.google.com/file/d/1QImFxwBMEBGSQdMowFh-SEZXthBgfqzR/view?usp=sharing" target="_blank">уведомление о постановке на учет
            физического лица в налоговом органе</GreenLink>;</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.BUSINESSMAN]} documentTagGroupName={DocumentTagGroupName.PROFESSION}>
          <p><DocumentIndex>10.4</DocumentIndex> Копия документа индивидуального номера налогоплательщика (ИНН) <GreenLink href="https://drive.google.com/file/d/187M61wDi1juKCLXucq-QE2UBa2drLitg/view?usp=sharing" target="_blank">посмотреть
            пример</GreenLink>;</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.PENSIONER]} documentTagGroupName={DocumentTagGroupName.PROFESSION}>
          <p><DocumentIndex>10.5</DocumentIndex> Справка из пенсионного фонда (<GreenLink href="https://drive.google.com/file/d/1maUnRoRco4OUw338d0H6f4pFfPUfOuDX/view?usp=sharing" target="_blank">посмотреть пример</GreenLink>);</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.PENSIONER]} documentTagGroupName={DocumentTagGroupName.PROFESSION}>
          <p><DocumentIndex>10.6</DocumentIndex> Копия пенсионного удостоверения (при подаче нужно будет показать оригинал);</p>
        </DocumentsListItem>
        <DocumentsListItem documentTagGroupName={DocumentTagGroupName.PAYER} tagGroupTitle={true}>
          <p><DocumentIndex>11.</DocumentIndex> <b>Финансовые гарантии</b> (73,59 € на каждый день пребывания и минимум 661,50 евро на поездку за человека). Один или несколько пунктов:</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.SELF_PAID]} documentTagGroupName={DocumentTagGroupName.PAYER}>
          <p><DocumentIndex>11.1</DocumentIndex> Оригинал выписки с банковского счета на бланке банка с синей печатью. Если не получается получить справку — сделайте в банкомате запрос остатка, прийдите с ним в банк и попросите
            поставить печать;</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.SELF_PAID]} documentTagGroupName={DocumentTagGroupName.PAYER}>
          <p><DocumentIndex>11.2</DocumentIndex> Справка о покупке валюты;</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.SPONSOR]} documentTagGroupName={DocumentTagGroupName.PAYER}>
          <p><DocumentIndex>11.3</DocumentIndex> Спонсорское письмо в печатном виде (<GreenLink href="https://drive.google.com/file/d/1eQEVsvvEAvnEp8QWb9pJXYLdPj1R_QPJ/view?usp=sharing" target="_blank">скачать бланк</GreenLink>);
          </p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.SPONSOR]} documentTagGroupName={DocumentTagGroupName.PAYER}>
          <p><DocumentIndex>11.4</DocumentIndex> Оригинал справки с места работы спонсора;</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.SPONSOR]} documentTagGroupName={DocumentTagGroupName.PAYER}>
          <p><DocumentIndex>11.5</DocumentIndex> Финансовые гарантии спонсора (выписка со счета из банка или справка о покупке валюты);</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.SPONSOR]} documentTagGroupName={DocumentTagGroupName.PAYER}>
          <p><DocumentIndex>11.6</DocumentIndex> Ксерокопия общегражданского паспорта спонсора (первый разворот с данными спонсора и разворот с пропиской).</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.YOUNGER_18]}>
          <p><DocumentIndex>12.</DocumentIndex> <b>Копия свидетельства о рождении</b></p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.YOUNGER_18]}>
          <p><DocumentIndex>13.</DocumentIndex> <b>Загран паспорт родителя/родителей/опекуна</b> с которыми едет за границу;</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.YOUNGER_18]} documentTagGroupName={DocumentTagGroupName.PARENTS_PASSPORT} tagGroupTitle={true}>
          <p><DocumentIndex>14.</DocumentIndex> <b>Копии общегражданского паспорта (российского) родителя/родителей/опекуна:</b></p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.YOUNGER_18]} documentTagGroupName={DocumentTagGroupName.PARENTS_PASSPORT}>
          <p><DocumentIndex>14.1</DocumentIndex> Первой страницы и прописки общегражданского паспорта родителя, дающего согласие;</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.YOUNGER_18]} documentTagGroupName={DocumentTagGroupName.PARENTS_PASSPORT}>
          <p><DocumentIndex>14.2</DocumentIndex> Первой страницы и прописки общегражданского паспорта сопровождающего.</p>
        </DocumentsListItem>
        <DocumentsListItem tags={[DocumentTag.YOUNGER_18]}>
          <p><DocumentIndex>15.</DocumentIndex> <b>Копия нотариально-заверенного согласия другого родителя/родителей</b> и перевод на испанский язык;
            Согласие должно быть оформлено не ранее чем за 1 год до планируемой
            поездки, должно быть четко обозначено, что родитель разрешает вывоз ребенка
            в страны Шенгенского соглашения, в том числе в Испанию. В случае
            невозможности получения согласия, документы, подтверждающие причину
            отсутствия доверенности (копия свидетельства о смерти, справка матери-одиночки и т.п.);</p>
        </DocumentsListItem>
      </DocumentsList>
    );
  }

}
