import map from 'lodash/map';
import values from 'lodash/values';

export function generateSelectOptionsFromEnum(enumValues, enumTranslations) {
  return map(values(enumValues), enumValue => ({label: enumTranslations[enumValue], value: enumValue}));
}