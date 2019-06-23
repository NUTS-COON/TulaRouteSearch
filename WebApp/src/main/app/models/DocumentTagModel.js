import find from 'lodash/find';
import keys from 'lodash/keys';
import includes from 'lodash/includes';

export const DocumentTag = {
  OLDER_18: 'OLDER_18',
  YOUNGER_18: 'YOUNGER_18',
  BOOKING: 'BOOKING',
  INVITE: 'INVITE',
  TICKET: 'TICKET',
  CAR: 'CAR',
  DRIVER: 'DRIVER',
  NOT_DRIVER: 'NOT_DRIVER',
  WORKER: 'WORKER',
  STUDENT: 'STUDENT',
  BUSINESSMAN: 'BUSINESSMAN',
  PENSIONER: 'PENSIONER',
  SPONSOR: 'SPONSOR',
  SELF_PAID: 'SELF_PAID',
  NO_PROFESSION: 'NO_PROFESSION'
};
export const DocumentTagTranslation = {
  [DocumentTag.OLDER_18]: 'старше 18 лет',
  [DocumentTag.YOUNGER_18]: 'младше 18 лет',
  [DocumentTag.BOOKING]: 'бронь размещения',
  [DocumentTag.INVITE]: 'приглашение',
  [DocumentTag.TICKET]: 'бронь билета',
  [DocumentTag.CAR]: 'автомобиль',
  [DocumentTag.DRIVER]: 'водитель',
  [DocumentTag.NOT_DRIVER]: 'пассажир',
  [DocumentTag.WORKER]: 'работник',
  [DocumentTag.STUDENT]: 'студент',
  [DocumentTag.BUSINESSMAN]: 'ИП',
  [DocumentTag.PENSIONER]: 'пенсионер',
  [DocumentTag.SPONSOR]: 'спонсор',
  [DocumentTag.SELF_PAID]: 'платит сам за себя'
};

export const DocumentTagQuestionTranslation = {
  [DocumentTag.OLDER_18]: 'старше 18 лет',
  [DocumentTag.YOUNGER_18]: 'младше 18 лет',
  [DocumentTag.BOOKING]: 'отель',
  [DocumentTag.INVITE]: 'приглашение',
  [DocumentTag.TICKET]: 'траспорт',
  [DocumentTag.CAR]: 'автомобиль',
  [DocumentTag.DRIVER]: 'водитель',
  [DocumentTag.NOT_DRIVER]: 'пассажир',
  [DocumentTag.WORKER]: 'работник',
  [DocumentTag.STUDENT]: 'студент',
  [DocumentTag.BUSINESSMAN]: 'ИП',
  [DocumentTag.PENSIONER]: 'пенсионер',
  [DocumentTag.SPONSOR]: 'спонсор',
  [DocumentTag.SELF_PAID]: 'я сам'
};

export const DocumentTagGroupName = {
  AGE: 'AGE',
  ACCOMMODATION: 'ACCOMMODATION',
  TRANSPORT: 'TRANSPORT',
  DRIVER: 'DRIVER',
  PROFESSION: 'PROFESSION',
  PAYER: 'PAYER',
  PARENTS_PASSPORT: 'PARENTS_PASSPORT'
};

export const DocumentTagGroups = {
  [DocumentTagGroupName.AGE]: [DocumentTag.OLDER_18, DocumentTag.YOUNGER_18],
  [DocumentTagGroupName.ACCOMMODATION]: [DocumentTag.BOOKING, DocumentTag.INVITE],
  [DocumentTagGroupName.TRANSPORT]: [DocumentTag.TICKET, DocumentTag.CAR],
  [DocumentTagGroupName.DRIVER]: [DocumentTag.DRIVER, DocumentTag.NOT_DRIVER],
  [DocumentTagGroupName.PROFESSION]: [DocumentTag.WORKER, DocumentTag.STUDENT, DocumentTag.BUSINESSMAN, DocumentTag.PENSIONER, DocumentTag.NO_PROFESSION],
  [DocumentTagGroupName.PAYER]: [DocumentTag.SPONSOR, DocumentTag.SELF_PAID]
};

export function getTagGroup(tag) {
  return find(keys(DocumentTagGroups), groupName => includes(DocumentTagGroups[groupName], tag));
}